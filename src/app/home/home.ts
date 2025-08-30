import { Component } from '@angular/core';
import { createLogger } from '@veksa/logger';
import { createClientAdapter } from '@spotware-web-team/sdk-external-api'

import { take, tap } from 'rxjs';
import { handleConfirmEvent, registerEvent } from '@spotware-web-team/sdk';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  constructor() {
    let logger   = createLogger(location.href.includes("showLogs"));
    logger.info('Application started');
    logger.warn('Resource is running low');
    logger.error('Failed to connect', { code: 500 });
        const adapter = createClientAdapter({logger});
        handleConfirmEvent(adapter,{}).pipe(take(1)).subscribe();  
        
        registerEvent(adapter).pipe(
          take(1),
          tap(()=>{
            handleConfirmEvent(adapter, {}).pipe(take(1)).subscribe();
             console.log("✅ Connected");
          }),
          
        ).subscribe();
      [];
  }


}
