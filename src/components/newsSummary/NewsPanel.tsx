import { News } from "types/newsSummary/interfaces";
import { FC, PropsWithChildren, useState, MouseEvent } from "react";
import LinkIcon from "@mui/icons-material/Link";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { Stack, Paper, Chip } from "@mui/material";
import NewsSentimentGauge from "./NewsSentimentGauge";

interface IProps {
  listOfNews: News[];
}

const NewsPanel = (props: IProps) => {
  return props.listOfNews.map((news: News) => (
    <Paper
      key={news.newsLink}
      elevation={10}
      sx={{ backgroundColor: "LightSkyBlue", padding: "4px" }}
    >
      <Stack direction="column">
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Stack direction="column" sx={{ minWidth: 300, width: 700 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <h3>{news.newsTitle}</h3>
              <Link target="_blank" href={news.newsLink}>
                <LinkIcon />
              </Link>
            </Stack>
            <p>{news.newsDescription}</p>
          </Stack>
          <NewsSentimentGauge newsSentiment={news.newsSentiment} />
        </Stack>
        <Box sx={{ flexWrap: "wrap" }}>
          {news.tickers.map((ticker: string) => (
            <Chip
              label={ticker}
              sx={{ margin: 1, backgroundColor: "LightGreen" }}
            />
          ))}
        </Box>
        {/* TODO: should add news.newsSource and news.newsPublishTime */}
        {/* TODO: for link, should open another tab on current window */}
        {/* TODO: if gauge not exist, should set to null */}
      </Stack>
    </Paper>
  ));
};

export default NewsPanel;
