import { MessageType } from '../model/enum/messageType.enum';
import { v4 } from 'uuid';

function ocppReq(action: string, payload: any) {
  const message = [MessageType.CALL, v4(), action, payload];
  return message;
}

function ocppRes(action: string, payload: any) {
  const message = [MessageType.CALLRESULT, action, payload];
  return message;
}

function ocppError(action: string, payload: any) {
  const message = [MessageType.CALLERROR, action, payload];
  return message;
}

function ocppConvertReq(payload: any): any {
  return {
    messageTypeId: payload[0],
    uuid: payload[1],
    action: payload[2],
    payload: payload[3],
  };
}

function ocppConvertRes(payload: any): any {
  console.log(payload[0]);

  return { messageTypeId: payload[0], action: payload[1], payload: payload[2] };
}

function ocppConvertError(action: string, payload: any) {
  const message = [MessageType.CALLERROR, action, payload];
  return message;
}

export {
  ocppReq,
  ocppRes,
  ocppError,
  ocppConvertRes,
  ocppConvertReq,
  ocppConvertError,
};
