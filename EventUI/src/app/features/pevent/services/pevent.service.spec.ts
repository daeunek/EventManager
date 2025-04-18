import { TestBed } from '@angular/core/testing';

import { PeventService } from './pevent.service';

describe('PeventService', () => {
  let service: PeventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
