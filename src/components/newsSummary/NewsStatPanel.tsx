import { News } from "types/newsSummary/interfaces";
import LinkIcon from "@mui/icons-material/Link";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { Stack, Paper, Divider, Chip } from "@mui/material";
import NewsSentimentGauge from "./NewsSentimentGauge";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { LineChartData } from "types/chart/interface";

interface IProps {
    sentiment: number
    timeSeriesData: LineChartData
}

const NewsStatPanel = (props: IProps) => {
    return (
        <Stack direction="column">
            <h2>Overall Statistics</h2>
            <Stack direction="row" spacing={2}>
                <Stack direction="column">
                    <h3>Trend over last 7 days</h3>
                    <SparkLineChart
                        data={props.timeSeriesData.y}
                        xAxis={{
                            scaleType: "time",
                            data: props.timeSeriesData.x,
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
                    <NewsSentimentGauge newsSentiment={props.sentiment} />
                </Stack>
                <Divider orientation="vertical" flexItem />
                <Stack direction="column">
                    <h3>Number of news in the period</h3>
                    <h4>23</h4>
                </Stack>
            </Stack>
        </Stack>
    )

}

export default NewsStatPanel;