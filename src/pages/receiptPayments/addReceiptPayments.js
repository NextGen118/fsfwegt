import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const AddReceiptPayments = forwardRef((props, ref) => {
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
        getReceipts();
    }, []);

    const [receipts, setReceipts] = useState([]);
    const [receiptsselect, setReceiptsselect] = useState('');
    const [activeselect, setActiveselect] = useState('');
    const changeActive = (event) => {
        setActiveselect(event.target.value);
    };
    const getReceipts = () => {
        axios
            .get(`http://127.0.0.1:8000/api/receipts/show/all`)
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

    const onSubmit = () => {
        axios
            .post(
                `http://127.0.0.1:8000/api/receiptpayments/store?receipt_id=${receiptsselect}&pay_type=${values.pay_type}&cheque_no=${values.cheque_no}&cheque_date=${values.cheque_date}&current_bal=${values.current_bal}&paying_amount=${values.paying_amount}&paying_local=${values.paying_local}&status=${activeselect}`
            )

            .then((res) => {
                history.push('/receiptPayments');
                console.log('successfully1');
            })
            .catch((error) => {
                console.log(error);
                console.log('error');
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
                        <h3 className="mb-1 mt-0">Add Receipts Payments</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Receipts Payments', path: '/receiptPayments' },
                                { label: 'Add Receipts Payments', path: '/receiptPayments-add', active: true },
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
                                    sx={{ width: 360, height: 36, mb: 2 }}>
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
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="paying_amount"
                                    label="Paying Ammount"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="paying_local"
                                    label="Paying Local"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={activeselect}
                                    onChange={changeActive}
                                    sx={{ width: 360, height: 36, mb: 2 }}>
                                    <MenuItem value={1}>Active</MenuItem>
                                    <MenuItem value={0}>Inactive</MenuItem>
                                </Select>
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

export default AddReceiptPayments;
