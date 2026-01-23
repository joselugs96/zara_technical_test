export type UpstreamFetchOptions = {
  url: string;
  apiKey: string;
  endpoint: string;
};

export type UpstreamResponse = {
  body: unknown;
  isJson: boolean;
};
