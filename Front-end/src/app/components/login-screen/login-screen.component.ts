import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { LoginHandler } from 'src/app/services/login-handler.service'
import { AppComponent } from 'src/app/app.component'

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})

export class LoginScreenComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private loginHandler: LoginHandler,
        private route: ActivatedRoute,
        private router: Router,
        private appComponent: AppComponent
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.loginHandler.login_associado(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe({
            next: (response) => {
                this.appComponent.tipo = 'assoc';
                this.appComponent.nome = response.nome;
                console.log(response.nome)
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl(returnUrl);
            },
            error: error => {
                console.log(error);
                this.loading = false;
            }
        }
        );
    }
  }