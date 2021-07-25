import { ConnectionState } from '../enum/connectionState.enum';
import { BootNotificationState } from '../enum/ocppState.enum';

interface ICharger extends IBootNotification {
  chargerName: string;
  state: ConnectionState;
  heartBeatInterval: any;
}

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

export { IBootNotificationRes, IBootNotification, ICharger };
