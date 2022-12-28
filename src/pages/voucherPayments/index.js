import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import { Grid, TextField } from '@mui/material';

const VoucherPaymentsTable = (props) => {
    const history = useHistory();

    const [voucherPayments, setVoucherPayments] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);
    const [postCount, setPostCount] = useState(1);

    const [values, setValues] = React.useState('');

    const handleSearchChange = (event) => {
        setValues(event.target.value);
        console.log('search', values);
    };
    useEffect(() => {
        getVoucherPayments();
    }, [values]);

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage;
    const indexOfFirstdata = indexOfLastdata - postPerPage;
    const currentData = voucherPayments.slice(indexOfFirstdata, indexOfLastdata);

    //pagination part onchange
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
    };

    const getVoucherPayments = () => {
        if (values !== '') {
            axios
                .get(`http://127.0.0.1:8000/api/voucherpayments/search/query?query=${values}`)
                .then((res) => {
                    console.log(res.data);
                    setVoucherPayments(res.data);
                    setPostCount(() => {
                        if (res.data.length < 8) {
                            return 1;
                        }

                        return Math.ceil(res.data.length / 8);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios
                .get(`http://127.0.0.1:8000/api/voucherpayments/show/all`)
                .then((res) => {
                    console.log(res.data.data);
                    setVoucherPayments(res.data.data);
                    setPostCount(() => {
                        if (res.data.data.length < 8) {
                            return 1;
                        }

                        return Math.ceil(res.data.data.length / 8);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const editVoucherPayments = (id) => {
        history.push(`edit-voucherPayments/${id}`);
    };

    return (
        <>
            <Card>
                <CardBody style={{ width: '100%', overflow: 'auto', display: 'grid' }}>
                    <Grid md={6} sx={{ textAlign: 'right' }}>
                        <TextField
                            id="standard-basic"
                            label="Search"
                            variant="outlined"
                            value={values}
                            onChange={handleSearchChange}
                            sx={{ width: '30%' }}
                        />
                    </Grid>
                </CardBody>
            </Card>
            <Card>
                <CardBody style={{ width: '100%', overflow: 'auto', display: 'flex' }}>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Pay Type</th>
                                <th>Cheque No</th>
                                <th>Current Balance</th>
                                <th>Paying Amount</th>
                                <th>Paying Local</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{record.pay_type}</td>
                                        <td>{record.cheque_no}</td>
                                        <td>{record.current_bal}</td>
                                        <td>{record.paying_amount}</td>
                                        <td>{record.paying_local}</td>

                                        <td>
                                            <Edit
                                                color="blue"
                                                size={20}
                                                onClick={() => editVoucherPayments(record.id)}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <Pagination count={postCount} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
        </>
    );
};

const VoucherPaymentsList = (props) => {
    const history = useHistory();

    const addVoucherPaymentsForm = () => {
        history.push('/add-voucherPayments');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <Row>
                        <h3 className="mb-1 mt-0">Vouchers Payments</h3>
                    </Row>
                    <Row>
                        <PageTitle breadCrumbItems={[{ label: 'Vouchers Payments', path: '/voucherPayments' }]} />
                    </Row>
                </Col>

                <Col>
                    <Button color="info" className="float-right" onClick={() => addVoucherPaymentsForm()}>
                        + Create Voucher Payments
                    </Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                    <VoucherPaymentsTable />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default VoucherPaymentsList;
