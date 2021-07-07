import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OcppService {
  constructor() {}

  bootNotification(): string {
    return JSON.stringify({
      chargePointVendor: 'OMSI Tech',
      chargePointModel: 'B-321',
      chargePointSerialNumber: '1516-4151-42',
      chargeBoxSerialNumber: 'R453854',
      firmwareVersion: '1.0.0',
      iccid: '',
      imsi: '',
      meterType: 'AC',
      meterSerialNumber: 'SR1268RCB',
    });
  }
}
