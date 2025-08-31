import { Component } from '@angular/core';
import { createLogger } from '@veksa/logger';
import { createClientAdapter } from '@spotware-web-team/sdk-external-api'

import { take, tap } from 'rxjs';
import {
  handleConfirmEvent,
  registerEvent,
  getAccountInformation,
  getAccountInformationHandler,

} from '@spotware-web-team/sdk';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private adapter: any;
  private logger: any;
  public accountInfoMsg: string = '';
  public errorMsg: string = '';

  constructor() {
    this.logger = createLogger(true);
    this.adapter = createClientAdapter({ logger: this.logger });
    this.accountInfoMsg = "Dupa wolowa";
  }
  ngOnInit() {
    this.initializeConnection();
    //this.loadAccountData();
    const clientMsgId = 'unique-id-1'; // Genera un ID único
    window.dispatchEvent(new MessageEvent('message-to-host', {
      data: {
        payloadType: 2100,
        payload: {
          payloadType: 175, // Código para obtener información de la cuenta
          clientMsgId: clientMsgId
        },
        clientMsgId: clientMsgId
      }
    }));

    // Escucha la respuesta
    window.addEventListener('message-from-host', (event: Event) => {
      const messageEvent = event as MessageEvent;
      if (messageEvent.data?.payloadType === 2101 && messageEvent.data.clientMsgId === clientMsgId) {
        // Aquí tienes los datos de la cuenta
        console.log('Account info:', messageEvent.data.payload);
      }
    });

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
    this.loadAccountData();
    // window.addEventListener('message-to-host', (event: any) => {
    //   this.handleHostMessage(event.detail);
    // });
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

}

