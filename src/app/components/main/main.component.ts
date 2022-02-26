import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionDestroyer } from 'src/app/helper/subscriptionhelper.helper';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent extends SubscriptionDestroyer implements OnInit {
  url: string = '';
  constructor(routerEvent: Router) {
    super();
    this.url = routerEvent.url;
  }

  ngOnInit(): void {}
}
