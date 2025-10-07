import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

interface CompanySearchResultProps {
    ticker: string;
    name: string;
    description: string;
    link: string;
}

const CompanySearchResult: React.FC<CompanySearchResultProps> = ({
    ticker,
    name,
    description,
    link,
}) => (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h3" component="div" fontWeight="bold">
            <Link href={link} underline="hover">
                {ticker}
            </Link>
        </Typography>
        <Typography variant="h4" component="div" color="text.secondary" sx={{ marginTop: 1 }}>
            {name}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
            {description}
        </Typography>
    </Paper>
);

export default CompanySearchResult;