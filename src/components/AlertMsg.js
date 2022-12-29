import React from 'react';
import { Alert } from 'reactstrap';
import { Grid } from '@mui/material';

const SuccessMsg = (name, isVisiible = false, alertType = 'success') => {
    let msg = alertType&&alertType == 'success' ? `${JSON.stringify(name&&name)} created successfully` : `${name&&name} created failed`;
    let isAlertShow = isVisiible;
 

    return (
        <>
            {isAlertShow && (
                <Grid
                    lg={4}
                    md={4}
                    style={{
                        backgroundColor: 'aliceblue',
                        position: 'absolute',
                        right: 0,
                        marginTop: 50,
                        zIndex: 1000,
                        marginRight: 20,
                    }}>
                    <Alert color={alertType == 'success' ? 'success' : 'danger'}>{msg}</Alert>
                </Grid>
            )}
        </>
    );
};
export default SuccessMsg;
