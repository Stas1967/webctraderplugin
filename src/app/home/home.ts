import { Component, signal } from '@angular/core';
import { createLogger } from '@veksa/logger';
import { createClientAdapter } from '@spotware-web-team/sdk-external-api'

import { catchError, take, tap } from 'rxjs';
import {
  handleConfirmEvent,
  registerEvent,
  getAccountInformation,
  getAccountInformationHandler,
  getLightSymbolList,
  subscribeQuotes,
  quoteEvent,

} from '@spotware-web-team/sdk';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private adapter: any;
  public logger: any;
  public accountInfoMsg: string = '';
  public errorMsg: string = '';
  public genInfoMsg: any;
  public quote: any = null;
  public isConnected: boolean = false;

  public setConnected = signal(false);
  constructor() {

  }
  ngOnInit() {
    this.logger = createLogger(true);
    this.adapter = createClientAdapter({ logger: this.logger });
    this.accountInfoMsg = "Dupa wolowa";

    handleConfirmEvent(this.adapter, {})
      .pipe(take(1))
      .subscribe();

    // 3. Wait until the host registers the client
    registerEvent(this.adapter)
      .pipe(
        take(1),
        tap(() => {
          // 4. Second confirmation required by the protocol
          handleConfirmEvent(this.adapter, {})
            .pipe(take(1))
            .subscribe();

          // 5. Fully in-sync. Unlock the UI
          this.setConnected.set(true);
          this.accountInfoMsg = "✅ Connected";
        }),
        catchError(err => {
          this.accountInfoMsg = "❌ Error host connection";
          this.accountInfoMsg = err;
          return [];
        })
      )
      .subscribe();

    quoteEvent(this.adapter)
      .pipe(tap(this.logger))
      .subscribe();
    getAccountInformation(this.adapter, {}).pipe(take(1), tap(this.logger)).subscribe();

    // sdkMethod(adapter.current, params)
    //   .pipe(take(1), tap(log), catchError(handleError))
    //   .subscribe();
    // this.initializeConnection();
    // this.loadAccountData();
    // this.subscribeToQuotes();
    // getAccountInformation(this.adapter, {}).pipe(take(1), tap(this.logger)).subscribe();
    // getLightSymbolList(this.adapter, {}).pipe(take(1), tap(this.logger)).subscribe();
    // subscribeQuotes(this.adapter, { symbolId: [1] }).pipe(take(1), tap(this.logger)).subscribe();
    // //this.genInfoMsg = "🔌 Connecting…";

    // handleConfirmEvent(this.adapter, {}).pipe(take(1)).subscribe();

    // registerEvent(this.adapter).pipe(
    //   take(1),
    //   tap(() => {
    //     handleConfirmEvent(this.adapter, {}).pipe(take(1)).subscribe();
    //     this.setConnected(true);
    //     this.genInfoMsg = "✅ Connected";
    //   }),
    //   catchError(() => { this.genInfoMsg = "❌ Error host connection"; return []; })
    // ).subscribe();

  }
  refreshWindow() {
    window.location.reload();
  }
  private initializeConnection() {
    registerEvent(this.adapter).pipe(take(1)).subscribe({
      next: (result: any) => {
        if (result.payloadType === 2104 && result.clientMsgId === 'deeplink-eurusd-info-1') {
          this.logger.info('Respuesta deeplink recibida', result);
          this.errorMsg = result;
        }
      }
    });
    //Manejar evento de confirmación de conexión
    handleConfirmEvent(this.adapter, {}).pipe(take(1)).subscribe((res) => {
      this.errorMsg = 'Conexión confirmada' + res;
    });
    this.logger.info('Conexión establecida con cTrader');
    this.genInfoMsg = 'Conexión establecida con cTrader';

    this.loadAccountData();
  }

  private loadAccountData() {
    getAccountInformation(this.adapter, {}).pipe(take(1)).subscribe({
      next: (response) => {
        if (response.trader) {
          this.accountInfoMsg = `Balance: ${response}`;
        } else {
          this.accountInfoMsg = 'No se encontró información de la cuenta.';
        }
        this.errorMsg = '';
      },
      error: (error) => {
        this.accountInfoMsg = '';
        this.errorMsg = 'Error al obtener información de la cuenta.';
      }
    });
  }

  // Suscribirse a cotizaciones EURUSD
  private subscribeToQuotes() {
    const symbolId = 'EURUSD_ID'; // Usa el ID correcto según tu entorno
    const innerMsgId = 'quote-sub-123';
    const outerMsgId = 'quote-outer-123';
    window.dispatchEvent(new MessageEvent('message-to-host', {
      data: {
        payloadType: 2100,
        payload: {
          payloadType: 601,
          symbolId: [symbolId],
          clientMsgId: innerMsgId
        },
        clientMsgId: outerMsgId
      }
    }));

    window.addEventListener('message-from-host', (event: Event) => {
      const messageEvent = event as MessageEvent;
      // Recibe eventos de cotización
      if (messageEvent.data?.payloadType === 2102 && messageEvent.data?.payload?.payloadType === 3) {
        this.quote = messageEvent.data.payload.payload;
      }
    });
  }

}

