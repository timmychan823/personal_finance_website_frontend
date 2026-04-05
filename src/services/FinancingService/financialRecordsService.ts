import * as FINANCING_CONSTANTS from "constants/financing";
import { axiosInstance } from "providers/axiosInstance";

export interface FinancialRecord {
    id?: string;
    title: string;
    date: string;
    recordType: "Income" | "Expenditure";
    subType: string;
    amount: number;
    description: string;
    createdAt?: string;
}

export interface FinancialRecordFilter {
    recordType?: "Income" | "Expenditure";
    subType?: string;
    minAmount?: number;
    maxAmount?: number;
    minDate?: string;
    maxDate?: string;
    title?: string;
}

export interface PaginatedFinancialRecords {
    records: FinancialRecord[];
    totalCount: number;
    pageNumber: number;
    limit: number;
}

export interface SumRecord {
    type: "Income" | "Expenditure";
    subType: string;
    value: number;
}

export interface SumResponse {
    sum: SumRecord[];
}

export async function getFinancialRecords(
    filter?: FinancialRecordFilter,
    limit: number = 10,
    pageNumber: number = 1
): Promise<PaginatedFinancialRecords> {
    console.log("FinancialRecordsService: getFinancialRecords called with filter:", filter, "limit:", limit, "pageNumber:", pageNumber);
    try {
        console.log("FinancialRecordsService: About to make axios request");
        const response = await axiosInstance.post(FINANCING_CONSTANTS.PATHS.FINANCIAL_RECORDS_URL, {
            filter,
            limit,
            pageNumber,
        }, {
            timeout: 10000, // 10 second timeout
        }); //TODO: check why this is not working (not waiting for response?), neither try or catch block is run
        console.log("FinancialRecordsService: Axios request completed");
        console.log("FinancialRecordsService: getFinancialRecords success, response:", response.data.data);
        console.log("FinancialRecordsService: Records in response:", response.data.data.records);
        if (response.data.data.records && response.data.data.records.length > 0) {
            response.data.data.records.forEach((record, index) => {
                console.log(`FinancialRecordsService: Record ${index}:`, record, "date:", record.date, "type:", typeof record.date);
            });
        }
        return response.data.data;
    } catch (error) {
        console.error("FinancialRecordsService: getFinancialRecords error:", error);
        throw error;
    }
}

export async function createFinancialRecord(record: Omit<FinancialRecord, 'id' | 'createdAt'>): Promise<FinancialRecord> {
    console.log("FinancialRecordsService: createFinancialRecord called with record:", record);
    try {
        const response = await axiosInstance.post(FINANCING_CONSTANTS.PATHS.FINANCIAL_RECORD_URL, record);
        console.log("FinancialRecordsService: createFinancialRecord success, response:", response.data.data);
        return response.data.data;
    } catch (error) {
        console.error("FinancialRecordsService: createFinancialRecord error:", error);
        throw error;
    }
}

export async function updateFinancialRecord(createdAt: string, updates: Partial<FinancialRecord>): Promise<FinancialRecord> {
    console.log("FinancialRecordsService: updateFinancialRecord called with createdAt:", createdAt, "updates:", updates);
    try {
        const response = await axiosInstance.put(FINANCING_CONSTANTS.PATHS.FINANCIAL_RECORD_URL, {
            createdAt,
            updates,
        });
        console.log("FinancialRecordsService: updateFinancialRecord success, response:", response.data);
        return response.data;
    } catch (error) {
        console.error("FinancialRecordsService: updateFinancialRecord error:", error);
        throw error;
    }
}

export async function deleteFinancialRecord(createdAt: string): Promise<void> {
    console.log("FinancialRecordsService: deleteFinancialRecord called with createdAt:", createdAt);
    try {
        await axiosInstance.delete(FINANCING_CONSTANTS.PATHS.FINANCIAL_RECORD_URL, {
            data: { createdAt },
        });
        console.log("FinancialRecordsService: deleteFinancialRecord success");
    } catch (error) {
        console.error("FinancialRecordsService: deleteFinancialRecord error:", error);
        throw error;
    }
}

export async function getFinancialRecordsSum(minDate: string, maxDate: string): Promise<SumResponse> {
    try {
        const response = await axiosInstance.get(FINANCING_CONSTANTS.PATHS.SUM_URL, {
            params: { minDate, maxDate },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching financial records sum:", error);
        throw error;
    }
}