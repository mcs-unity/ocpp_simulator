import { Component, Input, OnInit } from '@angular/core';
import { ConnectionState } from 'src/app/model/enum/connectionState.enum';
import { ICharger } from 'src/app/model/interface/bootNotification.model';
import { bootNotification } from 'src/app/service/ocpp.service';
import { ChargerSocket } from '../../model/chargersocket.model';

@Component({
  selector: 'app-charger',
  templateUrl: './charger.component.html',
  styleUrls: ['./charger.component.scss'],
})
export class ChargerComponent extends ChargerSocket implements OnInit {
  @Input() charger!: ICharger;
  constructor() {
    super();
    setTimeout(() => {
      if (this.connectionState == ConnectionState.notAuthorized) {
        this.message.next(bootNotification(this.charger));
      }
    }, Math.floor(Math.random() * 20000) + 5000);
  }

  ngOnInit(): void {
    const obs = this.message.subscribe((resp) => {
      console.log(resp);
    });

    this.AddSubscription(obs);
  }
}
