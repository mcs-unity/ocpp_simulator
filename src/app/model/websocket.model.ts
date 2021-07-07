import { Observable, Observer, Subject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { ConnectionState } from './enum/connectionState.enum';

export class WebsocketService {
  private connected = new Subject<ConnectionState>();
  connected$ = this.connected.asObservable();

  private subject!: Subject<MessageEvent>;
  constructor() {}

  public connect(url: string): Subject<MessageEvent> {
    try {
      if (!this.subject) {
        this.subject = this.create(url);
        this.connected.next(ConnectionState.connected);
      }
      return this.subject;
    } catch (error) {
      throw Error('failed to open socket');
    }
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
