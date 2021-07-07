import { Component, OnInit } from '@angular/core';
import { ChargerSocket } from '../model/chargersocket.model';

@Component({
  selector: 'app-charger',
  templateUrl: './charger.component.html',
  styleUrls: ['./charger.component.scss'],
})
export class ChargerComponent extends ChargerSocket implements OnInit {
  data: any;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.message.subscribe((resp) => {
      this.data = resp;
    });
  }
}
