import { TestBed } from '@angular/core/testing';

import { MarkerConfig } from './marker-config';

describe('MarkerConfig', () => {
  let service: MarkerConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkerConfig);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
