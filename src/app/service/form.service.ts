import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {ClientDTO} from "../model/ClientDTO.model";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private apiUrl = environment.baseUrl;

  private baseUrl = `${this.apiUrl}/api/bankaccount`;

  constructor(private http: HttpClient) { }

  getFormByType(type: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/forms/${type}`, { headers });
  }
  createInvoice(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`http://localhost:8080/api/invoices`, formData, { headers });
  }

  confirmPayment(sourceAccountId: number, amount: number): Observable<any> {
    const formData = new FormData();
    formData.append('sourceAccountId', sourceAccountId.toString());
    formData.append('amount', amount.toString());
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`http://localhost:8080/api/bankaccount/payment`, formData, {  headers,
      responseType: 'text' as 'json' // Force the response to be treated as text
    }); }

  getPaymentHistory(clientId: String): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`http://localhost:8080/api/invoices/pending/${clientId}`, { headers });
  }

}
