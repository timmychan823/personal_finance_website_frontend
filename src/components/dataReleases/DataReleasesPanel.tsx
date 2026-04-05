import { useEffect, useState } from 'react'
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { getListOfDataReleases } from 'services/InvestingService/dataReleasesService'
import { useAlertContext } from 'contexts/alert';

export default function DataReleasesPanel() {
    const { alertDispatch } = useAlertContext();
    const [listOfDataReleases, setListOfDataReleases] = useState([]); //TODO: define interface for DataRelease
    const [isLoading, setIsLoading] = useState(true); //TODO: define interface for DataRelease

    useEffect(() => {
        async function fetchListOfDataReleases() {
            try {
                const data = await getListOfDataReleases() //TODO: add time range
                console.log(data)
                setListOfDataReleases(data);
                setIsLoading(false);
            } catch (error: any) {
                alertDispatch({ type: 'setError', message: error.message });
            }
        }
        fetchListOfDataReleases();
    }, []);

    return (
        <Paper
            sx={{
                p: "2px 10px",
                display: "flex",
                justifyContent: "start",
                alignItems: "start",
                maxWidth: "500px",
                minHeight: "400px"
            }}
        >
            <Stack sx={{ flex: 1, display: "flex" }} direction="column">
                <h2>Data Releases Yesterday</h2>
                <Stack sx={{ flex: 1, display: "flex" }} direction="column">
                    {
                        (() => {
                            if (isLoading) {
                                return (<Stack sx={{ flex: 1, justifyContent: "center", alignItems: "center" }}><CircularProgress /></Stack>)
                            } else if (!isLoading && !listOfDataReleases) {
                                return (<Stack sx={{ flex: 1, justifyContent: "center", alignItems: "center" }}><h3 style={{ color: "LightGray" }}>No Data Release</h3></Stack>)
                            } else {
                                return (
                                    <Stack sx={{ flex: 1, display: "flex" }} direction="column">
                                        {listOfDataReleases.map((source: any) => (
                                            <>
                                                <Link target="_blank" href={source['releases'][0]["source_link"]}><h3>{source["source_name"]}</h3></Link>
                                                {source.releases.map((release: any) => (<Link target="_blank" href={release.release_link}><p>{release.release_name_x}</p></Link>))}
                                            </>
                                        ))}
                                    </Stack>
                                )

                            }
                        })()
                    }
                </Stack>
            </Stack>
        </Paper>
    )
}