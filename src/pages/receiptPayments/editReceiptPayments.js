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

const EditReceiptPayments = (props) => {
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
        getReceipts();
        getReceiptPaymentsByid();
    }, [props.id]);

    const [receipts, setReceipts] = useState([]);
    const [receiptsselect, setReceiptsselect] = useState('');
    const [activeselect, setActiveselect] = useState('');
    const changeActive = (event) => {
        setActiveselect(event.target.value);
    };
    const getReceipts = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/receipts/show/all`)
            .then((res) => {
                setReceipts(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const changeReceipts = (event) => {
        setReceiptsselect(event.target.value);
        console.log(event.target.value, ' select');
    };

    const getReceiptPaymentsByid = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/receiptpayments/show/all`)
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
                setReceiptsselect(data[0].receipt_id);
                setActiveselect(data[0].status);
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
                `${process.env.REACT_APP_BASE_URL}/receiptpayments/store?receipt_id=${receiptsselect}&pay_type=${values.pay_type}&cheque_no=${values.cheque_no}&cheque_date=${values.cheque_date}&current_bal=${values.current_bal}&paying_amount=${values.paying_amount}&paying_local=${values.paying_local}&status=${activeselect}&id=${id}`
            )
            .then((res) => {
                history.push('/receiptPayments');
                console.log('successfully1');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onBack = () => {
        history.push('/receiptPayments');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <Row>
                        <h3 className="mb-1 mt-0">Edit Receipts Payments</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Receipt Payments', path: '/receiptPayments' },
                                { label: 'Edit Receipts Payments', path: '/receiptPayments-add', active: true },
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
                                <InputLabel id="demo-simple-select-label">Receipt</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={receiptsselect}
                                    onChange={changeReceipts}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {receipts.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.receipt_no}
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
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.current_bal}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="paying_amount"
                                    label="Paying Ammount"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.paying_amount}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="paying_local"
                                    label="Paying Local"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.paying_local}
                                />
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={activeselect}
                                    onChange={changeActive}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    <MenuItem value={1}>Active</MenuItem>
                                    <MenuItem value={0}>Inactive</MenuItem>
                                </Select>
                            </Col>
                        </Row>
                    </AvForm>
                    <Grid md={12} sx={{ textAlign: 'right' }}>
                        <Button color="danger" style={{ marginLeft: 15 }} type="submit" onClick={onBack}>
                            Back
                        </Button>
                        <Button color="primary" style={{ marginLeft: 15 }} type="submit" onClick={() => submitEdit()}>
                            Edit
                        </Button>
                    </Grid>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default EditReceiptPayments;
