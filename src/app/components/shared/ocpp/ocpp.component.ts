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
  constructor(formBuilder: FormBuilder, private websocket: WebsocketService) {
    super();
    this.form = formBuilder.group({
      url: ['', [Validators.required]],
    });
  }

  disconnect(): void {
    this.websocket.disconnect();
    this.connected = false;
    console.log('asd' + this.connected);
  }

  connect(): void {
    if (this.connected) this.disconnect();
    else {
      try {
        if (!this.form.valid) throw new Error('Invalid form');
        const obs = this.websocket
          .connect(this.form.controls['url'].value)
          .subscribe(
            (value) => {
              console.log(value);
            },
            (error) => {
              console.log(error);
              alert(error);
            }
          );
        this.AddSubscription(obs);
        this.connected = true;
      } catch (error) {
        alert('Error failed to connect to web socket');
      }
    }
  }
}
