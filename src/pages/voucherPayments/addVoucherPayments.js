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
import { createVoucherPaymentsApiCall, showAllVoucherPaymentsApi } from '../../axios/voucherPayments/voucherPayments';
import SuccessMsg from '../../components/AlertMsg';

const AddVoucherPayments = forwardRef((props, ref) => {
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
        getVouchers();
    }, []);

    const [vouchers, setVouchers] = useState([]);
    const [vouchersselect, setVouchersselect] = useState('');

    const getVouchers = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/vouchers/show/all`)
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
            !values.pay_type ||
            !values.cheque_no ||
            !values.cheque_date ||
            !values.current_bal ||
            !values.paying_amount ||
            !values.paying_local ||
            !vouchersselect
        ) {
            return false;
        }

        return true;
    }

    const onAdd = (event) => {
        let voucherPaymentsobj = {
            pay_type: values.pay_type,
            cheque_no: values.cheque_no,
            cheque_date: values.cheque_date,
            current_bal: values.current_bal,
            paying_amount: values.paying_amount,
            paying_local: values.paying_local,
            vouchersselect: vouchersselect,
        };
        console.log(voucherPaymentsobj, 'voucherPayments obj');
        if (isFormValidate) {
            event.preventDefault();
            const createRes = createVoucherPaymentsApiCall(voucherPaymentsobj).then((createRes) => {
                console.log(createRes);
                if (createRes.status === 200) {
                    showAllVoucherPaymentsApi();
                    history.push('/voucherPayments');
                    setAlertSucces(false);
                } else {
                    setAlertFaild(false);
                }
            });
        }
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
                    <AvForm onSubmit={onAdd}>
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

export default AddVoucherPayments;
