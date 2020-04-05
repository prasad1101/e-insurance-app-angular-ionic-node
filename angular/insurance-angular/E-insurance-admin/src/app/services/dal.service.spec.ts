import { TestBed } from '@angular/core/testing';

import { DalService } from './dal.service';

describe('Dal.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DalService = TestBed.get(DalService);
    expect(service).toBeTruthy();
  });
});
