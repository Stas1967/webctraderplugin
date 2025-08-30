import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CtraderService } from '../ctrader.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-auth-callback',
  template: `<p>Processing login...</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCallbackComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);
  private ctraderService = inject(CtraderService);

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.exchangeCodeForToken(code);
    } else {
      console.error('Authorization code not found');
      this.router.navigate(['/login']);
    }
  }

  private exchangeCodeForToken(code: string): void {
    const tokenUrl = 'https://connect.spotware.com/oauth/v2/token';
    const clientId = '2605_A2hQ66YQy1p2x8q8y4k4g4k0c8w4w8c8g8g8c4g0c4w4w4c4g4';
    const redirectUri = 'https://candleeye-vuy50.web.app/ctrader-callback';

    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', redirectUri)
      .set('client_id', clientId);

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    this.http.post(tokenUrl, body.toString(), { headers }).subscribe({
      next: (response: any) => {
        console.log('Token exchange successful:', response);
        this.ctraderService.saveTokens(response);
        // Now that we have tokens, let's fetch account info
        this.ctraderService.getAccountInfo(response.accessToken).then(() => {
            this.router.navigate(['/prices']);
        });
      },
      error: (err) => {
        console.error('Token exchange failed:', err);
        this.router.navigate(['/login']);
      }
    });
  }
}
