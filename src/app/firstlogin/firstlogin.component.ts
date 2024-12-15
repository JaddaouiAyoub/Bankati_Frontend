import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importez FormBuilder et FormGroup

import { PasswordService } from '../service/password.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-firstlogin',
  templateUrl: './firstlogin.component.html',
  styleUrls: ['./firstlogin.component.css']
})
export class FirstLoginComponent implements OnInit {
  firstLoginForm!: FormGroup; // Déclarez le formulaire réactif

  constructor(    private router: Router,
                  private fb: FormBuilder, private passwordService: PasswordService) {}

  ngOnInit(): void {
    // Initialisez le formulaire réactif
    this.firstLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.firstLoginForm.invalid) {
      console.log('Formulaire invalide');
      return;
    }

    // Vérifiez si les mots de passe correspondent
    if (this.firstLoginForm.value.newPassword !== this.firstLoginForm.value.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');

      return;
    }


    const formData = new FormData();
    formData.append('email', this.firstLoginForm.value.email);
    formData.append('newPassword', this.firstLoginForm.value.newPassword);
    formData.append('confirmPassword', this.firstLoginForm.value.confirmPassword);
    //console.log(formData.get('email') + "hh")
    if (localStorage.getItem("role") === 'ROLE_AGENT') {
      this.passwordService.changeAgentPassword(formData).subscribe(
        (response) => {
          //console.log('Mot de passe changé avec succès', response);
          alert('Mot de passe changé avec succès');

          this.router.navigate(['/agent-page']);
        },
        (error) => {
          //console.error('Erreur lors du changement de mot de passe', error);
          alert(`Erreur lors du changement de mot de passe :${error}`);

          // Gérer les erreurs ici
        }
      );
    } else {
      this.passwordService.changeClientPassword(formData).subscribe(
        (response) => {
          //console.log('Mot de passe changé avec succès', response);
          alert('Mot de passe changé avec succès');
          this.router.navigate(['/profile']);
          return;
        },
        (error) => {
          console.error('Erreur lors du changement de mot de passe', error);
          alert(`Erreur lors du changement de mot de passe :${error}`);
          // Gérer les erreurs ici
        }
      );
    }
}
}

