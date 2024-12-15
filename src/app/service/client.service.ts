import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environment/environment";
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }
  subscribeClient(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/api/clients`, formData, { headers });
  }
}
