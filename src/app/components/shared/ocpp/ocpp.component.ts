import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriptionDestroyer } from 'src/app/helper/subscriptionhelper.helper';
import { WebsocketService } from 'src/app/service/websocket.service';
import { environment } from 'src/environments/environment';

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
  constructor(formBuilder: FormBuilder, private websocket: WebsocketService) {
    super();
    this.url = localStorage.getItem(this.key) || '';
    this.form = formBuilder.group({
      url: [this.url, [Validators.required]],
      remember: [],
    });
  }

  private disconnect(): void {
    this.websocket.disconnect();
    this.connected = false;
  }

  private rememberDomain(): void {
    const remember = this.form.controls['remember'].value;
    if (remember) {
      this.url = this.form.controls['url'].value;
      localStorage.setItem(this.key, this.url);
    }
  }

  private connect(): void {
    try {
      if (!this.form.valid) throw Error('Invalid websocket URL');
      this.rememberDomain();
      this.connected = true;
    } catch (error: any) {
      alert(error.message);
    }
  }

  removeUrlFromLocalStorage(): void {
    localStorage.removeItem(this.key);
    this.url = '';
  }

  submit(): void {
    if (this.connected) this.disconnect();
    else this.connect();
  }
}
