import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AccountOperationDTO} from "../model/AccountOpertionDTO.model";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountOperationService {
  private apiUrl1 = environment.baseUrl;

  private apiUrl = `${this.apiUrl1}/api/bankaccount/operations`; // URL de votre endpoint

  constructor(private http: HttpClient) { }

  getAccountOperations(accountId: number): Observable<AccountOperationDTO[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<AccountOperationDTO[]>(`${this.apiUrl}?accountId=${accountId}`,{ headers });
  }
}
