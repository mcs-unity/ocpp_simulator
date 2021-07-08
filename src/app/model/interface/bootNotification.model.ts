import { BootNotificationState } from '../enum/ocppState.enum';

interface IBootNotification {
  chargePointVendor: string;
  chargePointModel: string;
  chargePointSerialNumber: string;
  chargeBoxSerialNumber: string;
  firmwareVersion: string;
  iccid: string;
  imsi: string;
  meterType: string;
  meterSerialNumber: string;
}

interface IBootNotificationRes {
  status: BootNotificationState;
  currentTime: string;
  interval: number;
}

export { IBootNotificationRes, IBootNotification };