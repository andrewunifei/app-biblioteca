import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CadastroHandlerService } from 'src/app/services/cadastro-handler.service'

@Component({
  selector: 'app-cadastrar-exemplar',
  templateUrl: './cadastrar-exemplar.component.html',
  styleUrls: ['./cadastrar-exemplar.component.css']
})
export class CadastrarExemplarComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  show = false;
  info = {
    numero: '',
    isbn: '',
    preco: ''
  }

    constructor(
        private formBuilder: FormBuilder,
        private cadastroHandler: CadastroHandlerService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            numero: ['', Validators.required],
            isbn: ['', Validators.required],
            preco: ['', Validators.required]
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
        this.cadastroHandler.cadastrar_exemplar({
          numero: this.f.numero.value,
          isbn: this.f.isbn.value,
          preco: this.f.preco.value,
        })
        .subscribe({
          next: (response) => {
            this.loading = false;

            this.info.numero = response.numero;
            this.info.isbn = response.pub_isbn;
            this.info.preco = response.preco;

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
