import { Fragment, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Stack, Divider, Chip } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Pagination from "@mui/material/Pagination";
import {
    getListOfNews,
    getListOfUniqueCompanies,
} from "services/NewsSummaryService/newsSummaryService";
import NewsPanel from "components/newsSummary/NewsPanel";
import NewsStatPanel from "components/newsSummary/NewsStatPanel";
import { useAlertContext } from "contexts/alert";
import { LineChartData } from "types/chart/interface";
import InvestmentDataPredictionChart from "components/investmentDataPrediction/investmentDataPredictionChart";

const StockDetailsPage = () => {
    const { ticker } = useParams();
    const [sentiment, setSentiment] = useState(null); //TODO: put in NewsContext
    const [listOfNews, setListOfNews] = useState([]); //TODO: put in NewsContext
    const [limit, setLimit] = useState(10); //TODO: put in NewsContext
    const { alertDispatch } = useAlertContext();
    const defaultTimeSeriesData: LineChartData = {
        x: [new Date(2025, 6, 7), new Date(2025, 6, 8), new Date(2025, 6, 9), new Date(2025, 6, 10), new Date(2025, 6, 11), new Date(2025, 6, 12), new Date(2025, 6, 13)],
        y: [0.5, 0.6, 0.8, 0.7, 0.2, 0.1, 0.3]
    }
    const [timeSeriesData, setTimeSeriesData] = useState(defaultTimeSeriesData)
    async function handleNewsUpdate() {
        try {
            setListOfNews(await getListOfNews([ticker], limit)); //TODO: should add current page number, startTime, endTime
        } catch (error: unknown) {
            alertDispatch({ type: 'setError', message: error.message })
        }

    }
    useEffect(() => {
        handleNewsUpdate();
    }, [])

    return (
        <Fragment>
            <h1 display="block">Ticker: {ticker}</h1>
            <InvestmentDataPredictionChart actualData={[{ date: '2025-01-01', value: 2 }, { date: '2025-01-02', value: 4 }, { date: '2025-01-03', value: 8 }]} predictedData={[{ date: '2025-01-04', value: 5 }, { date: '2025-01-05', value: 4 }]} />
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
                    <Stack direction="row" style={{ flex: 1, justifyContent: "center" }}>
                        <Pagination count={10} color="primary" />
                    </Stack>
                </Stack>
            </Stack>
        </Fragment>
    );
};

export default StockDetailsPage;
