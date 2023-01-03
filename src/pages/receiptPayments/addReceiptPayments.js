import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Grid } from '@mui/material';
import { createReceiptPaymentsApiCall, showAllReceiptPaymentsApi } from '../../axios/receiptPayments/receiptPayments';
import SuccessMsg from '../../components/AlertMsg';

const AddReceiptPayments = forwardRef((props, ref) => {
    const [values, setValues] = useState({});
    let history = useHistory();

    const handleChange = (evt) => {
        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value,
        });
    };

    useEffect(() => {
        getReceipts();
    }, []);

    const [receipts, setReceipts] = useState([]);
    const [receiptsselect, setReceiptsselect] = useState('');
    const [activeselect, setActiveselect] = useState('');
    const changeActive = (event) => {
        setActiveselect(event.target.value);
    };
    const getReceipts = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/receipts/show/all`)
            .then((res) => {
                setReceipts(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const changeReceipts = (event) => {
        setReceiptsselect(event.target.value);
        console.log(event.target.value, ' select');
    };

    const [alertSuccess, setAlertSucces] = useState(true);
    const [alertFaild, setAlertFaild] = useState(true);
    const [errorName, setErrorname] = useState('');
    useEffect(() => {
        SuccessMsg('ArrivalNoticies', true, 'error');
        setTimeout(() => {
            SuccessMsg('ArrivalNoticies', false, 'error');
        }, 500);
    });

    function isFormValidate() {
        if (
            !values.pay_type ||
            !values.cheque_no ||
            !values.cheque_date ||
            !values.current_bal ||
            !values.paying_amount ||
            !values.paying_local ||
            !values.shipment_type ||
            !values.hbl_no ||
            !values.carrier ||
            !values.nos_units ||
            !values.weight ||
            !values.cbm ||
            !values.remarks ||
            !values.usd_rate ||
            !values.usd_tot ||
            !values.tax_invoice ||
            !receiptsselect ||
            !activeselect
        ) {
            return false;
        }

        return true;
    }

    const onAdd = (event) => {
        let receiptPaymentsobj = {
            pay_type: values.pay_type,
            cheque_no: values.cheque_no,
            cheque_date: values.cheque_date,
            current_bal: values.current_bal,
            paying_amount: values.paying_amount,
            paying_local: values.paying_local,
            shipment_type: values.shipment_type,
            hbl_no: values.hbl_no,
            carrier: values.carrier,
            nos_units: values.nos_units,
            weight: values.weight,
            cbm: values.cbm,
            remarks: values.remarks,
            usd_rate: values.usd_rate,
            usd_tot: values.usd_tot,
            tax_invoice: values.tax_invoice,
            receiptsselect: receiptsselect,
            activeselect: 1,
        };
        console.log(receiptPaymentsobj, 'receiptPayments obj');
        if (isFormValidate) {
            event.preventDefault();
            const createRes = createReceiptPaymentsApiCall(receiptPaymentsobj).then((createRes) => {
                console.log(createRes);
                if (createRes.status === 200) {
                    showAllReceiptPaymentsApi();
                    history.push('/receiptPayments');
                    setAlertSucces(false);
                } else {
                    setAlertFaild(false);
                }
            });
        }
    };

    const onBack = () => {
        history.push('/receiptPayments');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <Row>
                        <h3 className="mb-1 mt-0">Add Receipts Payments</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Receipts Payments', path: '/receiptPayments' },
                                { label: 'Add Receipts Payments', path: '/receiptPayments-add', active: true },
                            ]}
                        />
                    </Row>
                </Col>
            </Row>

            <Card>
                <CardBody>
                    <AvForm onSubmit={onAdd}>
                        <Row>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Receipt</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={receiptsselect}
                                    onChange={changeReceipts}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {receipts.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.receipt_no}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="pay_type"
                                    label="Pay Type"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="cheque_no"
                                    label="Cheque No"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="cheque_date"
                                    label="Cheque Date"
                                    type="date"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="current_bal"
                                    label="Current Balance"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="paying_amount"
                                    label="Paying Ammount"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="paying_local"
                                    label="Paying Local"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Grid md={12} sx={{ textAlign: 'right' }}>
                            <Button color="danger" type="submit" style={{ marginLeft: 15 }} onClick={onBack}>
                                Back
                            </Button>
                            <Button color="primary" type="submit" style={{ marginLeft: 15 }}>
                                Submit
                            </Button>
                        </Grid>
                    </AvForm>
                </CardBody>
            </Card>
        </React.Fragment>
    );
});

export default AddReceiptPayments;
