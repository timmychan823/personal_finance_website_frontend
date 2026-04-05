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

export interface CompanyResponse {
  listOfCompanies: Company[];
  numberOfCompanies: number;
}

export interface Company {
  ticker: string;
  companyName: string;
  sector: string;
  subIndustry: string;
}