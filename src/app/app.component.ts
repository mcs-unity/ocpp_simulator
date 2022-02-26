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

  constructor(loading: LoadingService, router: Router) {
    super();
    const obs = loading.loading.subscribe(
      (loadingState) => (this.isLoading = loadingState)
    );
    this.AddSubscription(obs);

    const routeObs = router.events.subscribe((val) => {
      console.log(router.url);

      if (val instanceof NavigationEnd) {
        if (router.url.includes('splash')) {
          this.isSplash = true;
        } else {
          this.isSplash = false;
        }
      }
    });
    this.AddSubscription(routeObs);
  }
}
