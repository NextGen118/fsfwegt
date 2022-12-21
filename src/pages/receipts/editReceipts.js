import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const EditReceipts = (props) => {
    const { id } = useParams();
    const [values, setValues] = useState({
        date: '',
        receipt_no: '',
        description: '',
        status: '',
    });

    const history = useHistory();

    useEffect(() => {
        getClient();
        getInvoices();
        getArrivalNotice();
        getCurrency();
        getDetentionInvoice();
        getReceiptsByid();
    }, [props.id]);

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
            .get(`http://127.0.0.1:8000/api/clients/show/all`)
            .then((res) => {
                setClient(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getInvoices = () => {
        axios
            .get(`http://127.0.0.1:8000/api/invoices/show/all`)
            .then((res) => {
                setInvoices(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getArrivalNotice = () => {
        axios
            .get(`http://127.0.0.1:8000/api/arivalnotices/show/all`)
            .then((res) => {
                setArrivalNotice(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getDetentionInvoice = () => {
        axios
            .get(`http://127.0.0.1:8000/api/detentioninvoice/show/all`)
            .then((res) => {
                setDetentionInvoice(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getCurrency = () => {
        axios
            .get(`http://127.0.0.1:8000/api/currencies/show/all`)
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

    const getReceiptsByid = () => {
        axios
            .get(`http://127.0.0.1:8000/api/receipts/show/all`)
            .then((res) => {
                const data = res.data.data.filter((ress) => ress.id === parseInt(id));
                setValues({
                    date: data[0].date,
                    receipt_no: data[0].receipt_no,
                    description: data[0].description,
                    status: data[0].status,
                });
                setClientselect(data[0].client_id);
                setInvoicesselect(data[0].invoice_id);
                setArrivalNoticeselect(data[0].arrival_notice_id);
                setDetentionInvoiceselect(data[0].detention_invoice_id);
                setCurrencyselect(data[0].currency_id);
                setActiveselect(data[0].status);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChange = (evt) => {
        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value,
        });
    };

    const submitEdit = () => {
        axios
            .post(
                `http://127.0.0.1:8000/api/receipts/store?date=${values.date}&receipt_no=${values.receipt_no}&description=${values.description}&client_id=${clientselect}&arrival_notice_id=${arrivalNoticeselect}&invoice_id=${invoicesselect}&detention_invoice_id=${detentionInvoiceselect}&currency_id=${currencyselect}&status=${activeselect}&id=${id}`
            )
            .then((res) => {
                history.push('/receipts');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onBack = () => {
        history.push('/receipts');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <Row>
                        <h3 className="mb-1 mt-0">Edit Receipts</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Receipts', path: '/receipts' },
                                { label: 'Edit Receipts', path: '/receipts-add', active: true },
                            ]}
                        />
                    </Row>
                </Col>
            </Row>
            <Card>
                <CardBody>
                    <AvForm>
                        <Row>
                            <Col lg={4}>
                                <AvField
                                    name="date"
                                    label="Date"
                                    type="date"
                                    required
                                    onChange={handleChange}
                                    value={values.date}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="receipt_no"
                                    label="Receipt No"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.receipt_no}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="description"
                                    label="Description"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.description}
                                />
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Arrival Notice</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={arrivalNoticeselect}
                                    onChange={changeArrivalNotice}
                                    sx={{ width: 360, height: 36, mb: 2 }}>
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
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={invoicesselect}
                                    onChange={changeInvoices}
                                    sx={{ width: 360, height: 36, mb: 2 }}>
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
                                    sx={{ width: 360, height: 36, mb: 2 }}>
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
                                    sx={{ width: 360, mb: 2, height: 36 }}>
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
                                    sx={{ width: 360, height: 36, mb: 2 }}>
                                    {currency.map((cur) => (
                                        <MenuItem value={cur.id} key={cur.id}>
                                            {cur.currency_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={activeselect}
                                    onChange={changeActive}
                                    sx={{ width: 360, height: 36, mb: 2 }}>
                                    <MenuItem value={1}>Active</MenuItem>
                                    <MenuItem value={0}>Inactive</MenuItem>
                                </Select>
                            </Col>
                        </Row>
                    </AvForm>
                </CardBody>
            </Card>
            <Button color="primary" type="submit" onClick={() => submitEdit()}>
                Edit
            </Button>
            &nbsp;
            <Button color="danger" type="submit" onClick={onBack}>
                Back
            </Button>
        </React.Fragment>
    );
};

export default EditReceipts;