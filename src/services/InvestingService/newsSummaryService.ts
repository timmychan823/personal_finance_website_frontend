import * as NEWS_CONSTANTS from "constants/newsSummary";
import { News } from "types/newsSummary/interfaces";

export async function getListOfNews(
  listOfTickers: string[],
  limit: number = 10, //TODO: add page number and remove limit, only add pageSize on server side
): Promise<News[]> {
  let response;
  let data;
  let listOfNews: News[] = [];

  const params = new URLSearchParams();

  listOfTickers?.forEach((ticker) => {
    params.append("tickers", ticker); // Convert to string as URLSearchParams works with strings
  });

  params.append("limit", limit.toString());
  try {
    response = await fetch(
      `${NEWS_CONSTANTS.LIST_OF_NEWS_URL}?${params.toString()}`,
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
    listOfNews = [...listOfNews, ...data];
    return listOfNews;
  } catch (error: unknown) {
    //pass
    console.error("newsSummaryService getListOfNews error"); //TODO: dispatch an error, showing a invalid pop up or something like that
    throw error;
  }
}

export async function getListOfUniqueCompanies(): Promise<string[]> {
  let response;
  let data;
  let listOfUniqueCompanies: string[] = [];

  try {
    response = await fetch(NEWS_CONSTANTS.LIST_OF_UNIQUE_COMPANIES_URL, {
      method: "GET",
    });
    if (!response.ok) {
      // response.ok is true for 2xx status codes
      const errorBody = await response.json(); // Or response.text() depending on content type
      console.debug(errorBody)
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText || "Unknown error"}`,
      );
    }
    data = await response.json();
    listOfUniqueCompanies = [...listOfUniqueCompanies, ...data];
    return listOfUniqueCompanies;
  } catch (error: unknown) {
    //pass
    console.error("newsSummaryService getListOfUniqueCompanies error"); //TODO: dispatch an error, showing a invalid pop up or something like that
    throw error;
  }
}
