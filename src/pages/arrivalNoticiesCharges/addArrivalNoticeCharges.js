import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const AddArrivalNoticeCharges = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        handleOpen() {
            setOpen(true);
        },
    }));

    const [values, setValues] = useState({});
    let history = useHistory();

    const handleChange = (evt) => {
        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value,
        });
    };
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getCurrency();
        getArrivalNotice();
    }, []);

    const [arrivalNotice, setArrivalNotice] = useState([]);
    const [arrivalNoticeselect, setArrivalNoticeselect] = useState('');
    const [currency, setCurrency] = useState([]);
    const [currencyselect, setCurrencyselect] = useState('');
    const [myCurrency, setMyCurrency] = useState([]);
    const [myCurrencyselect, setMyCurrencyselect] = useState('');

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

    const getCurrency = () => {
        axios
            .get(`http://127.0.0.1:8000/api/currencies/show/all`)
            .then((res) => {
                setCurrency(res.data.data);
                setMyCurrency(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const changeArrivalNotice = (event) => {
        setArrivalNoticeselect(event.target.value);
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
                `http://127.0.0.1:8000/api/arrivalnoticecharges/store?arrival_notice_id=${arrivalNoticeselect}&description=${values.description}&unit=${values.unit}&unit_cost=${values.unit_cost}&unit_charge=${values.unit_charge}&amount=${values.amount}&currency_id=${currencyselect}&currency_id_mycurrency=${myCurrencyselect}&exchange_rate=${values.exchange_rate}&amount_in=${values.amount_in}&tax_description=${values.tax_description}&tax=${values.tax}&tax_amount=${values.tax_amount}&payed=${values.payed}&amount_final=${values.amount_final}&total_cost=${values.total_cost}&total_cost_in=${values.total_cost_in}&profit=${values.profit}&profit_in=${values.profit_in}`
            )

            .then((res) => {
                history.push('/arrivalNoticeCharges');
                console.log('successfully1');
            })
            .catch((error) => {
                console.log(error);
                console.log('error');
            });
    };

    const onBack = () => {
        history.push('/arrivalNoticeCharges');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <Row>
                        <h3 className="mb-1 mt-0">Add Arrival Noticie Charges</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Arrival Noticie Charges', path: '/arrivalNoticieCharges' },
                                {
                                    label: 'Add Arrival Noticie Charges',
                                    path: '/arrivalNoticieCharges-add',
                                    active: true,
                                },
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
                                <InputLabel id="demo-simple-select-label">Arrival Notice</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={arrivalNoticeselect}
                                    onChange={changeArrivalNotice}
                                    sx={{ width: 360, height: 36, mb: 2 }}>
                                    {arrivalNotice.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.arrival_notice_no}
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
                                    sx={{ width: 360, height: 36, mb: 2 }}>
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
                                <AvField name="payed" label="Payed" type="number" required onChange={handleChange} />
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
                    <Button color="primary" type="submit" style={{ marginLeft: 15 }} onClick={onSubmit}>
                        Submit
                    </Button>
                    <Button color="danger" type="submit" style={{ marginLeft: 15 }} onClick={onBack}>
                        Back
                    </Button>
                </CardBody>
            </Card>
        </React.Fragment>
    );
});

export default AddArrivalNoticeCharges;
