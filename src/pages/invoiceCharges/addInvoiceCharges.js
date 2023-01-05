import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Grid } from '@mui/material';
import { createInvoiceChargesApiCall, showAllInvoiceChargesApi } from '../../axios/invoiceCharges/invoiceCharges';
import SuccessMsg from '../../components/AlertMsg';

const AddInvoiceCharges = forwardRef((props, ref) => {
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
        getCurrency();
        getInvoice();
    }, []);

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
                setInvoiceselect(res.data.data[0]?.id);
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
                setCurrencyselect(res.data.data[0]?.id);

                setMyCurrency(res.data.data);
                setMyCurrencyselect(res.data.data[0]?.id);
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

    const onAdd = (event) => {
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
        };
        console.log(invoiceChargesobj, 'invoiceCharges obj');
        if (isFormValidate) {
            event.preventDefault();
            const createRes = createInvoiceChargesApiCall(invoiceChargesobj).then((createRes) => {
                console.log(createRes);
                if (createRes.status === 200) {
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
                        <h3 className="mb-1 mt-0">Add Invoice Charges</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Invoice Charges', path: '/invoiceCharges' },
                                { label: 'Add Invoice Charges', path: '/invoiceCharges-add', active: true },
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
                                <AvField
                                    type="select"
                                    value={invoiceselect}
                                    required
                                    onChange={changeInvoice}
                                    label="Invoice No *"
                                    name="selectinvoice">
                                    {invoice.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.invoice_no}
                                        </option>
                                    ))}
                                </AvField>
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    type="select"
                                    value={currencyselect}
                                    required
                                    onChange={changeCurrency}
                                    label="Currency *"
                                    name="selectcurrency">
                                    {currency.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.currency_name}
                                        </option>
                                    ))}
                                </AvField>
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    type="select"
                                    value={myCurrencyselect}
                                    required
                                    onChange={changeMyCurrency}
                                    label="My Currency *"
                                    name="selectmyCurrency">
                                    {myCurrency.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.currency_name}
                                        </option>
                                    ))}
                                </AvField>
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
                                <AvField name="unit" label="Unit" type="number" required onChange={handleChange} />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="unit_cost"
                                    label="Unit Cost"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="unit_charge"
                                    label="Unit Charge"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField name="amount" label="Amount" type="number" required onChange={handleChange} />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="exchange_rate"
                                    label="Exchange Rate"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="amount_in"
                                    label="Amount In"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="tax_description"
                                    label="Tax Description"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField name="tax" label="Tax" type="text" required onChange={handleChange} />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="tax_amount"
                                    label="Tax Amount"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="amount_final"
                                    label="Amount Final"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="total_cost"
                                    label="Total Cost"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="total_cost_in"
                                    label="Total Cost In"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField name="profit" label="Profit" type="number" required onChange={handleChange} />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="profit_in"
                                    label="Profit In"
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

export default AddInvoiceCharges;
