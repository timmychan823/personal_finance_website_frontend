export interface News {
    newsDescription: number;
    newsLink: string;
    newsPublishTime: string;
    newsSource: string;
    newsTitle: string;
    tickers: string[];
    newsSentiment?: number;
}