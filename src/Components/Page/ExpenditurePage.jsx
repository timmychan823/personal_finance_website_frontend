<<<<<<< HEAD
import { useState, useContext, useEffect } from 'react'
=======
import React from 'react'
>>>>>>> c81439c75d229ced839b60e466e373cd926236bc
import DatetimeRangeSelector from '../Non-Page/DatetimeRangeSelector'
import SearchExpenditure from '../Non-Page/SearchExpenditure'
import AddExpenditureButton from '../Non-Page/AddExpenditureButton'
import Expenditures from '../Non-Page/Expenditures'
<<<<<<< HEAD
import { SnackBarContext, SearchBarExpenditureContext, IsLoadingContext } from '../Non-Page/Context'
import { Stack } from '@mui/material'

function ExpenditurePage() {
    const [search, setSearch] = useState({
        searchQuery: "",
        controller: { page: 0, rowsPerPage: 20 }
    })
    const [expendituresList, setExpendituresList] = useState({
        expendituresList: [],
        expendituresCount: 0
    })

    const { snackBarDispatch } = useContext(SnackBarContext)
    const { setIsLoading } = useContext(IsLoadingContext)


    const getData = async () => {

        console.log("searchQuery: " + search.searchQuery)
        let url = `/expenditure/search?pageNo=${search.controller.page}&pageSize=${search.controller.rowsPerPage}`
        if (search.searchQuery != "") {
            url = `/expenditure/getAllExpenditureByReceiver?receiver=${search.searchQuery}&pageNo=${search.controller.page}&pageSize=${search.controller.rowsPerPage}`
        }
        try {
            setIsLoading(true)
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.status == 200) {
                const data = await response.json();
                setIsLoading(false)
                setExpendituresList({ expendituresList: data.content, expendituresCount: data.totalElements });
            } else {
                setIsLoading(false)
                snackBarDispatch({ show: "SHOW", type: "SHOW ERROR", message: "Errors occur while fetching data" })

            }
        } catch (error) {
            setIsLoading(false)
            snackBarDispatch({ show: "SHOW", type: "SHOW ERROR", message: "Errors occur while fetching data" })


        }

    };

    useEffect(() => {
        getData()
    }, [search])

    return (
        <>
            <SearchBarExpenditureContext.Provider value={{ getData }}>
                <Stack direction="column" spacing="10px">
                    <DatetimeRangeSelector search={search} setSearch={setSearch} expendituresList={expendituresList} setExpendituresList={setExpendituresList} />
                    <SearchExpenditure search={search} setSearch={setSearch} expendituresList={expendituresList} setExpendituresList={setExpendituresList} />
                    <AddExpenditureButton buttonVariant="outlined" />
                    <Expenditures search={search} setSearch={setSearch} expendituresList={expendituresList} setExpendituresList={setExpendituresList} />
                </Stack >
            </SearchBarExpenditureContext.Provider >

=======

function ExpenditurePage() {
    return (
        <>
            <DatetimeRangeSelector />
            <SearchExpenditure />
            <AddExpenditureButton />
            <Expenditures />
>>>>>>> c81439c75d229ced839b60e466e373cd926236bc


        </>
    )
}

export default ExpenditurePage