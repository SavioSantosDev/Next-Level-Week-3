import { TestBed } from '@angular/core/testing';

import { OrphanagesMapService } from './orphanages-map.service';

describe('OrphanagesMapService', () => {
  let service: OrphanagesMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrphanagesMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
