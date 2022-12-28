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

const EditVoucherPayments = (props) => {
    const { id } = useParams();
    const [values, setValues] = useState({
        pay_type: '',
        cheque_no: '',
        cheque_date: '',
        current_bal: '',
        paying_amount: '',
        paying_local: '',
    });

    const history = useHistory();

    useEffect(() => {
        getVouchers();
        getVoucherPaymentsByid();
    }, [props.id]);

    const [vouchers, setVouchers] = useState([]);
    const [vouchersselect, setVouchersselect] = useState('');

    const getVouchers = () => {
        axios
            .get(`http://127.0.0.1:8000/api/vouchers/show/all`)
            .then((res) => {
                setVouchers(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const changeVouchers = (event) => {
        setVouchersselect(event.target.value);
    };

    const getVoucherPaymentsByid = () => {
        axios
            .get(`http://127.0.0.1:8000/api/voucherpayments/show/all`)
            .then((res) => {
                const data = res.data.data.filter((ress) => ress.id === parseInt(id));
                setValues({
                    pay_type: data[0].pay_type,
                    cheque_no: data[0].cheque_no,
                    cheque_date: data[0].cheque_date,
                    current_bal: data[0].current_bal,
                    paying_amount: data[0].paying_amount,
                    paying_local: data[0].paying_local,
                });
                setVouchersselect(data[0].voucher_id);
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
                `http://127.0.0.1:8000/api/voucherpayments/store?voucher_id=${vouchersselect}&pay_type=${values.pay_type}&cheque_no=${values.cheque_no}&cheque_date=${values.cheque_date}&current_bal=${values.current_bal}&paying_amount=${values.paying_amount}&paying_local=${values.paying_local}&id=${id}`
            )
            .then((res) => {
                history.push('/voucherPayments');
                console.log('successfully1');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onBack = () => {
        history.push('/voucherPayments');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <Row>
                        <h3 className="mb-1 mt-0">Edit Voucher Payments</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Voucher Payments', path: '/voucherPayments' },
                                { label: 'Edit Voucher Payments', path: '/voucherPayments-add', active: true },
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
                                <InputLabel id="demo-simple-select-label">Voucher No</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={vouchersselect}
                                    onChange={changeVouchers}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {vouchers.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.voucher_no}
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
                                    value={values.pay_type}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="cheque_no"
                                    label="Cheque No"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.cheque_no}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="cheque_date"
                                    label="Cheque Date"
                                    type="date"
                                    required
                                    onChange={handleChange}
                                    value={values.cheque_date}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="current_bal"
                                    label="Current Balance"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.current_bal}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="paying_amount"
                                    label="Paying Amount"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.paying_amount}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="paying_local"
                                    label="Paying Local"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.paying_local}
                                />
                            </Col>
                        </Row>
                    </AvForm>
                    <Grid md={12} sx={{ textAlign: 'right' }}>
                        <Button color="primary" type="submit" onClick={() => submitEdit()}>
                            Edit
                        </Button>
                        &nbsp;
                        <Button color="danger" type="submit" onClick={onBack}>
                            Back
                        </Button>
                    </Grid>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default EditVoucherPayments;
