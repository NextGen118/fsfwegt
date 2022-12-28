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

    const onSubmit = () => {
        axios
            .post(
                `${process.env.REACT_APP_BASE_URL}/invoicecharges/store?invoice_id=${invoiceselect}&description=${values.description}&unit=${values.unit}&unit_cost=${values.unit_cost}&unit_charge=${values.unit_charge}&amount=${values.amount}&currency_id=${currencyselect}&currency_id_mycurrency=${myCurrencyselect}&exchange_rate=${values.exchange_rate}&amount_in=${values.amount_in}&tax_description=${values.tax_description}&tax=${values.tax}&tax_amount=${values.tax_amount}&amount_final=${values.amount_final}&total_cost=${values.total_cost}&total_cost_in=${values.total_cost_in}&profit=${values.profit}&profit_in=${values.profit_in}`
            )

            .then((res) => {
                history.push('/invoiceCharges');
                console.log('successfully1');
            })
            .catch((error) => {
                console.log(error);
                console.log('error');
            });
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
                    <AvForm>
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
                    </AvForm>
                    <Grid md={12} sx={{ textAlign: 'right' }}>
                        <Button color="danger" type="submit" style={{ marginLeft: 15 }} onClick={onBack}>
                            Back
                        </Button>
                        <Button color="primary" type="submit" style={{ marginLeft: 15 }} onClick={onSubmit}>
                            Submit
                        </Button>
                    </Grid>
                </CardBody>
            </Card>
        </React.Fragment>
    );
});

export default AddInvoiceCharges;
