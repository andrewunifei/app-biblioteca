import { TestBed } from '@angular/core/testing';

import { CadastroHandlerService } from './cadastro-handler.service';

describe('CadastroHandlerService', () => {
  let service: CadastroHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
