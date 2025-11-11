import { Fragment, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Stack, Divider, Chip, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Pagination from "@mui/material/Pagination";
import {
    getListOfNews,
    getListOfUniqueCompanies,
} from "services/InvestingService/newsSummaryService";
import NewsPanel from "components/newsSummary/NewsPanel";
import NewsStatPanel from "components/newsSummary/NewsStatPanel";
import { useAlertContext } from "contexts/alert";
import { LineChartData } from "types/chart/interface";
import InvestmentDataPredictionChart from "components/investmentDataPrediction/investmentDataPredictionChart";
import { getStockPriceData } from "services/InvestingService/stockPriceDataService";
import { timeSeriesDatum } from "types/investingPrediction/interfaces";
import { News } from "types/newsSummary/interfaces";
import { NewsSummaryResponse } from "types/newsSummary/interfaces";

const StockDetailsPage = () => {
    const { ticker } = useParams();
    const [sentiment, setSentiment] = useState(null); //TODO: put in NewsContext
    const [listOfNews, setListOfNews] = useState<Array<News>>([]); //TODO: put in NewsContext
    const [stockPriceActualData, setStockPriceActualData] = useState<Array<timeSeriesDatum>>([]);
    const [stockPricePredictedData, setStockPricePredictedData] = useState<Array<timeSeriesDatum>>([]);
    const [limit, setLimit] = useState(10); //TODO: remove limit (add it on server side), should add page number and page size
    const [pageNumber, setPageNumber] = useState(1);
    const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
    const { alertDispatch } = useAlertContext();
    // const defaultTimeSeriesData: LineChartData = {
    //     x: [new Date(2025, 6, 7), new Date(2025, 6, 8), new Date(2025, 6, 9), new Date(2025, 6, 10), new Date(2025, 6, 11), new Date(2025, 6, 12), new Date(2025, 6, 13)],
    //     y: [0.5, 0.6, 0.8, 0.7, 0.2, 0.1, 0.3]
    // }
    // const [timeSeriesData, setTimeSeriesData] = useState(defaultTimeSeriesData)
    async function handleNewsUpdate() {
        try {
            let newsSummaryResponse: NewsSummaryResponse = await getListOfNews([ticker], limit, pageNumber); //TODO: should add current page number, startTime, endTime
            setTotalNumberOfPages(Math.ceil(newsSummaryResponse.numberOfNews / limit));
            console.log("totalNumberOfPages: " + totalNumberOfPages);
            console.log(newsSummaryResponse.listOfNews)
            setListOfNews(newsSummaryResponse.listOfNews);
        } catch (error: any) {
            alertDispatch({ type: 'setError', message: error.message })
        }

    }

    // Function to handle page changes
    const handlePageChange = (event: Event, newPageNumber: number) => {
        setPageNumber(newPageNumber);
    };

    async function handleStockPriceUpdate() {
        try {
            setStockPriceActualData(await getStockPriceData(ticker, "daily", "actual"));
            setStockPricePredictedData(await getStockPriceData(ticker, "daily", "predicted"));

        } catch (error: any) {
            alertDispatch({ type: 'setError', message: error.message })
        }
    }

    useEffect(() => {
        handleNewsUpdate();
    }, [pageNumber])

    useEffect(() => {
        handleStockPriceUpdate();
    }, [])

    return (
        <Fragment>
            <Typography variant="h3" display="block">Ticker: {ticker}</Typography>
            <InvestmentDataPredictionChart actualData={stockPriceActualData} predictedData={stockPricePredictedData} />
            <Stack direction="row" spacing={2} sx={{ justifyContent: "end" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker label="Start Time" />
                    <DateTimePicker label="End time" />
                </LocalizationProvider>
            </Stack>
            <Stack direction="column">
                <Stack direction="column" style={{ flex: 1 }}>
                    {/* <NewsStatPanel timeSeriesData={timeSeriesData} sentiment={sentiment} /> */}
                    <Stack direction="column" spacing={2} sx={{ margin: 3 }}>
                        <NewsPanel listOfNews={listOfNews} />
                    </Stack>
                    {totalNumberOfPages !== 0 && <Stack direction="row" style={{ flex: 1, justifyContent: "center" }}>
                        <Pagination count={totalNumberOfPages} page={pageNumber} onChange={handlePageChange} color="primary" showFirstButton showLastButton />
                    </Stack>}
                </Stack>
            </Stack>
        </Fragment>
    );
};

export default StockDetailsPage;
