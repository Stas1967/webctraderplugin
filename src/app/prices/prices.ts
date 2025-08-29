import { ChangeDetectionStrategy, Component, OnDestroy, signal, inject, OnInit } from '@angular/core';
import { CtraderService } from '../ctrader.service';
import { Subject, takeUntil, catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prices',
 imports: [CommonModule],
  templateUrl: './prices.html',
  styleUrl: './prices.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Prices implements OnInit, OnDestroy {
  private ctraderService = inject(CtraderService);
  private destroy$ = new Subject<void>();

  pricesData = signal<any>(null);

  ngOnInit(): void {
 this.ctraderService.getPrices('EURUSD').pipe(
 takeUntil(this.destroy$),
 catchError(error => {
 console.error('Error fetching prices:', error);
 return of(null); // Return a new observable with null or handle error as needed
 })
 ).subscribe(response => {
 console.log('Prices data:', response);
 this.pricesData.set(response);
 });
  }

  ngOnDestroy(): void {
 this.destroy$.next();
 this.destroy$.complete();
  }

}
