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