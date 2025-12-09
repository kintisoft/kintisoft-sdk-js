import { HttpClient } from "../httpClient";

export interface CreateProspectPayload {
  contact_name: string;
  email?: string;
  phone?: string;
  accept_ads?: boolean;
  dni?: string;
  comment?: string;
  [key: string]: unknown;
}

export interface CreateProspectResponse {
  message: string;
  [key: string]: unknown;
}

export class ProspectsModule {
  private http: HttpClient;

  constructor(httpClient: HttpClient) {
    this.http = httpClient;
  }

  async create(
    payload: CreateProspectPayload
  ): Promise<CreateProspectResponse> {
    return this.http.request<CreateProspectResponse>(
      "POST",
      "/persons/prospects/",
      payload
    );
  }
}
