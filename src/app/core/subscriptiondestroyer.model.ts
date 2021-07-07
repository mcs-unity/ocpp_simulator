import { OnDestroy, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class SubscriptionDestroyer implements OnDestroy {
  private subscription: Subscription = new Subscription();

  public AddSubscription(subscription: Subscription): void {
    if (subscription !== null) {
      this.subscription.add(subscription);
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
