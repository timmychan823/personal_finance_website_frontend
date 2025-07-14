import NewsPanel from "./NewsPanel";
import { render, screen } from "@testing-library/react";
import { News } from "types/newsSummary/interfaces";

describe("NewsPanel", () => {
  const testingNews: News = {
    newsDescription: "Testing description",
    newsLink: "http://www.testing.com",
    newsPublishTime: "2025-07-12",
    newsSource: "Testing News",
    newsTitle: "Testing title",
    tickers: ["TTT"],
    newsSentiment: 0.6,
  };
  const testingNews2: News = {
    newsDescription: "Testing description 2",
    newsLink: "http://www.testing2.com",
    newsPublishTime: "2025-07-12",
    newsSource: "Testing News 2",
    newsTitle: "Testing title 2",
    tickers: ["TT"],
    newsSentiment: 0.7,
  };

  const listOfTestingNews: News[] = [testingNews, testingNews2];

  it("renders news", () => {
    const { container } = render(
      <NewsPanel listOfNews={[listOfTestingNews[0]]} />,
    );
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Testing title",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Testing description")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "http://www.testing.com",
    );
    expect(screen.getByText("TTT")).toBeInTheDocument();
    expect(screen.getByText("0.6")).toBeInTheDocument();
    expect(container.childElementCount).toEqual(1);
  });

  it("renders no news", () => {
    const listWithNoNews: News[] = [];
    const { container } = render(<NewsPanel listOfNews={listWithNoNews} />);
    expect(container.childElementCount).toEqual(0);
  });

  it("renders multiple news", () => {
    const { container } = render(<NewsPanel listOfNews={listOfTestingNews} />);
    expect(container.childElementCount).toEqual(listOfTestingNews.length);
  });
});
