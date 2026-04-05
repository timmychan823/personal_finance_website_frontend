import * as NEWS_CONSTANTS from "constants/newsSummary";
import { News } from "types/newsSummary/interfaces";
import { NewsSummaryResponse } from "types/newsSummary/interfaces";
import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  HttpStatusCode,
  RawAxiosRequestHeaders,
} from 'axios'
import { axiosInstance as axiosInstance } from 'providers/axiosInstance'


export async function getListOfNews(
  listOfTickers: string[],
  limit: number = 10,
  pageNumber: number = 1,
): Promise<NewsSummaryResponse> {
  let response;
  let data;

  const params = new URLSearchParams();

  listOfTickers?.forEach((ticker) => {
    params.append("tickers", ticker); // Convert to string as URLSearchParams works with strings
  });

  params.append("limit", limit.toString());
  params.append("pageNumber", pageNumber.toString());
  try {
    // response = await fetch(
    //   `${NEWS_CONSTANTS.LIST_OF_NEWS_URL}?${params.toString()}`,
    //   {
    //     method: "GET",
    //   },
    // );
    await axiosInstance.get(
      `${NEWS_CONSTANTS.LIST_OF_NEWS_URL}?${params.toString()}`
    ).then(response => {
      data = response.data;
    }
    ).catch(error => {
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText || "Unknown error"}`,
      );
    })

    let listOfNewsFromResponse: News[] = data['listOfNews'];
    let numberOfNewsFromResponse: number = data['numberOfNews'];
    let newsSummaryResponse: NewsSummaryResponse = {
      listOfNews: listOfNewsFromResponse,
      numberOfNews: numberOfNewsFromResponse
    }
    return newsSummaryResponse;
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
    // response = await fetch(NEWS_CONSTANTS.LIST_OF_UNIQUE_COMPANIES_URL, {
    //   method: "GET",
    // });
    await axiosInstance.get(NEWS_CONSTANTS.LIST_OF_UNIQUE_COMPANIES_URL)
      .then(response => {
        data = response.data;
      }).catch(error => {
        throw new Error(
          `HTTP Error: ${response.status} - ${response.statusText || "Unknown error"}`,
        );
      })

    listOfUniqueCompanies = [...listOfUniqueCompanies, ...data];
    return listOfUniqueCompanies;
  } catch (error: unknown) {
    //pass
    console.error("newsSummaryService getListOfUniqueCompanies error"); //TODO: dispatch an error, showing a invalid pop up or something like that
    throw error;
  }
}

// return axios({
//     method,
//     url: url.startsWith('http')
//         ? `${url}${paramsStr}`
//         : `${API_HOST}${API_BASEPATH}${url}${paramsStr}`,
//     headers: {
//         Authorization: localStorage.getItem('accessToken')
//             ? `Bearer ${localStorage.getItem('accessToken')}`
//             : undefined,
//         ...options?.headers,
//     },
//     data,
//     timeout: 10000,
//     withCredentials: !isLocal(),
//     ...options?.axiosConfig,
// })
//     .then((res: AxiosResponse<any, any>) => {
//         if (options?.withResponseOptions) {
//             return { data: res.data, res: res }
//         }

//         return res.data
//     })
//     .catch((error: AxiosError<unknown, any>) => error)