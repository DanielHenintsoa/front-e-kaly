import { TestBed } from '@angular/core/testing';

import { EKalyService } from './e-kaly.service';

describe('EKalyService', () => {
  let service: EKalyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EKalyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
