import { Fragment, useState, useEffect } from "react";
import { Stack, Divider, Chip, Typography } from "@mui/material";
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
} from "services/InvestingService/newsSummaryService";
import { getListOfCompaniesBasedOnQueryAndFilter } from "services/InvestingService/companySearchService";
import { useAlertContext } from "contexts/alert";
import CompanySearchResultPaper from "components/companySearch/companySearchResultPaper";
import TextField from "@mui/material/TextField";
import { CompanySearchResult } from "types/searchResult/interfaces";
import { flushSync } from "react-dom";

const InvestingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const defaultCountries = ["China", "US", "Europe"];
  const defaultSectors = [
    "Information Technology", "Health Care", "Financials", "Consumer Discretionary",
    "Communication Services", "Industrials", "Consumer Staples", "Energy",
    "Utilities", "Real Estate", "Materials"
  ];
  const [filter, setFilter] = useState({ countryFilter: defaultCountries, sectorFilter: defaultSectors });
  const [listOfCompanies, setListOfCompanies] = useState<CompanySearchResult[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { alertDispatch } = useAlertContext();

  async function submitListOfCompaniesRequest(pageNo: number) {
    try {
      const companySearchResultPageList = await getListOfCompaniesBasedOnQueryAndFilter(filter, searchQuery, pageNo);
      (companySearchResultPageList.companyList !== null && companySearchResultPageList.companyList.length !== 0) ? setListOfCompanies(companySearchResultPageList.companyList) : setListOfCompanies([]);
      companySearchResultPageList.totalPages !== null ? setTotalPages(companySearchResultPageList.totalPages) : setTotalPages(1);
      companySearchResultPageList.pageNumber !== null ? setPageNumber(companySearchResultPageList.pageNumber) : setPageNumber(1);

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

  return (
    <Fragment>
      <Typography variant="h3" display="block">Companies</Typography>
      <TextField
        label="Search for Companies By Ticker"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value.trim())}
        sx={{ marginBottom: 2, minWidth: 400 }}
      />
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
              {defaultCountries.map((countryString: string) => (
                <Chip
                  key={countryString}
                  label={countryString}
                  sx={{ margin: 1, backgroundColor: "LightSalmon" }}
                />
              ))}
            </div>
            <Divider />
            <div>
              <h3>Sectors</h3>
              {defaultSectors.map((sectorString: string) => (
                <Chip
                  key={sectorString}
                  label={sectorString}
                  sx={{ margin: 1, backgroundColor: "LightSkyBlue" }}
                />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
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
