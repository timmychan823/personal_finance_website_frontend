import { Fragment, useState, useEffect } from "react";
import { Stack, Divider, Chip } from "@mui/material";
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
import { useAlertContext } from "contexts/alert";
import CompanySearchResult from "components/companySearch/companySearchResult";

const InvestingPage = () => {
  const [listOfUniqueCompanies, setListOfUniqueCompanies] = useState([]); //TODO: put in NewsContext
  const { alertDispatch } = useAlertContext();
  async function handleSubmitListOfCompaniesRequest() {
    try {
    } catch (error: unknown) {
      alertDispatch({ type: 'setError', message: error.message })
    }

  }

  useEffect(() => {
    async function fetchListOfUniqueCompanies() {
      try {
        setListOfUniqueCompanies(await getListOfUniqueCompanies());
      } catch (error: unknown) {
        alertDispatch({ type: 'setError', message: error.message });
      }
    }
    fetchListOfUniqueCompanies();

  }, []);

  return (
    <Fragment>
      <h1 display="block">Companies</h1>
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
            </div>
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
          </AccordionDetails>
        </Accordion>
        <Stack direction="column" style={{ flex: 1 }}>
          <Stack direction="column" style={{ flex: 1 }}>
            <Stack direction="column" spacing={2} sx={{ margin: 3 }}>
              {listOfUniqueCompanies.map((ticker) => (<CompanySearchResult ticker={ticker} name={ticker} description={ticker} link={"/investing/" + ticker} />))}
            </Stack>
            <Stack direction="row" style={{ flex: 1, justifyContent: "center" }}>
              <Pagination count={10} color="primary" />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Fragment>
  );
};

export default InvestingPage;
