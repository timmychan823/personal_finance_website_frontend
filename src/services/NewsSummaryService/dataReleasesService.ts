import * as NEWS_CONSTANTS from "constants/newsSummary";

export async function getListOfDataReleases() {
    //TODO: input params and the DTO to receive data
    let response;
    let data;

    try {
        response = await fetch(
            `${NEWS_CONSTANTS.LIST_OF_DATA_RELEASES}`,
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
        const currentDate = new Date();
        const day: number = currentDate.getDate() - 1; //TODO: it doesnt handle the start of month and end of month condition eg. June 1's yesterday is not June 0
        const month: number = currentDate.getMonth() + 1;
        const year: number = currentDate.getFullYear();
        let dayString: string = `${day}`
        let monthString: string = `${month}`
        if (month < 10) {
            monthString = '0' + monthString;
        }
        if (day < 10) {
            dayString = '0' + dayString;
        }
        console.info(`${year}-${monthString}-${dayString}`)
        const listOfReleasesYesterday = data[`${year}-${monthString}-${dayString}`] //TODO: it may be null and don't hard code it, get it form params
        console.info(listOfReleasesYesterday)
        return listOfReleasesYesterday;
    } catch (error: unknown) {
        //pass
        console.error("newsSummaryService getListOfNews error"); //TODO: dispatch an error, showing a invalid pop up or something like that
        throw error;
    }
}
