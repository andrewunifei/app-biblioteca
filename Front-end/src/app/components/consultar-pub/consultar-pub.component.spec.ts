import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPubComponent } from './consultar-pub.component';

describe('ConsultarPubComponent', () => {
  let component: ConsultarPubComponent;
  let fixture: ComponentFixture<ConsultarPubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarPubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
