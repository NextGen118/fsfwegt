import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import Badge from '@mui/material/Badge';

const InvoiceChargesTable = (props) => {
    const history = useHistory();

    const [invoiceCharges, setInvoiceCharges] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);

    useEffect(() => {
        getInvoiceCharges();
    }, []);

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage;
    const indexOfFirstdata = indexOfLastdata - postPerPage;
    const currentData = invoiceCharges.slice(indexOfFirstdata, indexOfLastdata);

    //pagination part onchange
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
    };

    const getInvoiceCharges = () => {
        axios
            .get(`http://127.0.0.1:8000/api/invoicecharges/show/all`)
            .then((res) => {
                setInvoiceCharges(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const editInvoiceCharges = (id) => {
        history.push(`edit-invoiceCharges/${id}`);
    };

    return (
        <>
            <Card>
                <CardBody style={{ width: '100%', overflow: 'auto', display: 'flex' }}>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Unit</th>
                                <th>Unit Cost</th>
                                <th>Amount</th>
                                <th>Amount In</th>
                                <th>Unit Charge</th>
                                <th>Tax</th>
                                <th>Profit In</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <td>{record.unit}</td>
                                        <td>{record.unit_cost}</td>
                                        <td>{record.amount}</td>
                                        <td>{record.amount_in}</td>
                                        <td>{record.unit_charge}</td>
                                        <td>{record.tax}</td>
                                        <td>{record.profit_in}</td>

                                        <td>
                                            <Edit
                                                color="blue"
                                                size={20}
                                                onClick={() => editInvoiceCharges(record.id)}
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

const InvoiceChargesList = (props) => {
    const history = useHistory();

    const addInvoiceChargesForm = () => {
        history.push('/add-invoiceCharges');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <Row>
                        <h3 className="mb-1 mt-0">Invoice Charges</h3>
                    </Row>
                    <Row>
                        <PageTitle breadCrumbItems={[{ label: 'Invoice Charges', path: '/invoiceCharges' }]} />
                    </Row>
                </Col>

                <Col>
                    <Button color="info" className="float-right" onClick={() => addInvoiceChargesForm()}>
                        + Create Invoice Charges
                    </Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                    <InvoiceChargesTable />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default InvoiceChargesList;
