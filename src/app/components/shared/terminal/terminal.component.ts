import { Component } from '@angular/core';
import { convertOCPPResponseToObject } from 'src/app/helper/ocpp.helper';
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
  key = 'log';
  constructor(private websocket: WebsocketService) {
    super();
    const obs = websocket.$connected.subscribe((state: Connection) => {
      this.state = state;
      if (state == Connection.connected) {
        this.subscribe();
      }
    });
    this.AddSubscription(obs);
    this.getLog();
  }

  getLog(): void {
    const log = localStorage.getItem(this.key);
    if (log) this.response = JSON.parse(log);
  }

  saveLog(): void {
    localStorage.setItem(this.key, JSON.stringify(this.response));
  }

  subscribe(): void {
    setTimeout(() => {
      const obs = this.websocket
        .connect('', '', false)
        .subscribe((message: MessageEvent) => {
          const temp = [...this.response];
          const ocppObject = convertOCPPResponseToObject(
            JSON.parse(message.data)
          );
          temp.push(ocppObject);
          this.response = temp.reverse();
          this.saveLog();
        });
      this.AddSubscription(obs);
    }, 100);
  }

  clear(): void {
    this.response = [];
    localStorage.removeItem(this.key);
  }

  export(): void {}
}
