import { News } from "types/newsSummary/interfaces";
import { timeRange, timeSeriesDatum } from "types/investingPrediction/interfaces";

export async function getStockPriceData(
    ticker: string,
    timeRange: timeRange,
    type: "predicted" | "actual",
): Promise<timeSeriesDatum[]> {
    let response;
    let data: timeSeriesDatum[] = [];
    let listOfStockPriceData: timeSeriesDatum[] = [];

    const params = new URLSearchParams();
    params.append("ticker", ticker);
    params.append("timeRange", timeRange);
    params.append("type", type);
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
        if (type == "actual") {
            data =
                [
                    { date: '2025-01-01', value: 2 }, { date: '2025-01-02', value: 4 }, { date: '2025-01-03', value: 8 }

                ];
        }
        else if (type == "predicted") {
            data = [{ date: '2025-01-04', value: 5 }, { date: '2025-01-05', value: 4 }];
        }

        listOfStockPriceData = [...listOfStockPriceData, ...data];
        return listOfStockPriceData;
    } catch (error: unknown) {
        //pass
        console.error("investingService getStockPriceData error");
        throw error;
    }
}