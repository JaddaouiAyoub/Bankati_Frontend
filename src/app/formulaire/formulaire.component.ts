import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgentService } from "../service/agent.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {
  formulaire: FormGroup;
  emailExistsError = false ;
  emailConfirmationError: boolean = false; // Ajout d'une variable pour gérer l'erreur de confirmation d'email


  constructor(private fb: FormBuilder, private agentService: AgentService, private router: Router) {
    this.formulaire = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      pieceIdentite: ['C.I.N', Validators.required],
      numeroPieceIdentite: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmationEmail: ['', [Validators.required, Validators.email]],
      numeroTelephone: ['', Validators.required],
      numeroImmatriculation: ['', Validators.required],
      numeroPatente: ['', Validators.required],
      description: [''],
      piecesJointes: this.fb.group({
        fichierRecto: [null],
        fichierVerso: [null]
      })
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any, fileType: string): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && fileType === 'recto') {
      this.formulaire.get('piecesJointes')?.get('fichierRecto')?.setValue(file);
    } else if (file && fileType === 'verso') {
      this.formulaire.get('piecesJointes')?.get('fichierVerso')?.setValue(file);
    }
  }

  onSubmit(): void {
    if (this.formulaire.valid) {
      if (this.formulaire.get('email')?.value !== this.formulaire.get('confirmationEmail')?.value) {
        this.emailConfirmationError = true; // Activer l'erreur de confirmation d'email
        return;
      }

      const formData = new FormData();
      formData.append('lastname', this.formulaire.get('nom')?.value);
      formData.append('firstname', this.formulaire.get('prenom')?.value);
      formData.append('pieceIdentite', this.formulaire.get('pieceIdentite')?.value);
      formData.append('numCin', this.formulaire.get('numeroPieceIdentite')?.value);
      formData.append('birthdate', this.formulaire.get('dateNaissance')?.value);
      formData.append('address', this.formulaire.get('adresse')?.value);
      formData.append('email', this.formulaire.get('email')?.value);
      formData.append('emailConfirmation', this.formulaire.get('confirmationEmail')?.value);
      formData.append('phonenumber', this.formulaire.get('numeroTelephone')?.value);
      formData.append('numRegCom', this.formulaire.get('numeroImmatriculation')?.value);
      formData.append('numLicence', this.formulaire.get('numeroPatente')?.value);
      formData.append('description', this.formulaire.get('description')?.value);

      const fileRecto = this.formulaire.get('piecesJointes')?.get('fichierRecto')?.value;
      if (fileRecto) {
        formData.append('cinRecto', fileRecto);
      }

      const fileVerso = this.formulaire.get('piecesJointes')?.get('fichierVerso')?.value;
      if (fileVerso) {
        formData.append('cinVerso', fileVerso);
      }

      this.agentService.subscribeAgent(formData).subscribe(
        response => {
          console.log('Données envoyées avec succès', response);
          // this.router.navigate(['/creditors-list']);
        },
        error => {
          console.error('Erreur lors de l\'envoi des données', error);
          if (error.status === 409 && error.error && error.error.message === 'Email already exists') {
            this.emailExistsError = true; // Activer l'erreur d'email existant
          }
        }
      );
    } else {
      console.error('Formulaire invalide');
    }
  }
}
