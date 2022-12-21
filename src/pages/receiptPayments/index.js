import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import Badge from '@mui/material/Badge';

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
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Pay Type</th>
                                <th>Cheque No</th>
                                <th>Cheque Date</th>
                                <th>Current Balance</th>
                                <th>Paying Amount</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <td>{record.pay_type}</td>
                                        <td>{record.cheque_no}</td>
                                        <td>{record.cheque_date}</td>
                                        <td>{record.current_bal}</td>
                                        <td>{record.paying_amount}</td>
                                        <th>
                                            {record.status == 1 ? (
                                                <>
                                                    <Badge
                                                        badgeContent={'Active'}
                                                        color="success"
                                                        sx={{ ml: 3 }}></Badge>
                                                </>
                                            ) : (
                                                <Badge color="error" badgeContent={'Inactive'} sx={{ ml: 3 }}></Badge>
                                            )}
                                        </th>
                                        <td>
                                            <Edit
                                                color="blue"
                                                size={20}
                                                onClick={() => editReceiptPayments(record.id)}
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

const ReceiptPaymentsList = (props) => {
    const history = useHistory();

    const addReceiptPaymentsForm = () => {
        history.push('/add-receiptPayments');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <Row>
                        <h3 className="mb-1 mt-0">Receipt Payments</h3>
                    </Row>
                    <Row>
                        <PageTitle breadCrumbItems={[{ label: 'Receipt Payments', path: '/receiptPayments' }]} />
                    </Row>
                </Col>

                <Col>
                    <Button color="info" className="float-right" onClick={() => addReceiptPaymentsForm()}>
                        + Create Receipt Payments
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