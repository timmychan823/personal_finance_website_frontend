import React, { Fragment } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { CompanySearchResult } from 'types/searchResult/interfaces';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from "@mui/material/Box";


interface CompanySearchSubIndustriesFilterProps {
    list: { sector: string, subIndustries: string[] }[];
    checkedSubIndustries: string[];
    setCheckedSubIndustries: (checked: string[]) => void;
}
const CompanySearchSubIndustriesFilter: React.FC<CompanySearchSubIndustriesFilterProps> = ({
    list,
    checkedSubIndustries,
    setCheckedSubIndustries
}) => {

    const handleChange1 = (isChecked) => {
        return;
    };

    return (
        <Fragment>
            {
                list && list.map((item) => {
                    {/* Parent */ }
                    < FormControlLabel
                        key={item.sector}
                        label={item.sector}
                        control={
                            < Checkbox
                                checked={checkedSubIndustries.filter(checkedSubIndustry => item.subIndustries.includes(checkedSubIndustry)).length === item.subIndustries.length}
                                indeterminate={
                                    checkedSubIndustries.filter(checkedSubIndustry => item.subIndustries.includes(checkedSubIndustry)).length !== item.subIndustries.length &&
                                    checkedSubIndustries.length > 0
                                }
                                onChange={(event) => handleChange1(event.target.checked)}
                            />
                        }
                    />
                })
            }
        </Fragment>
    );
};

export default CompanySearchSubIndustriesFilter;