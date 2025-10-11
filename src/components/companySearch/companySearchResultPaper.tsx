import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { CompanySearchResult } from 'types/searchResult/interfaces';

interface CompanySearchResultProps extends CompanySearchResult {
    link: string;
}
const CompanySearchResultPaper: React.FC<CompanySearchResultProps> = ({
    ticker,
    companyName,
    description,
    link
}) => (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h3" component="div" fontWeight="bold">
            <Link href={link} underline="hover">
                {ticker}
            </Link>
        </Typography>
        <Typography variant="h4" component="div" color="text.secondary" sx={{ marginTop: 1 }}>
            {companyName}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
            {description}
        </Typography>
    </Paper>
);

export default CompanySearchResultPaper;