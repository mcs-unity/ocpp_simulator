import { Component } from '@angular/core';
import { SubscriptionDestroyer } from 'src/app/helper/subscriptionhelper.helper';
import { Connection } from 'src/app/model/enum/connection.enum';
import { WebsocketService } from 'src/app/service/websocket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
})
export class TerminalComponent extends SubscriptionDestroyer {
  toolTipDelay = environment.toolTipDelay;
  state = Connection.pending;
  response: any[] = [];
  show = true;

  constructor(private websocket: WebsocketService) {
    super();
    const obs = websocket.$connected.subscribe((state: Connection) => {
      this.state = state;
      if (state == Connection.connected) {
        this.subscribe();
      }
    });
    this.AddSubscription(obs);
  }

  subscribe(): void {
    setTimeout(() => {
      const obs = this.websocket
        .connect('', '', false)
        .subscribe((message: MessageEvent) => {
          const temp = [...this.response];
          temp.push(message.data);
          this.response = temp;
        });
      this.AddSubscription(obs);
    }, 100);
  }

  clear(): void {
    this.response = [];
  }

  export(): void {}
}
