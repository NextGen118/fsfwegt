import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';

const ReceiptPaymentsTable = (props) => {
    const history = useHistory();

    const [receiptPayments, setReceiptPayments] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);

    useEffect(() => {
        getReceiptPayments();
    }, []);

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage;
    const indexOfFirstdata = indexOfLastdata - postPerPage;
    const currentData = receiptPayments.slice(indexOfFirstdata, indexOfLastdata);

    //pagination part onchange
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
    };

    const getReceiptPayments = () => {
        axios
            .get(`http://127.0.0.1:8000/api/receiptpayments/show/all`)
            .then((res) => {
                setReceiptPayments(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const editReceiptPayments = (id) => {
        history.push(`edit-receiptPayments/${id}`);
    };

    return (
        <>
            <Card>
                <CardBody style={{ width: '100%', overflow: 'auto', display: 'flex' }}>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Pay Type</th>
                                <th>Cheque No</th>
                                <th>Cheque Date</th>
                                <th>Current Balance</th>
                                <th>Paying Amount</th>

                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <th scope="row">{record.id}</th>
                                        <td>{record.pay_type}</td>
                                        <td>{record.cheque_no}</td>
                                        <td>{record.cheque_date}</td>
                                        <td>{record.current_bal}</td>
                                        <td>{record.paying_amount}</td>

                                        <td>
                                            <Edit onClick={() => editReceiptPayments(record.id)} />
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

const ReceiptPaymentsList = (props) => {
    const history = useHistory();

    const addReceiptPaymentsForm = () => {
        history.push('/add-receiptPayments');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Receipt Payments', path: '/receiptPayments' }]}
                        title={'Receipt Payments'}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button color="info" className="float-right" onClick={() => addReceiptPaymentsForm()}>
                        + Add Receipt Payments
                    </Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                    <ReceiptPaymentsTable />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ReceiptPaymentsList;
