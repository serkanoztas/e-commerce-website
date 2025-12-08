import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

function BackDrop() {

    const loading = useSelector((store) => store.product.loading);

    return (
        <div>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default BackDrop