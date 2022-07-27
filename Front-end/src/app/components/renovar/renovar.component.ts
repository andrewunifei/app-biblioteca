import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CadastroHandlerService } from 'src/app/services/cadastro-handler.service'

@Component({
  selector: 'app-renovar',
  templateUrl: './renovar.component.html',
  styleUrls: ['./renovar.component.css']
})
export class RenovarComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  show = false;
  show2 = false;
  info = {
    nro_exemplar: '',
    pub_isbn: '',
    cod_assoc: '',
    data_emp: '',
    data_devol: ''
  };
  retorno: ''

    constructor(
        private formBuilder: FormBuilder,
        private cadastroHandler: CadastroHandlerService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            nro_exemplar: ['', Validators.required],
            pub_isbn: ['', Validators.required],
            cod_assoc: ['', Validators.required],
            data_emp: ['', Validators.required]
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
        this.cadastroHandler.renovacao({
          nro_exemplar : this.f.nro_exemplar .value,
          pub_isbn: this.f.pub_isbn.value,
          cod_assoc: this.f.cod_assoc.value,
          data_emp: this.f.data_emp.value
        })
        .subscribe({
          next: (response) => {
            this.loading = false;
            
            if(response.flag){
              this.info.nro_exemplar = response.data.nro_exemplar,
              this.info.pub_isbn = response.data.pub_isbn,
              this.info.cod_assoc = response.data.cod_assoc,
              this.info.data_emp = response.data.data_emp,
              this.info.data_devol = response.data.data_devol

              this.show = true;
              console.log(response)
            }else{
              this.retorno = response.message;
              this.show2 = true;
            }
          },

          error: error => {
            console.log(error);
            this.loading = false;
        }
        })
    }

    switch_value () {
      this.show = false;
      this.show2 = false;
    }
}
