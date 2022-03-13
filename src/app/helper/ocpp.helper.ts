import { v4 } from 'uuid';
import { OCPP } from '../model/enum/ocpp.body.enum';
import { OCPPError, OCPPRequest, OCPPResponse } from '../model/IOCPP.model';

function createMainBody(body: any[], call: OCPP): void {
  body.push(call);
  body.push(v4());
}

function createOCPPRequest(action: string, payload: any): any[] {
  let body: any[] = [];
  createMainBody(body, OCPP.CALL);
  body.push(action);
  body.push(payload);
  return body;
}

function convertOCPPResponseToObject(
  data: any
): OCPPResponse | OCPPRequest | OCPPError {
  if (!(data instanceof Array) || data.length < 3)
    throw new Error('Invalid OCPP body');
  switch (data[0]) {
    case OCPP.CALL:
      return {
        messageTypeId: data[0],
        uuid: data[1],
        action: data[2],
        payload: data[3],
      } as OCPPRequest;
    case OCPP.CALLRESULT:
      return {
        messageTypeId: data[0],
        uuid: data[1],
        payload: data[2],
      } as OCPPResponse;
    case OCPP.CALLRESULT:
      return {
        messageTypeId: data[0],
        uuid: data[1],
        errorCode: data[2],
        errorDetails: data[3],
      } as OCPPError;
    default:
      throw Error('Unknown message type ID' + data[0]);
  }
}

function createOCPPError(payload: any, errorCode: OCPPError): any[] {
  let body: any[] = [];
  createMainBody(body, OCPP.CALLERROR);
  body.push(errorCode);
  body.push(payload);
  return body;
}

export { createOCPPRequest, convertOCPPResponseToObject, createOCPPError };
