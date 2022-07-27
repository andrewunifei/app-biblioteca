import { TestBed } from '@angular/core/testing';

import { ConsultarHandlerService } from './consultar-handler.service';

describe('ConsultarHandlerService', () => {
  let service: ConsultarHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultarHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
