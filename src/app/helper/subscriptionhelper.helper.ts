import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionDestroyer implements OnDestroy {
  private subscription: Subscription = new Subscription();
  private interval: any;
  public AddSubscription(subscription: Subscription): void {
    if (subscription !== null) {
      this.subscription.add(subscription);
    }
  }

  public AddInterval(interval: any) {
    this.interval = interval;
  }

  public ngOnDestroy(): void {
    clearInterval(this.interval);
    this.subscription.unsubscribe();
  }
}
