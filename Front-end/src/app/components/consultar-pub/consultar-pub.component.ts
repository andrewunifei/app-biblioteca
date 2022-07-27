import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConsultarHandlerService } from 'src/app/services/consultar-handler.service'

@Component({
  selector: 'app-consultar-pub',
  templateUrl: './consultar-pub.component.html',
  styleUrls: ['./consultar-pub.component.css']
})
export class ConsultarPubComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  show = false;
  flag = true;
  instances_d = {};
  instances_i = {};

  titulo = ''
  isbn = ''

    constructor(
        private formBuilder: FormBuilder,
        private consultarHandler: ConsultarHandlerService,
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            isbn: ['', Validators.required],
            titulo: ['', Validators.required]
        });

        this.show = false;
        this.form.get('isbn').disable()
        this.form.get('titulo').disable()
    }

    handleInput1(){
      this.form.get('isbn').enable()
      this.form.get('titulo').disable()
    }

    handleInput2(){
      this.form.get('isbn').disable()
      this.form.get('titulo').enable()
    }


    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.consultarHandler.consultar_pub({
          isbn: this.f.isbn.value,
          titulo: this.f.titulo.value
        })
        .subscribe({
          next: (response) => {
            this.instances_d = response["disponiveis"]
            this.instances_i = response["indisponiveis"]
            this.show = true;
            this.loading = false;
            this.titulo = '';
            this.isbn = '';
            this.form.get('isbn').disable()
            this.form.get('titulo').disable()
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
