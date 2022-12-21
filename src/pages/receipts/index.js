import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import Badge from '@mui/material/Badge';

const ReceiptsTable = (props) => {
    const history = useHistory();

    const [receipts, setReceipts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);

    useEffect(() => {
        getReceipts();
    }, []);

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage;
    const indexOfFirstdata = indexOfLastdata - postPerPage;
    const currentData = receipts.slice(indexOfFirstdata, indexOfLastdata);

    //pagination part onchange
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
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

    const editReceipts = (id) => {
        history.push(`edit-receipts/${id}`);
    };

    return (
        <>
            <Card>
                <CardBody style={{ width: '100%', overflow: 'auto', display: 'flex' }}>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Receipt No</th>
                                <th>Description</th>
                                <th>Client</th>
                                <th>Invoice</th>
                                <th>Currency</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <td>{record.date}</td>
                                        <td>{record.receipt_no}</td>
                                        <td>{record.description}</td>
                                        <td>{record.client_name}</td>
                                        <td>{record.invoice_no}</td>
                                        <td>{record.currency_name}</td>

                                        <th>
                                            {record.status == 1 ? (
                                                <>
                                                    <Badge
                                                        badgeContent={'Active'}
                                                        color="success"
                                                        sx={{ ml: 5 }}></Badge>
                                                </>
                                            ) : (
                                                <Badge color="error" badgeContent={'Inactive'} sx={{ ml: 5 }}></Badge>
                                            )}
                                        </th>
                                        <td>
                                            <Edit color="blue" size={20} onClick={() => editReceipts(record.id)} />
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

const ReceiptsList = (props) => {
    const history = useHistory();

    const addReceiptsForm = () => {
        history.push('/add-receipts');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <Row>
                        <h3 className="mb-1 mt-0">Receipts</h3>
                    </Row>
                    <Row>
                        <PageTitle breadCrumbItems={[{ label: 'Receipts', path: '/receipts' }]} />
                    </Row>
                </Col>
                <Col>
                    <Button color="info" className="float-right" onClick={() => addReceiptsForm()}>
                        + Add Receipts
                    </Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                    <ReceiptsTable />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ReceiptsList;
