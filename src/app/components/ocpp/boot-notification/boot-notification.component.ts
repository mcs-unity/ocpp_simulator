import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { createOCPPRequest } from 'src/app/helper/ocpp.helper';
import { OCPPAction } from 'src/app/model/enum/ocpp.actions.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-boot-notification',
  templateUrl: './boot-notification.component.html',
})
export class BootNotificationComponent {
  toolTipDelay = environment.toolTipDelay;
  form: FormGroup;
  @Input() messages!: Subject<any>;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      chargePointVendor: ['', [Validators.maxLength(20), Validators.required]],
      chargePointModel: ['', [Validators.maxLength(20), Validators.required]],
      chargePointSerialNumber: ['', Validators.maxLength(25)],
      chargeBoxSerialNumber: ['', Validators.maxLength(25)],
      firmwareVersion: ['', Validators.maxLength(50)],
      iccid: ['', Validators.maxLength(20)],
      imsi: ['', Validators.maxLength(20)],
      meterType: ['', Validators.maxLength(25)],
      meterSerialNumber: ['', Validators.maxLength(25)],
    });
  }

  submit(): void {
    try {
      if (!this.form.valid) throw Error('Invalid Boot notification form');
      if (this.messages)
        this.messages.next(
          createOCPPRequest(OCPPAction.BootNotification, this.form.value)
        );
    } catch (error: any) {
      alert(error.message);
    }
  }

  clearForm() {
    this.form.reset();
  }
}
