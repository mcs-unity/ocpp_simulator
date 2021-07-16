import { Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SubscriptionDestroyer } from '../core/subscriptiondestroyer.model';
import { ConnectionState } from './enum/connectionState.enum';
import { WebsocketService } from './websocket.model';

export class ChargerSocket extends SubscriptionDestroyer {
  message!: Subject<any>;
  connectionState = ConnectionState.disconnected;
  private websocket = new WebsocketService();

  constructor() {
    super();
    this.state();
    this.init();
  }

  init() {
    this.message = <Subject<any>>(
      this.websocket.connect(environment.SOCKET_URL).pipe(
        map((response: MessageEvent): any => {
          let data = JSON.parse(response.data);
          return data;
        }),
        catchError((err) => {
          this.connectionState = ConnectionState.error;
          return err;
        })
      )
    );
  }

  state() {
    const obs = this.websocket.connected$.subscribe((resp) => {
      this.connectionState = resp;
    });
    this.AddSubscription(obs);
  }
}
