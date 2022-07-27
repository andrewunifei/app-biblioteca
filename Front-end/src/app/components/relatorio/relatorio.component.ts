import { Component, OnInit } from '@angular/core';

import { ConsultarHandlerService } from 'src/app/services/consultar-handler.service'

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {
  dados = [];

    constructor(
        private consultarHandler: ConsultarHandlerService,
    ) { }

    ngOnInit() {
      this.consultarHandler.relatorio()
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
