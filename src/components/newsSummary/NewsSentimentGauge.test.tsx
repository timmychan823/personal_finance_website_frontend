import { render, screen } from "@testing-library/react";
import { News } from "types/newsSummary/interfaces";

import NewsSentimentGauge from "./NewsSentimentGauge";

describe("NewsSentimentGauge", () => {
  it("renders neutral news sentiment gauge", () => {
    const neutralNewsSentiment: number = 0.5;
    render(<NewsSentimentGauge newsSentiment={neutralNewsSentiment} />);
    expect(screen.getByText("0.5")).toBeInTheDocument();
  });

  it("renders negative news sentiment gauge", () => {
    const negativeNewsSentiment: number = 0.3;
    render(<NewsSentimentGauge newsSentiment={negativeNewsSentiment} />);
    expect(screen.getByText("0.3")).toBeInTheDocument();
  });

  it("renders positive news sentiment gauge", () => {
    const positiveNewsSentiment: number = 0.7;
    render(<NewsSentimentGauge newsSentiment={positiveNewsSentiment} />);
    expect(screen.getByText("0.7")).toBeInTheDocument();
  });
});
