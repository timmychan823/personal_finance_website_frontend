import React from 'react'
import DatetimeRangeSelector from '../Non-Page/DatetimeRangeSelector'
import SearchExpenditure from '../Non-Page/SearchExpenditure'
import AddExpenditureButton from '../Non-Page/AddExpenditureButton'
import Expenditures from '../Non-Page/Expenditures'

function ExpenditurePage() {
    return (
        <>
            <DatetimeRangeSelector />
            <SearchExpenditure />
            <AddExpenditureButton />
            <Expenditures />


        </>
    )
}

export default ExpenditurePage