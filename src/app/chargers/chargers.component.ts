import { state } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SubscriptionDestroyer } from '../core/subscriptiondestroyer.model';
import { ConnectionState } from '../model/enum/connectionState.enum';
import { ICharger } from '../model/interface/bootNotification.model';
import { AssetsService } from '../service/assets.service';

@Component({
  selector: 'app-chargers',
  templateUrl: './chargers.component.html',
  styleUrls: ['./chargers.component.scss'],
})
export class ChargersComponent extends SubscriptionDestroyer implements OnInit {
  chargers: ICharger[] = [];
  filteredList: ICharger[] = [];
  states: any[] = [];
  @ViewChild(MatPaginator) Paginator!: MatPaginator;

  constructor(private assets: AssetsService) {
    super();
    this.getStates();
  }

  filterStateEvent(event: any) {
    this.filteredList = this.chargers.filter((val) => val.state == event.value);
  }

  getStates(): void {
    for (const [key, value] of Object.entries(ConnectionState)) {
      this.states.push({ key: key, value: value });
    }
  }

  setPaginatorValues(): void {
    setTimeout(() => {
      this.Paginator.pageSize = 18;
      this.Paginator.pageSizeOptions = [18, 36];
      this.Paginator.length = this.filteredList.length;
    }, 300);
  }

  ngOnInit(): void {
    const obs = this.assets.chargers().subscribe((resp) => {
      this.chargers = resp;
      this.filteredList = resp;
    });
    this.AddSubscription(obs);
    this.setPaginatorValues();
  }
}
