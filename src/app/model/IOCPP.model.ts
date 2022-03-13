import { OCPP } from './enum/ocpp.body.enum';

interface OCPPResponse {
  messageTypeId: OCPP;
  uuid: string;
  payload: any;
}

interface OCPPRequest extends OCPPResponse {
  action: string;
}

interface OCPPError {
  messageTypeId: OCPP;
  uuid: string;
  errorCode: string;
  errorDetails: any;
}

export { OCPPResponse, OCPPRequest, OCPPError };
