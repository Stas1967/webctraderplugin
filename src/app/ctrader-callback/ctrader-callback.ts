import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CtraderService } from '../ctrader.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({ 
  selector: 'app-ctrader-callback',
  standalone: true,
  imports: [],
  templateUrl: './ctrader-callback.html',
  styleUrl: './ctrader-callback.css',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CtraderCallback implements OnInit {

  private route = inject(ActivatedRoute); 
  private ctraderService = inject(CtraderService);
  private router = inject(Router);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        console.log('Authorization Code:', code);
        this.ctraderService.getAccessToken(code).pipe(
          catchError(error => {
            console.error('Error getting access token:', error);
            return of(null); // Return a null observable to continue the stream
          })
        ).subscribe(response => {
          if (response) {
            console.log('Access Token Response:', response); // Log de la respuesta completa

            // Acceder a las propiedades de la respuesta
            const accessToken = response.accessToken;
            const refreshToken = response.refreshToken;
            const expiresIn = response.expiresIn;
            const tokenType = response.tokenType;
            const errorCode = response.errorCode;
            const description = response.description;

            if (errorCode === null) {
              console.log('Access Token:', accessToken);
              console.log('Refresh Token:', refreshToken);
              console.log('Expires In:', expiresIn);
              console.log('Token Type:', tokenType);

              this.ctraderService.saveTokens(response);
              this.router.navigate(['/prices']);

            } else {
              console.error('Error in token response:', description);
              // Manejar el error de la API de cTrader (por ejemplo, mostrar un mensaje al usuario)
            }
          }
        });
      }
    });
  }
// this is only for take in mind
  autorize(): void {
    const tokenacces ="https://openapi.ctrader.com/apps/token?grant_type=authorization_code&code={mycode}&client_id= 16156_TXorNloYylol4020vrnEu8Jg5apkQpXep6jjtyvQTEAd4RrOLt&client_secret=VcVZEj1g4qWt6qJhVaPNMkCeDD1L7fclDIqPGZPVBzShKraOQJ";
  }

}