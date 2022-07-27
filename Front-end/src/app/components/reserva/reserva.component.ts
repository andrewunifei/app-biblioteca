import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component'

import { CadastroHandlerService } from 'src/app/services/cadastro-handler.service'

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  show = false;
  info = {
    pub_isbn: '',
    cod_assoc: '',
    data: '',
    status: 'Iniciado'
  }

    constructor(
        private formBuilder: FormBuilder,
        private cadastroHandler: CadastroHandlerService,
        private route: ActivatedRoute,
        private router: Router,
        private appComponent: AppComponent
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            pub_isbn: ['', Validators.required],
            cod_assoc: ['', Validators.required],
            data: ['', Validators.required],
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
        this.cadastroHandler.cadastrar_reserva({
          pub_isbn: this.f.pub_isbn.value,
          cod_assoc: this.f.cod_assoc.value,
          data: this.f.data.value,
          status: this.info.status
        })
        .subscribe({
          next: (response) => {
            this.loading = false;

            this.info.pub_isbn = response.pub_isbn;
            this.info.cod_assoc = response.codigo_assoc;
            this.info.data = response.data;

            this.show = true;
            console.log(response)
          },

          error: error => {
            console.log(error);
            this.loading = false;
        }
        })
    }

    switch_value () {
      this.show = false;
    }
}
