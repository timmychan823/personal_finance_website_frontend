import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Typography, Box } from "@mui/material";

// Example props type
type InvestmentDataPredictionChartProps = {
    actualData: { date: string; value: number }[];
    predictedData: { date: string; value: number }[];
};

const InvestmentDataPredictionChart: React.FC<InvestmentDataPredictionChartProps> = ({
    actualData,
    predictedData,
}) => {
    // Merge dates for x-axis
    const allDates = [
        ...actualData.map((d) => d.date),
        ...predictedData.map((d) => d.date),
    ];

    // Prepare series data
    const actualSeries = allDates.map((date) => {
        const found = actualData.find((d) => d.date === date);
        return found ? found.value : null;
    });

    const predictedSeries = allDates.map((date) => {
        const found = predictedData.find((d) => d.date === date);
        return found ? found.value : null;
    });

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Stock Data Prediction
            </Typography>
            <LineChart
                height={400}
                series={[
                    {
                        data: actualSeries,
                        label: "Actual",
                        color: "#1976d2", // blue
                        showMark: true,
                        area: false,
                    },
                    {
                        data: predictedSeries,
                        label: "Predicted",
                        color: "#ff9800", // orange
                        showMark: true,
                        area: false,
                    },
                ]}
                xAxis={[
                    {
                        data: allDates,
                        scaleType: "point",
                        label: "Date",
                    },
                ]}
                yAxis={[
                    {
                        label: "Stock Value",
                    },
                ]}
                margin={{ top: 20, right: 100, bottom: 50, left: 60 }}
            />
        </Box>
    );
};

export default InvestmentDataPredictionChart;