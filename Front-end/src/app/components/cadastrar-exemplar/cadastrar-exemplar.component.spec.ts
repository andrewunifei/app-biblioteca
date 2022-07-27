import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarExemplarComponent } from './cadastrar-exemplar.component';

describe('CadastrarExemplarComponent', () => {
  let component: CadastrarExemplarComponent;
  let fixture: ComponentFixture<CadastrarExemplarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarExemplarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarExemplarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
