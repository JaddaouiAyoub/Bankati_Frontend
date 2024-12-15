import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logout(): void {
    // Supprimer tous les éléments de localStorage
    localStorage.clear();

    // Rediriger vers la page d'accueil
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    // Vérifiez si l'utilisateur est connecté
    return localStorage.getItem('token') !== null;
  }
  navigateToBankeOnline() {
    this.router.navigate(['/']);
  }
}
