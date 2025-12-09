import { HttpClient, HttpClientOptions, KintiSoftError } from "./httpClient";
import {
  ProspectsModule,
  CreateProspectPayload,
  CreateProspectResponse,
} from "./modules/prospects";

export interface KintiSoftClientOptions extends HttpClientOptions {}

export class KintiSoftClient {
  private http: HttpClient;
  public prospects: ProspectsModule;

  constructor(options: KintiSoftClientOptions) {
    this.http = new HttpClient(options);
    this.prospects = new ProspectsModule(this.http);
  }
}

export {
  HttpClientOptions,
  KintiSoftError,
  ProspectsModule,
  CreateProspectPayload,
  CreateProspectResponse,
};
