import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WebsocketService } from './websocket.service';
import { map } from 'rxjs/operators';

export interface Message {
  author: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public message!: Subject<Message>;

  constructor(websocket: WebsocketService) {
    this.message = <Subject<Message>>(
      websocket.connect(environment.CHAT_URL).pipe(
        map((response: MessageEvent): Message => {
          let data = JSON.parse(response.data);
          return {
            author: data.author,
            message: data.message,
          };
        })
      )
    );

    this.message = <Subject<Message>>(
      websocket.connect(environment.CHAT_URL).pipe(
        map((resp: MessageEvent): Message => {
          let data = JSON.parse(resp.data);
          return data;
        })
      )
    );
  }
}
