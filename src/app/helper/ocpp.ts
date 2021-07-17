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

export { ocppReq, ocppRes, ocppError };
