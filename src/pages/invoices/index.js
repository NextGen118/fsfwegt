import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';

const InvoicesTable = (props) => {
    const history = useHistory();

    const [invoices, setInvoices] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);

    useEffect(() => {
        getInvoices();
    }, []);

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage;
    const indexOfFirstdata = indexOfLastdata - postPerPage;
    const currentData = invoices.slice(indexOfFirstdata, indexOfLastdata);

    //pagination part onchange
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
    };

    const getInvoices = () => {
        axios
            .get(`http://127.0.0.1:8000/api/invoices/show/all`)
            .then((res) => {
                setInvoices(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const editInvoices = (id) => {
        history.push(`edit-invoices/${id}`);
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
                                <th>Invoice No</th>
                                <th>"OBL No</th>
                                <th>Shipment Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <th scope="row">{record.id}</th>
                                        <td>{record.date}</td>
                                        <td>{record.invoice_no}</td>
                                        <td>{record.obl_no}</td>
                                        <td>{record.shipment_type}</td>
                                        <td>
                                            <Edit color="blue" size={20} onClick={() => editInvoices(record.id)} />
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

const InvoicesList = (props) => {
    const history = useHistory();

    const addInvoicesForm = () => {
        history.push('/add-invoices');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <PageTitle breadCrumbItems={[{ label: 'Invoices', path: '/invoices' }]} title={'Invoices'} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button color="info" className="float-right" onClick={() => addInvoicesForm()}>
                        + Add Invoice
                    </Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                    <InvoicesTable />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default InvoicesList;
