import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CtraderService, Account } from '../ctrader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-info',
  imports: [CommonModule],
  template: `
    <div class="account-info-container">
      @if (account(); as acc) {
        <h2>Account Details</h2>
        <p><strong>Account ID:</strong> {{ acc.accountId }}</p>
        <p><strong>Broker:</strong> {{ acc.brokerName }}</p>
        <p><strong>Balance:</strong> {{ acc.balance | number:'1.2-2' }} {{ acc.currency }}</p>
      } @else {
        <p>No account information available.</p>
      }
    </div>
  `,
  styles: [`
    .account-info-container {
      padding: 2rem;
      background-color: #2a2a2a;
      border-radius: 8px;
      color: white;
    }
    h2 {
      color: var(--accent-color);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountInfoComponent {
  public account = input.required<Account | null>();
}
