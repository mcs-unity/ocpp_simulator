import { ConnectionState } from '../model/enum/connectionState.enum';
import { BootNotificationState } from '../model/enum/ocppState.enum';
import { ICharger } from '../model/interface/bootNotification.model';

function heartBeat(charger: ICharger, interval: number) {
  console.log(interval);

  charger.heartBeatInterval = setInterval(() => {
    console.log('sample heart beat');
  }, interval);
}

export function bootNotificationRes(charger: ICharger, resp: any) {
  if (resp.payload.status == BootNotificationState.Accepted) {
    charger.state = ConnectionState.connected;
    console.log(resp);

    heartBeat(charger, resp.payload.interval);
  } else {
    charger.state = ConnectionState.notAuthorized;
  }
}
