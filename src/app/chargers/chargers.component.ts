import { Component, OnInit } from '@angular/core';
import { SubscriptionDestroyer } from '../core/subscriptiondestroyer.model';
import { ICharger } from '../model/interface/bootNotification.model';
import { AssetsService } from '../service/assets.service';

@Component({
  selector: 'app-chargers',
  templateUrl: './chargers.component.html',
  styleUrls: ['./chargers.component.scss'],
})
export class ChargersComponent extends SubscriptionDestroyer implements OnInit {
  chargers: ICharger[] = [];

  constructor(private assets: AssetsService) {
    super();
  }

  ngOnInit(): void {
    const obs = this.assets.chargers().subscribe((resp) => {
      this.chargers = resp;
    });
    this.AddSubscription(obs);
  }
}
