import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import { Grid, TextField } from '@mui/material';

const DetentionInvoiceSlabsTable = (props) => {
    const history = useHistory();

    const [detentionInvoiceSlabs, setDetentionInvoiceSlabs] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);
    const [postCount, setPostCount] = useState(1);

    const [values, setValues] = React.useState('');

    const handleSearchChange = (event) => {
        setValues(event.target.value);
        console.log('search', values);
    };
    useEffect(() => {
        getDetentionInvoiceSlabs();
    }, [values]);

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage;
    const indexOfFirstdata = indexOfLastdata - postPerPage;
    const currentData = detentionInvoiceSlabs.slice(indexOfFirstdata, indexOfLastdata);

    //pagination part onchange
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
    };

    const getDetentionInvoiceSlabs = () => {
        if (values !== '') {
            axios
                .get(`${process.env.REACT_APP_BASE_URL}/detentioninvoiceslabs/search/query?query=${values}`)
                .then((res) => {
                    console.log(res.data);
                    setDetentionInvoiceSlabs(res.data);
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
                .get(`${process.env.REACT_APP_BASE_URL}/detentioninvoiceslabs/show/all`)
                .then((res) => {
                    console.log(res.data.data);
                    setDetentionInvoiceSlabs(res.data.data);
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

    const editDetentionInvoiceSlabs = (id) => {
        history.push(`edit-detentionInvoiceSlabs/${id}`);
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
                                <th>Detention Invoice Slabs</th>
                                <th>Slab No</th>
                                <th>Amount</th>

                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{record.detention_no}</td>
                                        <td>{record.slab_no}</td>
                                        <td>{record.amount}</td>
                                        <td>
                                            <Edit
                                                color="blue"
                                                size={20}
                                                onClick={() => editDetentionInvoiceSlabs(record.id)}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <Pagination
                style={{ float: 'right' }}
                count={postCount}
                page={currentPage}
                onChange={handlePaginationChange}
                variant="outlined"
            />
        </>
    );
};

const DetentionInvoiceSlabsList = (props) => {
    const history = useHistory();

    const addDetentionInvoiceSlabsForm = () => {
        history.push('/add-detentionInvoiceSlabs');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <Row>
                        <h3 className="mb-1 mt-0">Detention Invoice Slabs</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[{ label: 'Detention Invoice Slabs', path: '/detentionInvoiceSlabs' }]}
                        />
                    </Row>
                </Col>

                <Col>
                    <Button color="info" className="float-right" onClick={() => addDetentionInvoiceSlabsForm()}>
                        + Create Detention Invoice Slabs
                    </Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                    <DetentionInvoiceSlabsTable />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default DetentionInvoiceSlabsList;
