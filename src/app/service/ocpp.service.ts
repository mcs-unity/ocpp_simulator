import { Injectable } from '@angular/core';
import { ConnectionState } from '../model/enum/connectionState.enum';
import { BootNotificationState } from '../model/enum/ocppState.enum';
import {
  IBootNotification,
  IBootNotificationRes,
} from '../model/interface/bootNotification.model';

@Injectable({
  providedIn: 'root',
})
export class OcppService {
  constructor() {}

  bootNotification(): IBootNotification {
    return {
      chargePointVendor: 'OMSI Tech',
      chargePointModel: 'B-321',
      chargePointSerialNumber: '1516-4151-42',
      chargeBoxSerialNumber: 'R453854',
      firmwareVersion: '1.0.0',
      iccid: '',
      imsi: '',
      meterType: 'AC',
      meterSerialNumber: 'SR1268RCB',
    };
  }

  bootNotificationRes(response: IBootNotificationRes): ConnectionState {
    if (!('status' in response)) {
      return ConnectionState.error;
    }

    if (response.status == BootNotificationState.Accepted) {
      return ConnectionState.notAuthorized;
    } else {
      return ConnectionState.connected;
    }
  }
}