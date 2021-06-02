import { TestBed } from '@angular/core/testing';

import { SamplerServiceService } from './sampler-service.service';

describe('SamplerServiceService', () => {
  let service: SamplerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SamplerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
