import { Component } from '@angular/core';
import { convertOCPPResponseToObject } from 'src/app/helper/ocpp.helper';
import { SubscriptionDestroyer } from 'src/app/helper/subscriptionhelper.helper';
import { Connection } from 'src/app/model/enum/connection.enum';
import { WebsocketService } from 'src/app/service/websocket.service';
import { environment } from 'src/environments/environment';
import { ITerminalObject } from 'src/app/model/terminal.model';
import { OCPPRequest } from 'src/app/model/IOCPP.model';
@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
})
export class TerminalComponent extends SubscriptionDestroyer {
  toolTipDelay = environment.toolTipDelay;
  state = Connection.pending;
  response: ITerminalObject[] = [];
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

  matchResponseToRequest(data: any): void {
    try {
      const ocppResponse = convertOCPPResponseToObject(JSON.parse(data));
      let obj = this.response.find(
        (data) => data.request.uuid == ocppResponse.uuid
      );

      if (!obj)
        throw Error(
          'Could not find a matching UUID for the central systems response: ' +
            ocppResponse.uuid
        );
      obj.response = ocppResponse;
      this.response = [...this.response];
    } catch (error: any) {
      alert(error.message);
    }
  }

  saveRequestToList(message: any): void {
    if (message) {
      const request = convertOCPPResponseToObject(message);
      const obj: ITerminalObject = {
        request: request as OCPPRequest,
      };
      this.response.push(obj);
      this.response = [...this.response.reverse()];
    }
  }

  subscribe(): void {
    setTimeout(() => {
      const messagesObs = this.websocket.$message.subscribe((message) => {
        this.saveRequestToList(message);
      });
      this.AddSubscription(messagesObs);
      const obs = this.websocket
        .connect('', '', false)
        .subscribe((message: MessageEvent) => {
          this.matchResponseToRequest(message.data);
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
