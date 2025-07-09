import * as IncomeInterface from "types/income/interfaces"

export async function saveIncome(income: IncomeInterface.Income) { //TODO: should return a saveIncomeResponse???
    let specificIncome;

    switch (income.incomeCategory) {
        case "Dividend":
            specificIncome = income as IncomeInterface.Dividend;
            break;
        case "Capital Gain":
            specificIncome = income as IncomeInterface.CapitalGain;
            break;
        case "Interest":
            specificIncome = income as IncomeInterface.Interest;
            break;
        case "Earned Income":
            specificIncome = income as IncomeInterface.EarnedIncome;
            break;
        case "Insurance Claim":
            specificIncome = income as IncomeInterface.InsuranceClaim;
            break;
    }

    //TODO: fetchAPI, /income endpoint
}