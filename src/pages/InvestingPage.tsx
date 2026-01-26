import { Fragment, useState, useEffect } from "react";
import { Stack, Divider, Chip, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Autocomplete from '@mui/material/Autocomplete';
import {
  getListOfNews,
  getListOfUniqueCompanies,
} from "services/InvestingService/newsSummaryService";
import { getListOfCompaniesBasedOnQueryAndFilter, getSectorsAndSubIndustries } from "services/InvestingService/companySearchService";
import { useAlertContext } from "contexts/alert";
import CompanySearchResultPaper from "components/companySearch/companySearchResultPaper";
import TextField from "@mui/material/TextField";
import { CompanySearchResult } from "types/searchResult/interfaces";
import { flushSync } from "react-dom";
import CompanySearchSubIndustriesFilter from "components/companySearch/companySearchSubIndustriesFilter";

const InvestingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [subIndustriesFilter, setSubIndustriesFilter] = useState<string[]>([]);
  const [listOfCompanies, setListOfCompanies] = useState<CompanySearchResult[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [subIndustries, setSubIndustries] = useState<{ sector: string, subIndustries: string[] }[]>([]);

  const { alertDispatch } = useAlertContext();

  async function findAllSectorsAndSubIndustries() {
    try {
      let data = await getSectorsAndSubIndustries(); //TODO: why no data returned here
      setSubIndustries(data); //TODO: why no subIndustries set here
    } catch (error: any) {
      alertDispatch({ type: 'setError', message: error.message })
    }
  }

  async function submitListOfCompaniesRequest(pageNo: number) {
    try {
      const companySearchResultPageList = await getListOfCompaniesBasedOnQueryAndFilter(subIndustriesFilter, searchQuery, pageNo);
      (companySearchResultPageList.companyList !== null && companySearchResultPageList.companyList.length !== 0) ? setListOfCompanies(companySearchResultPageList.companyList) : setListOfCompanies([]);
      companySearchResultPageList.totalPages !== null ? setTotalPages(companySearchResultPageList.totalPages) : setTotalPages(1);
      companySearchResultPageList.pageNumber !== null ? setPageNumber(companySearchResultPageList.pageNumber) : setPageNumber(1);
      console.log(subIndustriesFilter);
      console.log(searchQuery)
    } catch (error: any) {
      alertDispatch({ type: 'setError', message: error.message })
    }

  }


  async function handlePageChange(event: any, value: number) {
    // console.log("value is " + value);
    // flushSync(
    //   () => { setPageNumber(value); }  //TODO: check why pageNumber is not instantly updated
    // );
    // console.log("page changed to " + pageNumber);
    await submitListOfCompaniesRequest(value);
  }

  async function handleSubmitListOfCompaniesRequest(event: any) {
    // flushSync(
    //   () => { setPageNumber(1); } //TODO: check why pageNumber is not instantly updated
    // );
    // console.log("page changed to " + pageNumber);
    await submitListOfCompaniesRequest(1);
  }

  function handleChangeOfSelectedSubIndustries(event: any, values: { sector: string, subIndustry: string }[]) {
    let newSubIndustries: string[] = [];
    values.forEach((value) => { newSubIndustries.push(value.subIndustry); });
    setSubIndustriesFilter((prevSubIndustriesFilter: any) => {
      return { ...prevSubIndustriesFilter, newSubIndustries };
    });
  }

  useEffect(() => {
    findAllSectorsAndSubIndustries();
  }, []);


  return (
    <Fragment>
      <Typography variant="h3" display="block">Portfolio</Typography>
      {/* <InvestmentDataPredictionChart actualData={stockPriceActualData} predictedData={stockPricePredictedData} /> //TODO: retrieve info from Interactive Broker Account Provided and show portfolio actual value and portfolio expected value in the future*/}
      <Typography variant="h3" display="block">Companies</Typography>
      <Stack direction="column">
        <TextField
          label="Search for Companies By Ticker"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.trim())}
          sx={{ marginBottom: 2, minWidth: 400 }}
        />
        <CompanySearchSubIndustriesFilter
          list={subIndustries}
          checkedSubIndustries={subIndustriesFilter}
          setCheckedSubIndustries={setSubIndustriesFilter}>
        </CompanySearchSubIndustriesFilter> //TODO: check why CompanySearchSubIndustriesFilter not shown

        <Stack direction="row" style={{ flex: 1, justifyContent: "end" }}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            endIcon={<SearchIcon />}
            sx={{ margin: "10px 10px" }}
            onClick={handleSubmitListOfCompaniesRequest}
          >
            Search
          </Button>
        </Stack>
        <Stack direction="column" style={{ flex: 1 }}>
          <Stack direction="column" style={{ flex: 1 }}>
            <Stack direction="column" spacing={2} sx={{ margin: 3 }}>
              {listOfCompanies.map((company) => (<CompanySearchResultPaper ticker={company.ticker} companyName={company.companyName} description={company.description} link={"/investing/" + company.ticker} />))}
            </Stack>
            <Stack direction="row" style={{ flex: 1, justifyContent: "center" }}>
              <Pagination count={totalPages} page={pageNumber} color="primary" onChange={handlePageChange} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Fragment>
  );
};

export default InvestingPage;
