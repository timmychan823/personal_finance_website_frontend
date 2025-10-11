export type timeRange =
  | "daily"
  | "weekly"
  | "monthly"

export interface timeSeriesDatum {
  date: string;
  value: number;
}