import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  ws!: WebSocket;

  public disconnect(): void {}

  public connect(url: string, protocol: string) {
    this.ws = new WebSocket(url, protocol);
  }
}
