import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ocppConvertReq, ocppConvertRes, ocppReq } from 'src/app/helper/ocpp';
import { ConnectionState } from 'src/app/model/enum/connectionState.enum';
import { ICharger } from 'src/app/model/interface/bootNotification.model';
import { bootNotificationRes } from 'src/app/service/bootNotification.service';
import { bootNotification } from 'src/app/service/ocpp.service';
import { ChargerSocket } from '../../model/chargersocket.model';

@Component({
  selector: 'app-charger',
  templateUrl: './charger.component.html',
  styleUrls: ['./charger.component.scss'],
})
export class ChargerComponent
  extends ChargerSocket
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() charger!: ICharger;
  constructor() {
    super();
    setTimeout(() => {
      this.charger.state = this.connectionState;
    }, 300);
  }

  ocppMessage(payload: any[]) {
    try {
      let data;
      if (payload.length > 3) {
        data = ocppConvertReq(payload);
      } else {
        data = ocppConvertRes(payload);
      }
      switch (data.action) {
        case 'BootNotification':
          bootNotificationRes(this.charger, data);
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {
    this.init(this.charger.chargerName);
    setTimeout(() => {
      this.charger;
      const obs = this.message.subscribe(
        (resp) => {
          this.ocppMessage(resp);
        },
        (err) => {
          console.log('asd');
        }
      );
      this.AddSubscription(obs);
    }, 1000);
  }

  sendBootNotification() {
    if (this.connectionState == ConnectionState.notAuthorized) {
      this.message.next(
        ocppReq('BootNotification', bootNotification(this.charger))
      );
    }
  }

  ngAfterViewInit() {
    const random = Math.floor(Math.random() * 20000) + 5000;
    setTimeout(() => {
      this.sendBootNotification();
    }, random);
  }

  ngOnDestroy(): void {
    clearInterval(this.charger.heartBeatInterval);
  }
}
