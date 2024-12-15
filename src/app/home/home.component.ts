import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponentComponent } from '../login-component/login-component.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loginDialogDisplayed: boolean = false; // Variable de statut
  errorMessage: any;
  loginForm: any;
  blurBackground: boolean = false; // Ajout de la variable pour contrôler le flou de l'arrière-plan

  constructor(public dialog: MatDialog) { }

  openLoginDialog(): void {
    if (!this.loginDialogDisplayed) {
      const dialogRef = this.dialog.open(LoginComponentComponent, {
        width: '250px',
      });

      dialogRef.afterOpened().subscribe(() => {
        this.addBlurBackground(); // Ajouter la classe pour flouter l'arrière-plan
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.removeBlurBackground(); // Supprimer la classe pour enlever le flou de l'arrière-plan
      });

      this.loginDialogDisplayed = false;
    }
  }

  addBlurBackground(): void {
    this.blurBackground = true;
  }

  removeBlurBackground(): void {
    this.blurBackground = false;
  }

  onSubmit() {

  }
}
