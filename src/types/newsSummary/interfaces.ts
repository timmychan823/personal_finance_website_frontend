export interface News {
  newsLink: string;
  newsPublishTime: string;
  newsSource: string;
  newsTitle: string;
  tickers: string[];
  newsSentiment?: number;
}

export interface NewsSummaryResponse {
  listOfNews: News[];
  numberOfNews: number;
}
