type IncomeCategory =
  | "Dividend"
  | "Capital Gain"
  | "Interest"
  | "Earned Income"
  | "Insurance Claim";

export interface Income {
  monetaryValue: number;
  currency: string;
  incomeCategory: IncomeCategory;
  datetime: Date;
  description: string;
}

export interface Dividend extends Income {
  stockID: number;
}

export interface CapitalGain extends Income {
  assetID: number;
}

export interface Interest extends Income {
  fixedIncomeID: number;
}

export interface EarnedIncome extends Income {
  companyName: string;
  post: string;
}

export interface InsuranceClaim extends Income {
  expenditureID: number;
}
