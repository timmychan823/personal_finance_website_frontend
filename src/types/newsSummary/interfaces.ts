export interface News {
  newsDescription: string;
  newsLink: string;
  newsPublishTime: string;
  newsSource: string;
  newsTitle: string;
  tickers: string[];
  newsSentiment?: number;
}
