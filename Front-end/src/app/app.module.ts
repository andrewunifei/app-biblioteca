import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { LoginFuncComponent } from './components/login-func/login-func.component';
import { HomeComponent } from './components/home/home.component';
import { CadastrarFuncComponent } from './components/cadastrar-func/cadastrar-func.component';
import { CadastrarAssocComponent } from './components/cadastrar-assoc/cadastrar-assoc.component';
import { CadastrarPubComponent } from './components/cadastrar-pub/cadastrar-pub.component';
import { CadastrarExemplarComponent } from './components/cadastrar-exemplar/cadastrar-exemplar.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { ConsultarPubComponent } from './components/consultar-pub/consultar-pub.component';
import { EmprestimoComponent } from './components/emprestimo/emprestimo.component';
import { DevolucaoComponent } from './components/devolucao/devolucao.component';
import { RetirarComponent } from './components/retirar/retirar.component';
import { RelatorioComponent } from './components/relatorio/relatorio.component';
import { ConsultarEmprestimoComponent } from './components/consultar-emprestimo/consultar-emprestimo.component';
import { RenovarComponent } from './components/renovar/renovar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    LoginFuncComponent,
    HomeComponent,
    CadastrarFuncComponent,
    CadastrarAssocComponent,
    CadastrarPubComponent,
    CadastrarExemplarComponent,
    ReservaComponent,
    ConsultarPubComponent,
    EmprestimoComponent,
    DevolucaoComponent,
    RetirarComponent,
    RelatorioComponent,
    ConsultarEmprestimoComponent,
    RenovarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
