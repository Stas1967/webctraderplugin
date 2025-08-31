import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ctrader } from './ctrader';

describe('Ctrader', () => {
  let component: Ctrader;
  let fixture: ComponentFixture<Ctrader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ctrader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ctrader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
