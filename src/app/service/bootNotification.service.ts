import { ConnectionState } from '../model/enum/connectionState.enum';
import { BootNotificationState } from '../model/enum/ocppState.enum';
import { ICharger } from '../model/interface/bootNotification.model';

export function bootNotificationRes(charger: ICharger, resp: any) {
  if (resp.payload.status == BootNotificationState.Accepted) {
    charger.state = ConnectionState.connected;
  } else {
    charger.state = ConnectionState.notAuthorized;
  }
}
