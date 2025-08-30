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

  constructor() {
    this.logger = createLogger(true);
    this.adapter = createClientAdapter({ logger: this.logger });
  }
  ngOnInit() {
    //this.initializeConnection();
    this.loadAccountData();

  }

  private initializeConnection() {
    // registerEvent(this.adapter).pipe(take(1)).subscribe({
    //   next: (result: any) => {
    //     if (result.payloadType === 2104 && result.clientMsgId === 'deeplink-eurusd-info-1') {
    //       this.logger.info('Respuesta deeplink recibida', result);
    //       // Aquí puedes manejar la respuesta si necesitas mostrar algo al usuario
    //     }
    //   }
    // });
    // Manejar evento de confirmación de conexión
    // handleConfirmEvent(this.adapter, {}).pipe(take(1)).subscribe();
    // this.logger.info('Conexión establecida con cTrader');
    // this.loadAccountData();
    // window.addEventListener('message-to-host', (event: any) => {
    //   this.handleHostMessage(event.detail);
    // });
  }

  private loadAccountData() {
    window.addEventListener('message-to-host', function (event) {
      console.log(event);
    })

    // Obtener lista de cuentas
    getAccountInformation(this.adapter, {}).pipe(take(1), tap(this.logger)).subscribe((kop) => {
      this.logger.info('Datos de cuenta recibidos:', kop);
    });

  }

}

