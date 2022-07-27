import { Component, OnInit } from '@angular/core';
import { LoginHandler } from 'src/app/services/login-handler.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  tipo: string;
  nome: string;

  constructor(
    private loginHandler: LoginHandler,
  ) { }

  ngOnInit(): void {
    const user = this.loginHandler.userValue;
    if (user) {
      if (this.loginHandler.userValue.tipo != 'funcionario' && this.loginHandler.userValue.tipo != 'gerente'){
        this.tipo = 'assoc';
      }
      else{
        this.tipo = this.loginHandler.userValue.tipo;
      }
      
      this.nome = this.loginHandler.userValue.nome;
    }
  }

  logout(){
    this.tipo = 'x'
    this.loginHandler.logout()
  }
}
