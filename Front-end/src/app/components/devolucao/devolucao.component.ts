import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component'

import { CadastroHandlerService } from 'src/app/services/cadastro-handler.service'

@Component({
  selector: 'app-devolucao',
  templateUrl: './devolucao.component.html',
  styleUrls: ['./devolucao.component.css']
})
export class DevolucaoComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  show = false;
  show2 = false;
  info = {
    multa: ''
  };

    constructor(
        private formBuilder: FormBuilder,
        private cadastroHandler: CadastroHandlerService,
        private route: ActivatedRoute,
        private router: Router,
        private appComponent: AppComponent
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            nro_exemplar: ['', Validators.required],
            pub_isbn: ['', Validators.required],
            cod_assoc: ['', Validators.required]
        });

        this.show = false;
    }

    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.cadastroHandler.devolucao({
          nro_exemplar : this.f.nro_exemplar .value,
          pub_isbn: this.f.pub_isbn.value,
          cod_assoc: this.f.cod_assoc.value
        })
        .subscribe({
          next: (response) => {
            this.loading = false;

            this.info.multa = response.multa
            this.show = true;
          },

          error: error => {
            this.loading = false;
        }
        })
    }

    switch_value () {
      this.show = false;
    }
}
