import { Fragment, useState, useEffect } from "react";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { Stack, Paper, Divider, Chip } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Pagination from "@mui/material/Pagination";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import {
  getListOfNews,
  getListOfUniqueCompanies,
} from "services/NewsSummaryService/newsSummaryService";
import NewsPanel from "components/newsSummary/NewsPanel";
import NewsSentimentGauge from "components/newsSummary/NewsSentimentGauge";

const NewsPage = () => {
  const [sentiment, setSentiment] = useState(null); //TODO: put in NewsContext
  const [listOfNews, setListOfNews] = useState([]); //TODO: put in NewsContext
  const [listOfTickers, setlistOfTickers] = useState(["TSLA", "NVDA"]); //TODO: put in NewsContext
  const [limit, setLimit] = useState(10); //TODO: put in NewsContext
  const [listOfUniqueCompanies, setListOfUniqueCompanies] = useState([]); //TODO: put in NewsContext

  async function handleSubmitListOfNewsRequest() {
    setListOfNews(await getListOfNews(listOfTickers, limit)); //TODO: should add current page number, startTime, endTime
  }

  useEffect(() => {
    async function fetchListOfUniqueCompanies() {
      setListOfUniqueCompanies(await getListOfUniqueCompanies());
    }
    fetchListOfUniqueCompanies();
  }, []);

  return (
    <Fragment>
      <h1 display="block">News Page</h1>
      <Stack direction="row" spacing={2} sx={{ justifyContent: "end" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker label="Start Time" />
          <DateTimePicker label="End time" />
        </LocalizationProvider>
      </Stack>
      <Stack direction="column">
        <Accordion sx={{ minWidth: 400, zIndex: 1060, margin: "8px 0px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ backgroundColor: "PapayaWhip" }}
          >
            <h2>Categories Filter</h2>
          </AccordionSummary>
          <Divider />
          <AccordionDetails sx={{ backgroundColor: "Ivory" }}>
            <div>
              <h3>Countries</h3>
              <Chip
                label="China"
                sx={{ margin: 1, backgroundColor: "LightSalmon" }}
              />
              <Chip
                label="US"
                sx={{ margin: 1, backgroundColor: "LightSalmon" }}
              />
              <Chip
                label="Europe"
                sx={{ margin: 1, backgroundColor: "LightSalmon" }}
              />
            </div>
            <Divider />
            <div>
              <h3>Sectors</h3>
              <Chip
                label="Information Technology"
                sx={{ margin: 1, backgroundColor: "LightSkyBlue" }}
              />
              <Chip
                label="Health Care"
                sx={{ margin: 1, backgroundColor: "LightSkyBlue" }}
              />
              <Chip
                label="Financials"
                sx={{ margin: 1, backgroundColor: "LightSkyBlue" }}
              />
              <Chip
                label="Consumer Discretionary"
                sx={{ margin: 1, backgroundColor: "LightSkyBlue" }}
              />
              <Chip
                label="Communication Services"
                sx={{ margin: 1, backgroundColor: "LightSkyBlue" }}
              />
              <Chip
                label="Industrials"
                sx={{ margin: 1, backgroundColor: "LightSkyBlue" }}
              />
              <Chip
                label="Consumer Staples"
                sx={{ margin: 1, backgroundColor: "LightSkyBlue" }}
              />
              <Chip
                label="Energy"
                sx={{ margin: 1, backgroundColor: "LightSkyBlue" }}
              />
              <Chip
                label="Utilities"
                sx={{ margin: 1, backgroundColor: "LightSkyBlue" }}
              />
              <Chip
                label="Real Estate"
                sx={{ margin: 1, backgroundColor: "LightSkyBlue" }}
              />
              <Chip
                label="Materials"
                sx={{ margin: 1, backgroundColor: "LightSkyBlue" }}
              />
            </div>
            <Divider />
            <div>
              <h3>Companies</h3>
              {listOfUniqueCompanies.map((companyString: string) => (
                <Chip
                  key={companyString}
                  label={companyString}
                  sx={{ margin: 1, backgroundColor: "LightGreen" }}
                />
              ))}
              {/* <Chip label="SubArea1" sx={{margin:1, backgroundColor: "LightGreen"}}/>
                                    <Chip label="SubArea2" sx={{margin:1, backgroundColor: "LightGreen"}}/>
                                    <Chip label="SubArea3" sx={{margin:1, backgroundColor: "LightGreen"}}/> */}
            </div>
            <Stack direction="row" style={{ flex: 1, justifyContent: "end" }}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                endIcon={<SearchIcon />}
                sx={{ margin: "10px 10px" }}
                onClick={handleSubmitListOfNewsRequest}
              >
                Search
              </Button>
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Stack direction="column" style={{ flex: 1 }}>
          <Stack direction="column">
            <h2>Overall Statistics</h2>
            <Stack direction="row" spacing={2}>
              <Stack direction="column">
                <h3>Trend over last 7 days</h3>
                <SparkLineChart
                  data={[0.5, 0.6, 0.8, 0.7, 0.2, 0.1, 0.3]}
                  xAxis={{
                    scaleType: "time",
                    data: [
                      new Date(2025, 6, 7),
                      new Date(2025, 6, 8),
                      new Date(2025, 6, 9),
                      new Date(2025, 6, 10),
                      new Date(2025, 6, 11),
                      new Date(2025, 6, 12),
                      new Date(2025, 6, 13),
                    ],
                    valueFormatter: (value) => value.toISOString().slice(0, 10),
                  }}
                  height={100}
                  width={200}
                  showHighlight={true}
                  showTooltip={true}
                />
              </Stack>
              <Stack direction="column">
                <h3>Sentiment in the period</h3>
                <NewsSentimentGauge newsSentiment={sentiment} />
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack direction="column">
                <h3>Number of news in the period</h3>
                <h4>23</h4>
              </Stack>
            </Stack>
          </Stack>
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

export default NewsPage;
