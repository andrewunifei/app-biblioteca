import { Component, OnInit } from '@angular/core';
import { LoginHandler } from 'src/app/services/login-handler.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private loginHandler: LoginHandler,
  ) { }

  ngOnInit(): void {
  }
}
