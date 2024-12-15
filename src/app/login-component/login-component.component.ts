import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from "@angular/router";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  clientDTO: any;
  token: string = '';
  role: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private dialogRef: MatDialogRef<LoginComponentComponent>
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log({ email, password });

      this.loginService.login(email, password).subscribe(
        response => {
          const role = localStorage.getItem('role');
          const firstlogin = localStorage.getItem('firstlogin');

          console.log({ email, password }, "firstlogin: " + firstlogin);

          if (role === 'ROLE_AGENT') {
            if (firstlogin === 'true') {
              this.router.navigate(['/firstlogin']);
            } else {
              this.router.navigate(['/agent-page']);
            }
          } else if (role === 'ROLE_CLIENT') {
            console.log('hhhhh')
            if (firstlogin === 'true') {
              console.log('grrrrrrrr')
              this.dialogRef.close();
              this.router.navigate(['/firstlogin']);
              return; // Ajoutez cette ligne pour arrêter l'exécution
            }
            this.router.navigate(['/profile']);
          } else if (role === 'ROLE_ADMIN') {
            this.router.navigate(['/admin-page']);
          } else {
            this.errorMessage = 'Rôle inconnu reçu du serveur';
          }
          this.dialogRef.close();
        },
        error => {
          this.errorMessage = 'Échec de la connexion. Veuillez vérifier votre email et votre mot de passe.';
        }
      );
    } else {
      this.errorMessage = 'Veuillez entrer une adresse email et un mot de passe valides.';
    }
  }
}
