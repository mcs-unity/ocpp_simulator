import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor() {}

  private subject!: Subject<MessageEvent>;

  public connect(url: string): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('connected');
    }
    return this.subject;
  }

  private create(url: string): Subject<MessageEvent> {
    const ws = new WebSocket(url);

    const observable = new Observable((observer: Observer<MessageEvent>) => {
      ws.onmessage = observer.next.bind(observer);
      ws.onerror = observer.error.bind(observer);
      ws.onclose = observer.complete.bind(observer);
      return ws.close.bind(ws);
    });

    let observer: any = {
      next: (data: Object) => {
        if (ws.readyState == WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
    };

    return new AnonymousSubject(observer, observable);
  }
}
