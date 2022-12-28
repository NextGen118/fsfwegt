import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import Badge from '@mui/material/Badge';
import { Grid, TextField } from '@mui/material';


const InvoiceChargesTable = (props) => {
    const history = useHistory();

    const [invoiceCharges, setInvoiceCharges] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);
    const [postCount, setPostCount] = useState(1);

    const [values, setValues] = React.useState('');

    const handleSearchChange = (event) => {
        setValues(event.target.value);
        console.log('search', values);
    };
    useEffect(() => {
        getInvoiceCharges();
    }, [values]);

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage;
    const indexOfFirstdata = indexOfLastdata - postPerPage;
    const currentData = invoiceCharges.slice(indexOfFirstdata, indexOfLastdata);

    //pagination part onchange
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
    };

    const getInvoiceCharges = () => {
        if (values !== '') {
            axios
                .get(`http://127.0.0.1:8000/api/invoicecharges/search/query?query=${values}`)
                .then((res) => {
                    console.log(res.data);
                    setInvoiceCharges(res.data);
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
                .get(`http://127.0.0.1:8000/api/invoicecharges/show/all`)
                .then((res) => {
                    console.log(res.data.data);
                    setInvoiceCharges(res.data.data);
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

    const editInvoiceCharges = (id) => {
        history.push(`edit-invoiceCharges/${id}`);
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
                            {currentData.map((record, index) => {
                                return (
                                    <tr key={index}>
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
            <Pagination count={postCount} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
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
