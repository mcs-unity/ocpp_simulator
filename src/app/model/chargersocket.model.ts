import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SubscriptionDestroyer } from '../core/subscriptiondestroyer.model';
import { WebsocketService } from './websocket.model';

export class ChargerSocket extends SubscriptionDestroyer {
  message: Subject<any>;
  connected = false;
  private websocket = new WebsocketService();

  constructor() {
    super();
    this.connectionState();
    this.message = <Subject<any>>(
      this.websocket.connect(environment.CHAT_URL).pipe(
        map((response: MessageEvent): any => {
          let data = JSON.parse(response.data);
          return data;
        })
      )
    );
  }

  connectionState() {
    const obs = this.websocket.connected$.subscribe((resp) => {
      this.connected = resp;
    });
    this.AddSubscription(obs);
  }
}
