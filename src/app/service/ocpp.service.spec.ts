import { TestBed } from '@angular/core/testing';

import { OcppService } from './ocpp.service';

describe('OcppService', () => {
  let service: OcppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OcppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
