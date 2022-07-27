import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models';
import { environment } from 'src/environments/environment';

let baseUrl;

// Determina se é produção ou desenvolvimento
if(environment.production){
  baseUrl = 'https://sistema-controle-biblioteca.herokuapp.com/api/'
}
else{
  baseUrl = 'http://localhost:8080/api/';
}

@Injectable({
  providedIn: 'root'
})
export class ConsultarHandlerService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  consultar_pub(data): Observable<any>{
    return this.http.post<User>(baseUrl + 'consultar-pub', data)
  }

  relatorio(): Observable<any>{
    return this.http.get<any>(baseUrl + 'relatorio')
  }

  consultar_emp(): Observable<any>{
    return this.http.get<any>(baseUrl + 'consultar-emp')
  }

}
