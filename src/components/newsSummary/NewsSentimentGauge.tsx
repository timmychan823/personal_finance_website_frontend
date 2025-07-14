import { FC, PropsWithChildren } from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

interface IProps {
  newsSentiment: number;
}

const NewsSentimentGauge: FC<PropsWithChildren<IProps>> = ({
  newsSentiment,
}) => {
  if (newsSentiment > 0.5) {
    return (
      <Gauge
        width={100}
        height={100}
        skipAnimation={true}
        valueMin={0}
        valueMax={1}
        value={newsSentiment}
        sx={(theme) => ({
          [`& .${gaugeClasses.valueArc}`]: {
            fill: "green",
          },
        })}
      />
    );
  } else if (newsSentiment < 0.5) {
    return (
      <Gauge
        width={100}
        height={100}
        skipAnimation={true}
        valueMin={0}
        valueMax={1}
        value={newsSentiment}
        sx={(theme) => ({
          [`& .${gaugeClasses.valueArc}`]: {
            fill: "red",
          },
        })}
      />
    );
  } else {
    return (
      <Gauge
        width={100}
        height={100}
        skipAnimation={true}
        valueMin={0}
        valueMax={1}
        value={newsSentiment}
        sx={(theme) => ({
          [`& .${gaugeClasses.valueArc}`]: {
            fill: "grey",
          },
        })}
      />
    );
  }
};

export default NewsSentimentGauge;
