import { TestBed } from '@angular/core/testing';

import { CustomHttpService } from './custom-http.service';

describe('CustomHttp.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomHttpService = TestBed.get(CustomHttpService);
    expect(service).toBeTruthy();
  });
});
