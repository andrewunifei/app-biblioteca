import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPubComponent } from './cadastrar-pub.component';

describe('CadastrarPubComponent', () => {
  let component: CadastrarPubComponent;
  let fixture: ComponentFixture<CadastrarPubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarPubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
