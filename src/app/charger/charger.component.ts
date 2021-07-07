import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChargerSocket } from '../model/chargersocket.model';
import { ConnectionState } from '../model/enum/connectionState.enum';
import { OcppService } from '../service/ocpp.service';

@Component({
  selector: 'app-charger',
  templateUrl: './charger.component.html',
  styleUrls: ['./charger.component.scss'],
})
export class ChargerComponent
  extends ChargerSocket
  implements OnInit, AfterViewInit
{
  constructor(private ocpp: OcppService) {
    super();
  }

  ngOnInit(): void {
    const obs = this.message.subscribe((resp) => {
      this.connectionState = this.ocpp.bootNotificationRes(resp);
    });

    this.AddSubscription(obs);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.connectionState == 'Connected') {
        this.message.next(this.ocpp.bootNotification());
      }
    }, 1000);
  }
}
