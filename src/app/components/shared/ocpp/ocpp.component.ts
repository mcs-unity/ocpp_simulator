import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Subject } from 'rxjs';
import { SubscriptionDestroyer } from 'src/app/helper/subscriptionhelper.helper';
import { Connection } from 'src/app/model/enum/connection.enum';
import { WebsocketService } from 'src/app/service/websocket.service';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-ocpp',
  templateUrl: './ocpp.component.html',
  styleUrls: ['./ocpp.component.scss'],
})
export class OcppComponent extends SubscriptionDestroyer {
  toolTipDelay = environment.toolTipDelay;
  form!: FormGroup;
  connected = false;
  url = '';
  private readonly key = 'url';
  messages!: Subject<string>;

  constructor(formBuilder: FormBuilder, private websocket: WebsocketService) {
    super();
    this.url = localStorage.getItem(this.key) || '';
    this.form = formBuilder.group({
      url: [this.url, [Validators.required]],
      remember: [this.url.length > 0],
    });

    const obs = websocket.$connected.subscribe(
      (state: Connection) => (this.connected = state === Connection.connected)
    );
    this.AddSubscription(obs);
  }

  private removeUrlFromLocalStorage(): void {
    localStorage.removeItem(this.key);
    this.url = '';
    this.form.reset();
  }

  private rememberDomain(): void {
    this.url = this.form.controls[this.key].value;
    localStorage.setItem(this.key, this.url);
  }

  private urlIsValid(): void {
    if (this.form.controls[this.key].value?.length == 0) {
      setTimeout(() => {
        this.form.controls['remember'].setValue(false);
      }, 100);
      throw Error('Url is required');
    }
  }

  remember(event: MatSlideToggle): void {
    try {
      this.urlIsValid();
      if (!event.checked) this.rememberDomain();
      else this.removeUrlFromLocalStorage();
    } catch (error: unknown) {
      if (error instanceof Error) alert(error.message);
    }
  }

  private disconnect(): void {
    this.websocket.disconnect();
    this.connected = false;
  }

  private async connect(): Promise<void> {
    try {
      if (!this.form.valid) throw Error('Invalid websocket URL');
      this.messages = <Subject<string>>(
        this.websocket.connect(this.url, 'ocpp1.6').pipe(
          map(
            (response: MessageEvent): any => {
              return response;
            },
            catchError((error) => {
              console.error(error);
              return this.connect();
            })
          )
        )
      );
    } catch (error: any) {
      setTimeout(() => {
        alert('Failed to connect to central');
      }, 100);
      this.websocket.error();
    }
  }

  submit(): void {
    if (this.connected) this.disconnect();
    else this.connect();
  }
}
