import { TestBed } from '@angular/core/testing';

import { SwatchService } from './swatch.service';

describe('SwatchService', () => {
  let service: SwatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
