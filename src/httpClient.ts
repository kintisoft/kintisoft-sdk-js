export interface HttpClientOptions {
  tenant: string;              // subdominio: "acme", "demo", etc.
  apiKey: string;              // TENANT_PUBLIC_API_KEY o la que definas
  baseUrlOverride?: string;    // opcional, por si quieres apuntar a otro host
  timeoutMs?: number;          // por defecto 10000
}

export class KintiSoftError extends Error {
  status?: number;
  details?: unknown;

  constructor(message: string, status?: number, details?: unknown) {
    super(message);
    this.name = "KintiSoftError";
    this.status = status;
    this.details = details;
  }
}

export class HttpClient {
  private tenant: string;
  private apiKey: string;
  private baseUrlOverride?: string;
  private timeoutMs: number;

  constructor(options: HttpClientOptions) {
    if (!options.tenant) {
      throw new KintiSoftError("tenant is required");
    }
    if (!options.apiKey) {
      throw new KintiSoftError("apiKey is required");
    }

    this.tenant = options.tenant;
    this.apiKey = options.apiKey;
    this.baseUrlOverride = options.baseUrlOverride;
    this.timeoutMs = options.timeoutMs ?? 10000;
  }

  private getBaseUrl(): string {
    if (this.baseUrlOverride) return this.baseUrlOverride;
    return `https://${this.tenant}.kintisoft.com/api/v1`;
  }

  async request<T>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    path: string,
    body?: unknown
  ): Promise<T> {
    const url = `${this.getBaseUrl()}${path}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "x-api-key": `${this.apiKey}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const text = await res.text();
      let json: any;
      try {
        json = text ? JSON.parse(text) : {};
      } catch {
        json = { raw: text };
      }

      if (!res.ok) {
        throw new KintiSoftError(
          json?.message || `Request failed with status ${res.status}`,
          res.status,
          json
        );
      }

      return json as T;
    } catch (err: any) {
      if (err?.name === "AbortError") {
        throw new KintiSoftError("Request timeout", 408);
      }
      if (err instanceof KintiSoftError) {
        throw err;
      }
      throw new KintiSoftError(err?.message || "Unknown error");
    }
  }
}
