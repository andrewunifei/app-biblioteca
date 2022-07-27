import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFuncComponent } from './login-func.component';

describe('LoginFuncComponent', () => {
  let component: LoginFuncComponent;
  let fixture: ComponentFixture<LoginFuncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFuncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
