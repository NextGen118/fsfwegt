import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';

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
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Receipt No</th>
                                <th>description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <th scope="row">{record.id}</th>
                                        <td>{record.date}</td>
                                        <td>{record.receipt_no}</td>
                                        <td>{record.description}</td>
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
                    <PageTitle breadCrumbItems={[{ label: 'Receipts', path: '/receipts' }]} title={'Receipts'} />
                </Col>
            </Row>
            <Row>
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
