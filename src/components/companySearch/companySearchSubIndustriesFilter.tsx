import React, { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from "@mui/material/Box";
import FormGroup from '@mui/material/FormGroup';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

    const handleSubIndustryChange = (subIndustry: string, isChecked: boolean) => {
        if (isChecked) {
            setCheckedSubIndustries([...checkedSubIndustries, subIndustry]);
        } else {
            setCheckedSubIndustries(checkedSubIndustries.filter(item => item !== subIndustry));
        }
    };

    const handleSectorChange = (sector: string, subIndustries: string[], isChecked: boolean) => {
        if (isChecked) {
            const newChecked = [...new Set([...checkedSubIndustries, ...subIndustries])];
            setCheckedSubIndustries(newChecked);
        } else {
            const newChecked = checkedSubIndustries.filter(item => !subIndustries.includes(item));
            setCheckedSubIndustries(newChecked);
        }
    };

    if (!list || list.length === 0) {
        return <Typography variant="body2">No sectors available</Typography>;
    }

    return (
        <Fragment>
            {list.map((item) => {
                const sectorSubIndustries = item.subIndustries;
                const checkedCount = checkedSubIndustries.filter(checked => sectorSubIndustries.includes(checked)).length;
                const isAllChecked = checkedCount === sectorSubIndustries.length && sectorSubIndustries.length > 0;
                const isIndeterminate = checkedCount > 0 && checkedCount < sectorSubIndustries.length;

                return (
                    <Box key={item.sector}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`${item.sector}-content`}
                                id={`${item.sector}-header`}
                            >
                                <FormControlLabel
                                    label={<Typography variant="subtitle1"><strong>{item.sector}</strong></Typography>}
                                    control={
                                        <Checkbox
                                            checked={isAllChecked}
                                            indeterminate={isIndeterminate}
                                            onChange={(event) => handleSectorChange(item.sector, sectorSubIndustries, event.target.checked)}
                                        />
                                    }
                                />
                            </AccordionSummary>

                            <AccordionDetails>

                                <FormGroup sx={{ marginLeft: 3 }}>
                                    {sectorSubIndustries.map((subIndustry) => (
                                        <FormControlLabel
                                            key={subIndustry}
                                            label={subIndustry}
                                            control={
                                                <Checkbox
                                                    checked={checkedSubIndustries.includes(subIndustry)}
                                                    onChange={(event) => handleSubIndustryChange(subIndustry, event.target.checked)}
                                                />
                                            }
                                        />
                                    ))}
                                </FormGroup>
                            </AccordionDetails>

                        </Accordion>

                    </Box>
                );
            })}
        </Fragment>
    );
};

export default CompanySearchSubIndustriesFilter;