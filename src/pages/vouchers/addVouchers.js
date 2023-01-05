import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { createVouchersApiCall, showAllVouchersApi } from '../../axios/vouchers/vouchers';
import SuccessMsg from '../../components/AlertMsg';
import { Grid } from '@mui/material';

const AddVouchers = forwardRef((props, ref) => {
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
    const [activeselect, setActiveselect] = useState('');
    const changeActive = (event) => {
        setActiveselect(event.target.value);
    };
    const getBilloflanding = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/billoflandings/show/all`)
            .then((res) => {
                setBilloflanding(res.data.data);
                setBilloflandingselect(res.data.data[0]?.id);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getBookingconfirmation = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/bookingconfirmations/show/all`)
            .then((res) => {
                setBookingconfirmation(res.data.data);
                setBookingconfirmationselect(res.data.data[0]?.id);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getVendor = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/vendors/show/all`)
            .then((res) => {
                setVendor(res.data.data);
                setVendorselect(res.data.data[0]?.id);
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
            !values.voucher_no ||
            !values.description ||
            !billoflandingselect ||
            !bookingconfirmationselect ||
            !vendorselect ||
            !currencyselect ||
            !activeselect
        ) {
            return false;
        }

        return true;
    }

    const onAdd = (event) => {
        let vouchersobj = {
            date: values.date,
            voucher_no: values.voucher_no,
            description: values.description,
            billoflandingselect: billoflandingselect,
            bookingconfirmationselect: bookingconfirmationselect,
            currencyselect: currencyselect,
            vendorselect: vendorselect,
            activeselect: 1,
        };
        console.log(vouchersobj, 'vouchers obj');
        if (isFormValidate) {
            event.preventDefault();
            const createRes = createVouchersApiCall(vouchersobj).then((createRes) => {
                console.log(createRes);
                if (createRes.status === 200) {
                    showAllVouchersApi();
                    history.push('/vouchers');
                    setAlertSucces(false);
                } else {
                    setAlertFaild(false);
                }
            });
        }
    };

    const onBack = () => {
        history.push('/vouchers');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <Row>
                        <h3 className="mb-1 mt-0">Add Vouchers</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Vouchers', path: '/vouchers' },
                                { label: 'Add Vouchers', path: '/vouchers-add', active: true },
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
                                    value={billoflandingselect}
                                    required
                                    onChange={changeBilloflanding}
                                    label="Bill of Landing *"
                                    name="selectbilloflanding">
                                    {billoflanding.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.bill_of_landing_number}
                                        </option>
                                    ))}
                                </AvField>
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    type="select"
                                    value={vendorselect}
                                    required
                                    onChange={changeVendor}
                                    label="Vendor *"
                                    name="selectVendor">
                                    {vendor.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.vendor_name}
                                        </option>
                                    ))}
                                </AvField>
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    type="select"
                                    value={bookingconfirmationselect}
                                    required
                                    onChange={changeBookingconfirmation}
                                    label="Booking Confimation"
                                    name="selectBookingConfirmation">
                                    {bookingconfirmation.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.booking_confirmation_number}
                                        </option>
                                    ))}
                                </AvField>
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

export default AddVouchers;
