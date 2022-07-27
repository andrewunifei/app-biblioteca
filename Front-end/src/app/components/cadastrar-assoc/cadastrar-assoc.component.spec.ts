import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarAssocComponent } from './cadastrar-assoc.component';

describe('CadastrarAssocComponent', () => {
  let component: CadastrarAssocComponent;
  let fixture: ComponentFixture<CadastrarAssocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarAssocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarAssocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
