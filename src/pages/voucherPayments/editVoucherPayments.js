import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Grid } from '@mui/material';
import { editVoucherPaymentsApiCall, showAllVoucherPaymentsApi } from '../../axios/voucherPayments/voucherPayments';
import SuccessMsg from '../../components/AlertMsg';

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
            .get(`${process.env.REACT_APP_BASE_URL}/vouchers/show/all`)
            .then((res) => {
                setVouchers(res.data.data);
                setVouchersselect(res.data.data[0]?.id);
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
            .get(`${process.env.REACT_APP_BASE_URL}/voucherpayments/show/all`)
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

    const onEdit = (event) => {
        let voucherPaymentsobj = {
            pay_type: values.pay_type,
            cheque_no: values.cheque_no,
            cheque_date: values.cheque_date,
            current_bal: values.current_bal,
            paying_amount: values.paying_amount,
            paying_local: values.paying_local,
            vouchersselect: vouchersselect,
            id: id,
        };
        console.log(voucherPaymentsobj, 'voucherPayments obj');
        if (isFormValidate) {
            event.preventDefault();
            const editRes = editVoucherPaymentsApiCall(voucherPaymentsobj).then((editRes) => {
                console.log(editRes);
                if (editRes.status === 200) {
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
                    <AvForm onSubmit={onEdit}>
                        <Row>
                            <Col lg={4}>
                                <AvField
                                    type="select"
                                    value={vouchersselect}
                                    required
                                    onChange={changeVouchers}
                                    label="Voucher No *"
                                    name="selectvouchers">
                                    {vouchers.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.voucher_no}
                                        </option>
                                    ))}
                                </AvField>
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
                        <Grid md={12} sx={{ textAlign: 'right' }}>
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

export default EditVoucherPayments;
