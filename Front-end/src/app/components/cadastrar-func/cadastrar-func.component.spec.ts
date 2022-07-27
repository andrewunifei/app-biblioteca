import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarFuncComponent } from './cadastrar-func.component';

describe('CadastrarFuncComponent', () => {
  let component: CadastrarFuncComponent;
  let fixture: ComponentFixture<CadastrarFuncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarFuncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarFuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
