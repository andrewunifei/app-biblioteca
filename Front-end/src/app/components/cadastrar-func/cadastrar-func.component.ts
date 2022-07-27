import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CadastroHandlerService } from 'src/app/services/cadastro-handler.service'

@Component({
  selector: 'app-cadastrar-func',
  templateUrl: './cadastrar-func.component.html',
  styleUrls: ['./cadastrar-func.component.css']
})
export class CadastrarFuncComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  show = false;
  info = {
    codigo: '',
    nome: '',
    funcao: '',
    email: ''
  }
  funcoes = [
    {name: 'funcionario', abbrev: 'Funcionário'},
    {name: 'gerente', abbrev: 'Gerente'},
  ]

    constructor(
        private formBuilder: FormBuilder,
        private cadastroHandler: CadastroHandlerService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            senha: ['', Validators.required],
            nome: ['', Validators.required],
            funcao: ['', Validators.required],
            email: ['', Validators.required]
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
        this.cadastroHandler.cadastrar_func({
          senha: this.f.senha.value,
          nome: this.f.nome.value,
          funcao: this.f.funcao.value.name,
          email: this.f.email.value
        })
        .subscribe({
          next: (response) => {
            this.loading = false;

            this.info.codigo = response.codigo;
            this.info.nome = response.nome;
            this.info.funcao = response.funcao;
            this.info.email = response.email;

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
