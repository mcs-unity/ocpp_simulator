import { Component } from '@angular/core';
import { SubscriptionDestroyer } from './helper/subscriptionhelper.helper';
import { LoadingService } from './service/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent extends SubscriptionDestroyer {
  isLoading = false;
  date = new Date();

  constructor(loading: LoadingService) {
    super();
    const obs = loading.loading.subscribe(
      (loadingState) => (this.isLoading = loadingState)
    );
    this.AddSubscription(obs);
  }
}
