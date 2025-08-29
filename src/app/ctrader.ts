import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Ctrader {

  private http = inject(HttpClient);
  private clientId = '16156_TXorNloYylol4020vrnEu8Jg5apkQpXep6jjtyvQTEAd4RrOLt';
  private redirectUri = 'https://quantumtradingedge.web.app/ctrader';
  private tokenEndpoint = 'https://id.ctrader.com/api/v1/auth/token';
//'https://openapi.ctrader.com/apps/token?grant_type=authorization_code&code=0ssdgds98as9_QSF56FVC_22dfdf&redirect_uri=https://spotware.com&client_id=5430012&client_secret=012sds23dlkjQsd' -H 'Accept: application/json' -H 'Content-Type: application/json'
  // !!! IMPORTANT !!! Replace 'YOUR_CLIENT_SECRET' with your actual client secret
  private clientSecret = 'VcVZEj1g4qWt6qJhVaPNMkCeDD1L7fclDIqPGZPVBzShKraOQJ';

  getAccessToken(code: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('client_id', this.clientId);
    body.set('client_secret', this.clientSecret);
    body.set('code', code);
    body.set('redirect_uri', this.redirectUri);
    return this.http.post(this.tokenEndpoint, body.toString(), { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
  }
}
