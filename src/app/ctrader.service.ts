import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CtraderService {

  private http = inject(HttpClient);
  private tokenUrl = 'https://id.ctrader.com/api/v1/auth/token';

  getAccessToken(code: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('client_id', '16156_TXorNloYylol4020vrnEu8Jg5apkQpXep6jjtyvQTEAd4RrOLt');
    body.set('client_secret', 'VcVZEj1g4qWt6qJhVaPNMkCeDD1L7fclDIqPGZPVBzShKraOQJ');
    body.set('code', code);
    body.set('redirect_uri', 'https://quantumtradingedge.web.app/ctrader');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.http.post(this.tokenUrl, body.toString(), httpOptions);
  }

  saveTokens(tokens: { access_token?: string, refresh_token?: string }): void {
    if (tokens?.access_token) {
      localStorage.setItem('ctrader_access_token', tokens.access_token);
    }
    if (tokens?.refresh_token) {
      localStorage.setItem('ctrader_refresh_token', tokens.refresh_token);
    }
  }

  getAccessTokenFromStorage(): string | null {
    return localStorage.getItem('ctrader_access_token');
  }

  getRefreshTokenFromStorage(): string | null {
    return localStorage.getItem('ctrader_refresh_token');
  }

  getPrices(symbol: string): Observable<any> {
    const accessToken = this.getAccessTokenFromStorage();

    if (!accessToken) {
      return throwError(() => new Error('Access token not available.'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    // Replace 'YOUR_PRICES_API_ENDPOINT' with the actual cTrader API endpoint for prices
    const pricesUrl = 'YOUR_PRICES_API_ENDPOINT';
    return this.http.get(pricesUrl, { headers, params: { symbol: symbol } });
  }
}