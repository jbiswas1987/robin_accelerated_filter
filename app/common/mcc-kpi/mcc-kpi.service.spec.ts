import { TestBed } from '@angular/core/testing';

import { MccKpiService } from './mcc-kpi.service';

describe('MccKpiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MccKpiService = TestBed.get(MccKpiService);
    expect(service).toBeTruthy();
  });
});
