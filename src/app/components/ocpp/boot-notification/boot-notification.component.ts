import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-boot-notification',
  templateUrl: './boot-notification.component.html',
})
export class BootNotificationComponent implements OnInit {
  toolTipDelay = environment.toolTipDelay;
  form: FormGroup;

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

  ngOnInit(): void {}

  submit(): void {
    try {
      if (!this.form.valid) throw Error('Invalid Boot notification form');
    } catch (error: any) {
      alert(error.message);
    }
  }
}
