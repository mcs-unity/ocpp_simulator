import { ConnectionState } from '../model/enum/connectionState.enum';
import { BootNotificationState } from '../model/enum/ocppState.enum';
import {
  IBootNotification,
  IBootNotificationRes,
  ICharger,
} from '../model/interface/bootNotification.model';

function bootNotification(charger: ICharger): IBootNotification {
  return {
    chargePointVendor: charger.chargePointVendor,
    chargePointModel: charger.chargePointModel,
    chargePointSerialNumber: charger.chargePointSerialNumber,
    chargeBoxSerialNumber: charger.chargeBoxSerialNumber,
    firmwareVersion: charger.firmwareVersion,
    iccid: charger.iccid,
    imsi: charger.imsi,
    meterType: charger.meterType,
    meterSerialNumber: charger.meterSerialNumber,
  };
}

function bootNotificationRes(response: IBootNotificationRes): ConnectionState {
  if (!('status' in response)) {
    return ConnectionState.error;
  }

  if (response.status == BootNotificationState.Accepted) {
    return ConnectionState.notAuthorized;
  } else {
    return ConnectionState.connected;
  }
}

export { bootNotification, bootNotificationRes };
