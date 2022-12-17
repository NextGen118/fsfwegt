import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const EditVouchers = (props) => {
    const { id } = useParams();
    const [values, setValues] = useState({
        date: '',
        voucher_no: '',
        description: '',
        status: '',
    });

    const history = useHistory();

    useEffect(() => {
        getCurrency();
        getVendor();
        getBookingconfirmation();
        getBilloflanding();
        getVouchersByid();
    }, [props.id]);

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

    const getVouchersByid = () => {
        axios
            .get(`http://127.0.0.1:8000/api/vouchers/show/all`)
            .then((res) => {
                const data = res.data.data.filter((ress) => ress.id === parseInt(id));
                setValues({
                    date: data[0].date,
                    voucher_no: data[0].voucher_no,
                    description: data[0].description,
                    status: data[0].status,
                });
                setBilloflandingselect(data[0].bill_of_landing_id);
                setBookingconfirmationselect(data[0].booking_confirmation_id);
                setVendorselect(data[0].vendor_id);
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

    const submitEdit = () => {
        axios
            .post(
                `http://127.0.0.1:8000/api/vouchers/store?date=${values.date}&voucher_no=${values.voucher_no}&description=${values.description}&booking_confirmation_id=${bookingconfirmationselect}&bill_of_landing_id=${values.billoflandingselect}&vendor_id=${values.vendorselect}&currency_id=${values.currencyselect}&status=${values.status}&id=${id}`
            )
            .then((res) => {
                history.push('/vouchers');
                console.log('successfully1');
            })
            .catch((error) => {
                console.log(error);
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
                            { label: 'Vouchers', path: '/receipts' },
                            { label: 'Edit Vouchers', path: '/receipts-add', active: true },
                        ]}
                        title={'Edit Vouchers'}
                    />
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
                                    name="voucher_no"
                                    label="Voucher No"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.voucher_no}
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
                                <AvField
                                    name="status"
                                    label="Status"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.status}
                                />
                            </Col>
                        </Row>
                    </AvForm>
                    <Button color="primary" type="submit" onClick={() => submitEdit()}>
                        Edit
                    </Button>
                    &nbsp;
                    <Button color="danger" type="submit" onClick={onBack}>
                        Back
                    </Button>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default EditVouchers;
