import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ctrader-login',
  template: `
    <div class="login-container">
      <h1>Welcome to cTrader Web Plugin</h1>
      <p>Please connect your cTrader account to continue.</p>
      <button (click)="login()">Connect to cTrader</button>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
      height: 80vh;
    }
    h1 {
      font-size: 2.5rem;
      font-weight: 300;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.2rem;
      color: #b0b0b0;
      margin-bottom: 2rem;
    }
    button {
      background-color: var(--accent-color);
      color: white;
      padding: 1rem 2rem;
      border: none;
      border-radius: 8px;
      font-size: 1.2rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.2s;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    button:hover {
      background-color: #00bfa5;
      transform: translateY(-2px);
    }
  `]
})
export class CtraderLoginComponent {
  login() {
    const clientId = '2605_A2hQ66YQy1p2x8q8y4k4g4k0c8w4w8c8g8g8c4g0c4w4w4c4g4';
    const redirectUri = 'https://candleeye-vuy50.web.app/ctrader-callback';
    const scope = 'trading accounts'; // Request both trading and accounts scopes
    const authUrl = `https://connect.spotware.com/oauth/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = authUrl;
  }
}
