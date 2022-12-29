import React from 'react';
import { Alert } from 'reactstrap';

export const SuccessMsg = (name) => {
    return (
        <>
            <Alert color="success">{name} created successfully</Alert>
        </>
    );
};

export const FailureMsg = (name) => {
    return (
        <>
            <Alert color="danger">{name} created failed</Alert>
        </>
    );
};