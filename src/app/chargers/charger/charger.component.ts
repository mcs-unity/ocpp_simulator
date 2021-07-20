import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ocppReq } from 'src/app/helper/ocpp';
import { ConnectionState } from 'src/app/model/enum/connectionState.enum';
import { ICharger } from 'src/app/model/interface/bootNotification.model';
import { bootNotification } from 'src/app/service/ocpp.service';
import { ChargerSocket } from '../../model/chargersocket.model';

@Component({
  selector: 'app-charger',
  templateUrl: './charger.component.html',
  styleUrls: ['./charger.component.scss'],
})
export class ChargerComponent
  extends ChargerSocket
  implements OnInit, AfterViewInit
{
  @Input() charger!: ICharger;
  constructor() {
    super();
  }

  sendBootNotification() {
    if (this.connectionState == ConnectionState.notAuthorized) {
      this.message.next(
        ocppReq('BootNotification', bootNotification(this.charger))
      );
    }
  }

  ngOnInit(): void {
    this.init(this.charger.ChargerName);
    setTimeout(() => {
      this.charger;
      const obs = this.message.subscribe((resp) => {
        console.log(resp);
      });
      this.AddSubscription(obs);
    }, 1000);
  }

  ngAfterViewInit() {
    const random = Math.floor(Math.random() * 20000) + 5000;
    setTimeout(() => {
      this.sendBootNotification();
    }, random);
  }
}
