import { TestBed } from '@angular/core/testing';

import { LineitemsService } from './lineitems.service';

describe('LineitemsService', () => {
  let service: LineitemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineitemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
