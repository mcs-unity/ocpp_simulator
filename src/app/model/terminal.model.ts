import { OCPPRequest, OCPPError, OCPPResponse } from './IOCPP.model';

export interface ITerminalObject {
  request: OCPPRequest | OCPPError;
  response?: OCPPRequest | OCPPError | OCPPResponse;
}
