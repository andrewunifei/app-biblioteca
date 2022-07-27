import { Component, OnInit } from '@angular/core';

import { ConsultarHandlerService } from 'src/app/services/consultar-handler.service'

@Component({
  selector: 'app-consultar-emprestimo',
  templateUrl: './consultar-emprestimo.component.html',
  styleUrls: ['./consultar-emprestimo.component.css']
})
export class ConsultarEmprestimoComponent implements OnInit {

  dados = [];

    constructor(
        private consultaroHandler: ConsultarHandlerService,
    ) { }

    ngOnInit() {
      this.consultaroHandler.consultar_emp()
      .subscribe({
        next: (response) => {
          console.log(response)
          this.dados = response
        },

        error: error => {
          console.log(error)
      }
      })
    }
  }
