import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CadastroHandlerService } from 'src/app/services/cadastro-handler.service'

@Component({
  selector: 'app-cadastrar-assoc',
  templateUrl: './cadastrar-assoc.component.html',
  styleUrls: ['./cadastrar-assoc.component.css']
})
export class CadastrarAssocComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  show = false;
  info = {
    codigo: '',
    nome: '',
    endereco: '',
    email: '',
    status: ''
  }
  statuss = [
    {name: 'Grad', abbrev: 'Graduando'},
    {name: 'Posgrad', abbrev: 'Pós-graduando'},
    {name: 'Prof', abbrev: 'Professor'}
  ]

    constructor(
        private formBuilder: FormBuilder,
        private cadastroHandler: CadastroHandlerService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            senha: ['', Validators.required],
            nome: ['', Validators.required],
            endereco: ['', Validators.required],
            email: ['', Validators.required],
            status: ['', Validators.required]
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
        this.cadastroHandler.cadastrar_assoc({
          senha: this.f.senha.value,
          nome: this.f.nome.value,
          endereco: this.f.endereco.value,
          email: this.f.email.value,
          status: this.f.status.value.name
        })
        .subscribe({
          next: (response) => {
            this.loading = false;

            this.info.codigo = response.codigo;
            this.info.nome = response.nome;
            this.info.endereco = response.endereco;
            this.info.email = response.email;
            this.info.status = response.status;

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
