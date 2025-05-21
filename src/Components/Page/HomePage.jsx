import { useState, useContext, useEffect } from 'react'
import { SnackBarContext, IsLoadingContext } from '../Non-Page/Context'
import { Stack } from '@mui/material'

function HomePage() {
    const { snackBarDispatch } = useContext(SnackBarContext)
    const { setIsLoading } = useContext(IsLoadingContext)


    useEffect(() => {
        setIsLoading(false)
    }, [])

    return (
        <>
            <Stack direction="column" spacing="10px">
                Home Page
            </Stack >



        </>
    )
}

export default HomePage