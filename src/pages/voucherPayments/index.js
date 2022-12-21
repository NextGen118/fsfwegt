import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';

const VoucherPaymentsTable = (props) => {
    const history = useHistory();

    const [voucherPayments, setVoucherPayments] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);

    useEffect(() => {
        getVoucherPayments();
    }, []);

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage;
    const indexOfFirstdata = indexOfLastdata - postPerPage;
    const currentData = voucherPayments.slice(indexOfFirstdata, indexOfLastdata);

    //pagination part onchange
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
    };

    const getVoucherPayments = () => {
        axios
            .get(`http://127.0.0.1:8000/api/voucherpayments/show/all`)
            .then((res) => {
                setVoucherPayments(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const editVoucherPayments = (id) => {
        history.push(`edit-voucherPayments/${id}`);
    };

    return (
        <>
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
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
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
            <Pagination count={postPerPage} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
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
