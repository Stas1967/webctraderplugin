import { TestBed } from '@angular/core/testing';

import { Ctrader } from './ctrader';

describe('Ctrader', () => {
  let service: Ctrader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ctrader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
