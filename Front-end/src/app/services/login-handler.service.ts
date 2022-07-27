import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

@Injectable({ providedIn: 'root' })
export class LoginHandler {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(codigo, senha): Observable<any>{
        return this.http.post<User>(baseUrl, {
            codigo: codigo,
            senha: senha
        })
        .pipe(map(response => {
            localStorage.setItem('user', JSON.stringify({
                codigo: response[0].codigo,
                senha: response[0].senha,
                tipo: response[0].funcao,
                nome: response[0].nome
            }));
            this.userSubject.next({
                codigo: response[0].codigo,
                senha: response[0].senha,
                tipo: response[0].funcao,
                nome: response[0].nome
            });
        
            return response[0];
            }));
    }

    login_associado(codigo, senha): Observable<any>{
        return this.http.post<User>(baseUrl + 'associado', {
            codigo: codigo,
            senha: senha
        })
        .pipe(map(response => {
                localStorage.setItem('user', JSON.stringify({
                        codigo: response[0].codigo,
                        senha: response[0].senha,
                        tipo: response[0].status,
                        nome: response[0].nome
                }));
                this.userSubject.next({
                    codigo: response[0].codigo,
                    senha: response[0].senha,
                    tipo: response[0].status,
                    nome: response[0].nome
                });
               
                return response[0];
        }));
    }

    logout() {
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['login-screen']);
    }
}