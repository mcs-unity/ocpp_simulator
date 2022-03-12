import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Connection } from '../model/enum/connection.enum';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private subject!: AnonymousSubject<MessageEvent>;
  private connected = new BehaviorSubject<Connection>(Connection.pending);
  $connected = this.connected.asObservable();

  error(): void {
    this.connected.next(Connection.error);
  }

  disconnect(): void {
    this.subject.complete();
  }

  private create(
    url: string,
    protocol: string
  ): AnonymousSubject<MessageEvent> {
    const ws = new WebSocket(url, protocol);

    let observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });

    let observer = {
      next: (data: Object) => {
        if (ws.readyState == WebSocket.OPEN) ws.send(JSON.stringify(data));
      },
      error: (err: any) => {
        return err;
      },
      complete: () => {
        if (ws.readyState == WebSocket.OPEN) ws.close();
        this.connected.next(Connection.pending);
      },
    };
    const subject = AnonymousSubject.create(observer, observable);
    return subject;
  }

  public connect(
    url: string,
    protocol: string,
    newConnection: boolean = true
  ): Subject<MessageEvent> {
    if (newConnection) {
      this.subject = this.create(url, protocol);
      this.connected.next(Connection.connected);
    }
    return this.subject;
  }
}
