import React from 'react'
import Pagination from '@mui/material/Pagination';

const Paginations = ({ postPerPage, page, hanldeChange }) => {

    return (
        <>

            <Pagination count={postPerPage} page={page} hanldeChange={hanldeChange} variant="outlined" />

        </>
    )
}

export default Paginations