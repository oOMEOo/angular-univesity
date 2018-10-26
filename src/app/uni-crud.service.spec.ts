import { TestBed } from '@angular/core/testing';

import { UniCrudService } from './uni-crud.service';

describe('UniCrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UniCrudService = TestBed.get(UniCrudService);
    expect(service).toBeTruthy();
  });
});
