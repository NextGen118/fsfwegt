import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const AddVouchers = forwardRef((props, ref) => {
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
        getVendor();
        getBookingconfirmation();
        getBilloflanding();
    }, []);

    const [billoflanding, setBilloflanding] = useState([]);
    const [billoflandingselect, setBilloflandingselect] = useState('');
    const [bookingconfirmation, setBookingconfirmation] = useState([]);
    const [bookingconfirmationselect, setBookingconfirmationselect] = useState('');
    const [vendor, setVendor] = useState([]);
    const [vendorselect, setVendorselect] = useState('');
    const [currency, setCurrency] = useState([]);
    const [currencyselect, setCurrencyselect] = useState('');

    const getBilloflanding = () => {
        axios
            .get(`http://127.0.0.1:8000/api/billoflandings/show/all`)
            .then((res) => {
                setBilloflanding(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getBookingconfirmation = () => {
        axios
            .get(`http://127.0.0.1:8000/api/bookingconfirmations/show/all`)
            .then((res) => {
                setBookingconfirmation(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getVendor = () => {
        axios
            .get(`http://127.0.0.1:8000/api/vendors/show/all`)
            .then((res) => {
                setVendor(res.data.data);
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

    const changeBilloflanding = (event) => {
        setBilloflandingselect(event.target.value);
    };
    const changeBookingconfirmation = (event) => {
        setBookingconfirmationselect(event.target.value);
    };
    const changeVendor = (event) => {
        setVendorselect(event.target.value);
    };
    const changeCurrency = (event) => {
        setCurrencyselect(event.target.value);
    };

    const onSubmit = () => {
        axios
            .post(
                `http://127.0.0.1:8000/api/vouchers/store?date=${values.date}&voucher_no=${values.voucher_no}&description=${values.description}&booking_confirmation_id=${bookingconfirmationselect}&bill_of_landing_id=${billoflandingselect}&vendor_id=${vendorselect}&currency_id=${currencyselect}&status=${values.status}`
            )

            .then((res) => {
                history.push('/vouchers');
                console.log('successfully1');
            })
            .catch((error) => {
                console.log(error);
                console.log('error');
            });
    };

    const onBack = () => {
        history.push('/vouchers');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Vouchers', path: '/vouchers' },
                            { label: 'Add Vouchers', path: '/vouchers-add', active: true },
                        ]}
                        title={'Add Vouchers'}
                    />
                </Col>
            </Row>

            <Card>
                <CardBody>
                    <AvForm>
                        <Row>
                            <Col lg={4}>
                                <AvField name="date" label="Date" type="date" required onChange={handleChange} />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="voucher_no"
                                    label="Voucher No"
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
                                <InputLabel id="demo-simple-select-label">Bill of Landing</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={billoflandingselect}
                                    onChange={changeBilloflanding}
                                    sx={{ width: 360, height: 36, mb: 2 }}>
                                    {billoflanding.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.bill_of_landing_number}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Vendor</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={vendorselect}
                                    onChange={changeVendor}
                                    sx={{ width: 360, height: 36, mb: 2 }}>
                                    {vendor.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.vendor_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Booking Confirmation</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={bookingconfirmationselect}
                                    onChange={changeBookingconfirmation}
                                    sx={{ width: 360, height: 36, mb: 2 }}>
                                    {bookingconfirmation.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.booking_confirmation_number}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>

                            <Col lg={4}>
                                <AvField name="status" label="Status" type="text" required onChange={handleChange} />
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

export default AddVouchers;
