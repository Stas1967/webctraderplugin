import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtraderCallback } from './ctrader-callback';

describe('CtraderCallback', () => {
  let component: CtraderCallback;
  let fixture: ComponentFixture<CtraderCallback>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtraderCallback]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtraderCallback);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
