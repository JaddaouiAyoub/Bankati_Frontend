import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl1 = environment.baseUrl;

  private apiUrl = `${this.apiUrl1}/login`; // URL de l'API Spring Boot

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<string> {
    console.log({ email, password });

    const headers = new HttpHeaders();

    // Préparer le corps de la requête avec FormData
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return this.http.post<any>(this.apiUrl, formData, { headers }).pipe(
      map(response => {
        console.log({ response });
        // Assuming the response is a JSON object containing role and token
        const { firstlogin, role, token, clientId, clientDTO } = response;

        if (token && role) {
          localStorage.setItem('firstlogin', firstlogin);
          localStorage.setItem('token', token); // Enregistrer le token dans le localStorage
          localStorage.setItem('role', role); // Enregistrer le rôle dans le localStorage
          localStorage.setItem('clientId', clientId); // Enregistrer le rôle dans le localStorage
          localStorage.setItem('clientDTO', JSON.stringify(clientDTO));
        }
        return response;
      })
    );
  }
}
