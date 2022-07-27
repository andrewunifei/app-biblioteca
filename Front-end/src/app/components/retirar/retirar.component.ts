import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CadastroHandlerService } from 'src/app/services/cadastro-handler.service'

@Component({
  selector: 'app-retirar',
  templateUrl: './retirar.component.html',
  styleUrls: ['./retirar.component.css']
})
export class RetirarComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  show = false;

    constructor(
        private formBuilder: FormBuilder,
        private cadastroHandler: CadastroHandlerService,
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
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
        this.cadastroHandler.retirar({
          cod_assoc: this.f.cod_assoc.value
        })
        .subscribe({
          next: (response) => {
            console.log(response)
            this.loading = false;
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
