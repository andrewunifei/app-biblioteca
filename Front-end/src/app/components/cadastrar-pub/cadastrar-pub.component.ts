import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CadastroHandlerService } from 'src/app/services/cadastro-handler.service'

@Component({
  selector: 'app-cadastrar-pub',
  templateUrl: './cadastrar-pub.component.html',
  styleUrls: ['./cadastrar-pub.component.css']
})
export class CadastrarPubComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  show = false;
  info = {
    isbn: '',
    titulo: '',
    autor: '',
    editora: ''
  }

    constructor(
        private formBuilder: FormBuilder,
        private cadastroHandler: CadastroHandlerService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            isbn: ['', Validators.required],
            titulo: ['', Validators.required],
            autor: ['', Validators.required],
            editora: ['', Validators.required]
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
        this.cadastroHandler.cadastrar_pub({
          isbn: this.f.isbn.value,
          titulo: this.f.titulo.value,
          autor: this.f.autor.value,
          editora: this.f.editora.value,
        })
        .subscribe({
          next: (response) => {
            this.loading = false;

            this.info.isbn = response.isbn;
            this.info.titulo = response.titulo;
            this.info.autor = response.autor;
            this.info.editora = response.editora;

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
