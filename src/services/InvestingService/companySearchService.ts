import { Company, CompanyResponse } from "types/newsSummary/interfaces";
import * as NEWS_CONSTANTS from "constants/newsSummary";
import {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
    HttpStatusCode,
    RawAxiosRequestHeaders,
} from 'axios'
import { axiosInstance as axiosInstance } from 'providers/axiosInstance'

export async function getSectorsAndSubIndustries(): Promise<{ sector: string, subIndustries: string[] }[]> {
    // expected return format:
    // [
    //  {‘sector’: ‘Utilities’, ‘subIndustries’: [‘Gas Utilities’, ‘Water  Utilities’]}, 
    //  {‘sector’: ‘Information Technology’, ‘subIndustries’: [‘Internet Services & Infrastructure’, ‘Electronic Components’]}
    // ]

    let response;
    try {
        const response = await axiosInstance.get(NEWS_CONSTANTS.LIST_OF_SECTORS_AND_SUBINDUSTRIES_URL);
        const data = response.data;
        console.log(data['subIndustriesBySector']);
        return data['subIndustriesBySector'];

    } catch (error: unknown) {
        console.error("investingService getSectorsAndSubIndustries error", error); //TODO: dispatch an error, showing a invalid pop up or something like that
        throw error;
    }
}

export async function getListOfCompaniesBasedOnQueryAndFilter(
    filter: any,
    searchQuery: string,
    pageNumber: number
): Promise<any> {
    let response;
    let data;

    const params = new URLSearchParams();
    for (const country in filter.countryFilter) {
        params.append("countryFilter", country);
    }
    for (const sector in filter.sectorFilter) {
        params.append("sectorFilter", sector);
    }
    params.append("searchQuery", searchQuery);
    params.append("pageNumber", pageNumber.toString());
    try {
        // response = await fetch(
        //     `${NEWS_CONSTANTS.LIST_OF_NEWS_URL}?${params.toString()}`, //TODO: get the URL from INVESTING_CONSTANTS later
        //     {
        //         method: "GET",
        //     },
        // );
        // if (!response.ok) {
        //     // response.ok is true for 2xx status codes
        //     const errorBody = await response.json(); // Or response.text() depending on content type
        //     console.debug(errorBody)
        //     throw new Error(
        //         `HTTP Error: ${response.status} - ${response.statusText || "Unknown error"}`,
        //     );

        // }
        // data = await response.json();

        // await axiosInstance.get(NEWS_CONSTANTS.LIST_OF_DATA_RELEASES)
        //     .then(response => {
        //         data = response.data;
        //     }).catch(error => {
        //         throw new Error(
        //             `HTTP Error: ${response.status} - ${response.statusText || "Unknown error"}`,
        //         );
        //     })

        //TODO: remove this later after the implemenation on backend, just for testing purpose
        if (pageNumber == 1) {
            data =
            {
                companyList: [
                    { ticker: 'MSFT', companyName: "Microsoft", description: "Microsoft description" }, { ticker: 'TSLA', companyName: "Tesla", description: "Tesla description" }

                ],
                totalPages: 2,
                pageNumber: 1
            };
        } else {
            data =
            {
                companyList: [
                    { ticker: 'AAPL', companyName: "Apple", description: "Apple description" }, { ticker: 'LMT', companyName: "Lockheed Martin", description: "Lockheed Martin description" }

                ],
                totalPages: 2,
                pageNumber: 2
            };
        }

        return data;
    } catch (error: any) {
        //pass
        console.error("investingService getListOfCompaniesBasedOnQueryAndFilter error");
        throw error;
    }
}

export async function getListOfCompanies(
    sectors: string[],
    subIndustries: string[],
    limit: number = 10,
    pageNumber: number = 1,
): Promise<CompanyResponse> {
    let response;
    let data;

    const params = new URLSearchParams();

    sectors?.forEach((sector) => {
        params.append("sectors", sector); // Convert to string as URLSearchParams works with strings
    });

    subIndustries?.forEach((subIndustry) => {
        params.append("subIndustries", subIndustry); // Convert to string as URLSearchParams works with strings
    });

    params.append("limit", limit.toString());
    params.append("pageNumber", pageNumber.toString());
    try {
        response = await fetch(
            `${NEWS_CONSTANTS.LIST_OF_COMPANIES_URL}?${params.toString()}`,
            {
                method: "GET",
            },
        );
        if (!response.ok) {
            // response.ok is true for 2xx status codes
            const errorBody = await response.json(); // Or response.text() depending on content type
            console.debug(errorBody)
            throw new Error(
                `HTTP Error: ${response.status} - ${response.statusText || "Unknown error"}`,
            );

        }
        data = await response.json();
        let listOfCompaniesFromResponse: Company[] = data['listOfCompanies'];
        let numberOfCompaniesFromResponse: number = data['numberOfCompanies'];
        let companyResponse: CompanyResponse = {
            listOfCompanies: listOfCompaniesFromResponse,
            numberOfCompanies: numberOfCompaniesFromResponse
        }
        return companyResponse;
    } catch (error: unknown) {
        //pass
        console.error("newsSummaryService getListOfCompanies error"); //TODO: dispatch an error, showing a invalid pop up or something like that
        throw error;
    }
}