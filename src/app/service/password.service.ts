import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private apiUrl = environment.baseUrl;
  private baseUrl = `${this.apiUrl}/password`;

  constructor(private http: HttpClient) {}

  changeAgentPassword(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}/agent`, formData, { headers });
  }

  changeClientPassword(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}/client`, formData, { headers });  }
}
