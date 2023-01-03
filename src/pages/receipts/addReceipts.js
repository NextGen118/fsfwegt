import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Grid } from '@mui/material';
import { createReceiptsApiCall, showAllReceiptsApi } from '../../axios/receipts/receipts';
import SuccessMsg from '../../components/AlertMsg';

const AddReceipts = (props) => {
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
        getClient();
        getInvoices();
        getArrivalNotice();
        getCurrency();
        getDetentionInvoice();
    }, []);

    const [client, setClient] = useState([]);
    const [clientselect, setClientselect] = useState('');

    const [invoices, setInvoices] = useState([]);
    const [invoicesselect, setInvoicesselect] = useState('');

    const [arrivalNotice, setArrivalNotice] = useState([]);
    const [arrivalNoticeselect, setArrivalNoticeselect] = useState('');

    const [detentionInvoice, setDetentionInvoice] = useState([]);
    const [detentionInvoiceselect, setDetentionInvoiceselect] = useState('');

    const [currency, setCurrency] = useState([]);
    const [currencyselect, setCurrencyselect] = useState('');
    const [activeselect, setActiveselect] = useState('');
    const changeActive = (event) => {
        setActiveselect(event.target.value);
    };

    const getClient = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/clients/show/all`)
            .then((res) => {
                setClient(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getInvoices = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/invoices/show/all`)
            .then((res) => {
                setInvoices(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getArrivalNotice = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/arivalnotices/show/all`)
            .then((res) => {
                setArrivalNotice(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getDetentionInvoice = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/detentioninvoice/show/all`)
            .then((res) => {
                setDetentionInvoice(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getCurrency = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/currencies/show/all`)
            .then((res) => {
                setCurrency(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const changeClient = (event) => {
        setClientselect(event.target.value);
        console.log(event.target.value, ' select');
    };
    const changeInvoices = (event) => {
        setInvoicesselect(event.target.value);
        console.log(event.target.value, ' select');
    };
    const changeArrivalNotice = (event) => {
        setArrivalNoticeselect(event.target.value);
        console.log(event.target.value, ' select');
    };
    const changeDetentionInvoice = (event) => {
        setDetentionInvoiceselect(event.target.value);
        console.log(event.target.value, ' select');
    };
    const changeCurrency = (event) => {
        setCurrencyselect(event.target.value);
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
            !values.date ||
            !values.receipt_no ||
            !values.description ||
            !clientselect ||
            !invoicesselect ||
            !arrivalNoticeselect ||
            !detentionInvoiceselect ||
            !currencyselect ||
            !activeselect
        ) {
            return false;
        }

        return true;
    }

    const onAdd = (event) => {
        let receiptsobj = {
            date: values.date,
            receipt_no: values.receipt_no,
            description: values.description,
            clientselect: clientselect,
            invoicesselect: invoicesselect,
            arrivalNoticeselect: arrivalNoticeselect,
            detentionInvoiceselect: detentionInvoiceselect,
            currencyselect: currencyselect,
            activeselect: 1,
        };
        console.log(receiptsobj, 'receipts obj');
        if (isFormValidate) {
            event.preventDefault();
            const createRes = createReceiptsApiCall(receiptsobj).then((createRes) => {
                console.log(createRes);
                if (createRes.status === 200) {
                    showAllReceiptsApi();
                    history.push('/receipts');
                    setAlertSucces(false);
                } else {
                    setAlertFaild(false);
                }
            });
        }
    };

    const onBack = () => {
        history.push('/receipts');
    };

    return (
        <React.Fragment>
            <Row className="page-title ">
                <Col md={12}>
                    <Row>
                        <h3 className="mb-1 mt-0">Add Receipts</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Receipts', path: '/receipts' },
                                { label: 'Add Receipts', path: '/receipts-add', active: true },
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
                                <AvField name="date" label="Date" type="date" required onChange={handleChange} />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="receipt_no"
                                    label="Receipt No"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="description"
                                    label="Description"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Arrival Notice</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={arrivalNoticeselect}
                                    onChange={changeArrivalNotice}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {arrivalNotice.map((arr) => (
                                        <MenuItem value={arr.id} key={arr.id}>
                                            {arr.arrival_notice_no}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Invoice</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select"
                                    value={invoicesselect}
                                    onChange={changeInvoices}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {invoices.map((invo) => (
                                        <MenuItem value={invo.id} key={invo.id}>
                                            {invo.invoice_no}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Detention Invoice</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={detentionInvoiceselect}
                                    onChange={changeDetentionInvoice}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {detentionInvoice.map((dete) => (
                                        <MenuItem value={dete.id} key={dete.id}>
                                            {dete.detention_no}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Client</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={clientselect}
                                    onChange={changeClient}
                                    sx={{ width: '100%', mb: 2, height: 40 }}>
                                    {client.map((con) => (
                                        <MenuItem value={con.id} key={con.id}>
                                            {con.client_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={currencyselect}
                                    onChange={changeCurrency}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {currency.map((cur) => (
                                        <MenuItem value={cur.id} key={cur.id}>
                                            {cur.currency_name}
                                        </MenuItem>
                                    ))}
                                </Select>
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
};

export default AddReceipts;
