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

interface IBootNotificationResponse {
  status: Status;
  currentTime: Date;
  interval: number;
}

export { IBootNotification, IBootNotificationResponse };
