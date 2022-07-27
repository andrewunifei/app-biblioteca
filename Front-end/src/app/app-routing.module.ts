import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { LoginFuncComponent } from './components/login-func/login-func.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth/auth.service';
import { CadastrarFuncComponent } from './components/cadastrar-func/cadastrar-func.component';
import { CadastrarAssocComponent } from './components/cadastrar-assoc/cadastrar-assoc.component';
import { CadastrarPubComponent } from './components/cadastrar-pub/cadastrar-pub.component';
import { CadastrarExemplarComponent } from './components/cadastrar-exemplar/cadastrar-exemplar.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { EmprestimoComponent } from './components/emprestimo/emprestimo.component';
import { ConsultarPubComponent } from './components/consultar-pub/consultar-pub.component'
import { DevolucaoComponent } from './components/devolucao/devolucao.component';
import { RetirarComponent } from './components/retirar/retirar.component';
import { RelatorioComponent } from './components/relatorio/relatorio.component';
import { ConsultarEmprestimoComponent } from './components/consultar-emprestimo/consultar-emprestimo.component'
import { RenovarComponent } from './components/renovar/renovar.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login-func', component: LoginFuncComponent },
  { path: 'login-screen', component: LoginScreenComponent },
  { path: 'cadastrar-func', component: CadastrarFuncComponent, canActivate: [AuthGuard] },
  { path: 'cadastrar-assoc', component: CadastrarAssocComponent, canActivate: [AuthGuard] },
  { path: 'cadastrar-pub', component: CadastrarPubComponent, canActivate: [AuthGuard] },
  { path: 'cadastrar-exemplar', component: CadastrarExemplarComponent, canActivate: [AuthGuard] },
  { path: 'reserva', component: ReservaComponent, canActivate: [AuthGuard] },
  { path: 'emprestimo', component: EmprestimoComponent, canActivate: [AuthGuard] },
  { path: 'consultar-pub', component: ConsultarPubComponent, canActivate: [AuthGuard]},
  { path: 'devolucao', component: DevolucaoComponent, canActivate: [AuthGuard]},
  { path: 'retirar', component: RetirarComponent, canActivate: [AuthGuard]},
  { path: 'relatorio', component: RelatorioComponent, canActivate: [AuthGuard]},
  { path: 'consultar-emp', component: ConsultarEmprestimoComponent, canActivate: [AuthGuard]},
  { path: 'renovar', component: RenovarComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
