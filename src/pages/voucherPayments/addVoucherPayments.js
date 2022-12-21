import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const AddVoucherPayments = forwardRef((props, ref) => {
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
        getVouchers();
    }, []);

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

    const onSubmit = () => {
        axios
            .post(
                `http://127.0.0.1:8000/api/voucherpayments/store?voucher_id=${vouchersselect}&pay_type=${values.pay_type}&cheque_no=${values.cheque_no}&cheque_date=${values.cheque_date}&current_bal=${values.current_bal}&paying_amount=${values.paying_amount}&paying_local=${values.paying_local}`
            )

            .then((res) => {
                history.push('/voucherPayments');
                console.log('successfully1');
            })
            .catch((error) => {
                console.log(error);
                console.log('error');
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
                        <h3 className="mb-1 mt-0">Add Voucher Payments</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Voucher Payments', path: '/voucherPayments' },
                                { label: 'Add Voucher Payments', path: '/voucherPayments-add', active: true },
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
                                    sx={{ width: 360, height: 36, mb: 2 }}>
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
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="cheque_no"
                                    label="Cheque No"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="cheque_date"
                                    label="Cheque Date"
                                    type="date"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="current_bal"
                                    label="Current Balance"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="paying_amount"
                                    label="Paying Amount"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="paying_local"
                                    label="Paying Local"
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

export default AddVoucherPayments;
