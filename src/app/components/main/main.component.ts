import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SubscriptionDestroyer } from 'src/app/helper/subscriptionhelper.helper';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent extends SubscriptionDestroyer implements OnInit {
  url: string = '';
  fullscreen = false;
  constructor(private router: Router) {
    super();
    const obs = router.events.subscribe((event) => this.routerEvent(event));
    this.AddSubscription(obs);
  }

  ngOnInit(): void {}

  routerEvent(val: any): void {
    if (val instanceof NavigationEnd) {
      this.url = this.router.url;
    }
  }

  fullScreen(): void {
    const body = document.getElementsByTagName('body')[0];
    if (this.fullscreen) document.exitFullscreen();
    else body.requestFullscreen();
    this.fullscreen = !this.fullscreen;
  }
}
