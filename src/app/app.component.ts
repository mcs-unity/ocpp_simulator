import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SubscriptionDestroyer } from './helper/subscriptionhelper.helper';
import { LoadingService } from './service/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent extends SubscriptionDestroyer {
  version = environment.version;
  isLoading = false;
  isSplash = true;
  date = new Date();

  constructor(loading: LoadingService, private router: Router) {
    super();
    const obs = loading.loading.subscribe(
      (loadingState) => (this.isLoading = loadingState)
    );
    this.AddSubscription(obs);

    const routeObs = router.events.subscribe(this.routerEvent);
    this.AddSubscription(routeObs);
  }

  routerEvent(val: any): void {
    if (val instanceof NavigationEnd) {
      if (this.router.url.includes('splash')) {
        this.isSplash = true;
      } else {
        this.isSplash = false;
      }
    }
  }
}
