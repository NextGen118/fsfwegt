import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Grid } from '@mui/material';
import { editInvoiceChargesApiCall, showAllInvoiceChargesApi } from '../../axios/invoiceCharges/invoiceCharges';
import SuccessMsg from '../../components/AlertMsg';

const EditInvoiceCharges = (props) => {
    const { id } = useParams();
    const [values, setValues] = useState({
        description: '',
        unit: '',
        unit_cost: '',
        status: '',
        unit_charge: '',
        amount: '',
        exchange_rate: '',
        amount_in: '',
        tax_description: '',
        tax: '',
        tax_amount: '',
        amount_final: '',
        total_cost: '',
        total_cost_in: '',
        profit: '',
        profit_in: '',
    });

    const history = useHistory();

    useEffect(() => {
        getCurrency();
        getInvoice();
        getInvoiceChargesByid();
    }, [props.id]);

    const [invoice, setInvoice] = useState([]);
    const [invoiceselect, setInvoiceselect] = useState('');
    const [currency, setCurrency] = useState([]);
    const [currencyselect, setCurrencyselect] = useState('');
    const [myCurrency, setMyCurrency] = useState([]);
    const [myCurrencyselect, setMyCurrencyselect] = useState('');

    const getInvoice = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/invoices/show/all`)
            .then((res) => {
                setInvoice(res.data.data);
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
                setMyCurrency(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const changeInvoice = (event) => {
        setInvoiceselect(event.target.value);
    };
    const changeCurrency = (event) => {
        setCurrencyselect(event.target.value);
    };
    const changeMyCurrency = (event) => {
        setMyCurrencyselect(event.target.value);
    };

    const getInvoiceChargesByid = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/invoicecharges/show/all`)
            .then((res) => {
                const data = res.data.data.filter((ress) => ress.id === parseInt(id));
                setValues({
                    description: data[0].description,
                    unit: data[0].unit,
                    unit_cost: data[0].unit_cost,
                    unit_charge: data[0].unit_charge,
                    amount: data[0].amount,
                    exchange_rate: data[0].exchange_rate,
                    amount_in: data[0].amount_in,
                    tax_description: data[0].tax_description,
                    tax: data[0].tax,
                    tax_amount: data[0].tax_amount,
                    amount_final: data[0].amount_final,
                    total_cost: data[0].total_cost,
                    total_cost_in: data[0].total_cost_in,
                    profit: data[0].profit,
                    profit_in: data[0].profit_in,
                });
                setInvoiceselect(data[0].invoice_id);
                setMyCurrencyselect(data[0].currency_id_mycurrency);
                setCurrencyselect(data[0].currency_id);
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
            !values.description ||
            !values.unit ||
            !values.unit_cost ||
            !values.unit_charge ||
            !values.amount ||
            !values.exchange_rate ||
            !values.amount_in ||
            !values.tax_description ||
            !values.tax ||
            !values.tax_amount ||
            !values.amount_final ||
            !values.total_cost ||
            !values.total_cost_in ||
            !values.profit ||
            !values.profit_in ||
            !invoiceselect ||
            !currencyselect ||
            !myCurrencyselect
        ) {
            return false;
        }

        return true;
    }

    const onEdit = (event) => {
        let invoiceChargesobj = {
            description: values.description,
            unit: values.unit,
            unit_cost: values.unit_cost,
            unit_charge: values.unit_charge,
            amount: values.amount,
            exchange_rate: values.exchange_rate,
            amount_in: values.amount_in,
            tax_description: values.tax_description,
            tax: values.tax,
            tax_amount: values.tax_amount,
            amount_final: values.amount_final,
            total_cost: values.total_cost,
            total_cost_in: values.total_cost_in,
            profit: values.profit,
            profit_in: values.profit_in,
            invoiceselect: invoiceselect,
            currencyselect: currencyselect,
            myCurrencyselect: myCurrencyselect,
            id: id,
        };
        console.log(invoiceChargesobj, 'invoiceCharges obj');
        if (isFormValidate) {
            event.preventDefault();
            const editRes = editInvoiceChargesApiCall(invoiceChargesobj).then((editRes) => {
                console.log(editRes);
                if (editRes.status === 200) {
                    showAllInvoiceChargesApi();
                    history.push('/invoiceCharges');
                    setAlertSucces(false);
                } else {
                    setAlertFaild(false);
                }
            });
        }
    };

    const onBack = () => {
        history.push('/invoiceCharges');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <Row>
                        <h3 className="mb-1 mt-0">Edit Invoice Charges</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Invoice Charges', path: '/invoiceCharges' },
                                { label: 'Edit Invoice Charges', path: '/invoiceCharges-add', active: true },
                            ]}
                        />
                    </Row>
                </Col>
            </Row>
            <Card>
                <CardBody>
                    <AvForm onSubmit={onEdit}>
                        <Row>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Invoice No</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={invoiceselect}
                                    onChange={changeInvoice}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {invoice.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.invoice_no}
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
                                    {currency.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.currency_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">My Currency</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={myCurrencyselect}
                                    onChange={changeMyCurrency}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {myCurrency.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.currency_name}
                                        </MenuItem>
                                    ))}
                                </Select>
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
                                <AvField
                                    name="unit"
                                    label="Unit"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.unit}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="unit_cost"
                                    label="Unit Cost"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.unit_cost}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="unit_charge"
                                    label="Unit Charge"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.unit_charge}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="amount"
                                    label="Amount"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.amount}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="exchange_rate"
                                    label="Exchange Rate"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.exchange_rate}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="amount_in"
                                    label="Amount In"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.amount_in}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="tax_description"
                                    label="Tax Description"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.tax_description}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="tax"
                                    label="Tax"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.tax}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="tax_amount"
                                    label="Tax Amount"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.tax_amount}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="amount_final"
                                    label="Amount Final"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.amount_final}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="total_cost"
                                    label="Total Cost"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.total_cost}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="total_cost_in"
                                    label="Total Cost In"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.total_cost_in}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="profit"
                                    label="Profit"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.profit}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="profit_in"
                                    label="Profit In"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.profit_in}
                                />
                            </Col>
                        </Row>
                        <Grid md={12} sx={{ textAlign: 'right' }}>
                            &nbsp;
                            <Button color="danger" type="submit" style={{ marginLeft: 15 }} onClick={onBack}>
                                Back
                            </Button>
                            <Button color="primary" type="submit" style={{ marginLeft: 15 }}>
                                Edit
                            </Button>
                        </Grid>
                    </AvForm>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default EditInvoiceCharges;
