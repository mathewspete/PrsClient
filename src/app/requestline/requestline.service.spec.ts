import { TestBed } from '@angular/core/testing';

import { RequestlineService } from './requestline.service';

describe('RequestlineService', () => {
  let service: RequestlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
