import { HttpClient, HttpClientOptions, KintiSoftError } from "./httpClient.js";
import {
  ProspectsModule,
  CreateProspectPayload,
  CreateProspectResponse,
} from "./modules/prospects.js";

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
