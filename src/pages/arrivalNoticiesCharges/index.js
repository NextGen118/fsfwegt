import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import { Grid, TextField } from '@mui/material';

const ArrivalNoticeChargesTable = (props) => {
    const history = useHistory();

    const [arrivalNoticeCharges, setArrivalNoticeCharges] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);
    const [postCount, setPostCount] = useState(1);

    const [values, setValues] = React.useState('');

    const handleSearchChange = (event) => {
        setValues(event.target.value);
        console.log('search', values);
    };

    useEffect(() => {
        getArrivalNoticeCharges();
    }, [values]);

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage;
    const indexOfFirstdata = indexOfLastdata - postPerPage;
    const currentData = arrivalNoticeCharges.slice(indexOfFirstdata, indexOfLastdata);

    //pagination part onchange
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
    };

    const getArrivalNoticeCharges = () => {
        if (values !== '') {
            axios
                .get(`${process.env.REACT_APP_BASE_URL}/arrivalnoticecharges/search/query?query=${values}`)
                .then((res) => {
                    console.log(res.data);
                    setArrivalNoticeCharges(res.data);
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
                .get(`${process.env.REACT_APP_BASE_URL}/arrivalnoticecharges/show/all`)
                .then((res) => {
                    console.log(res.data.data);
                    setArrivalNoticeCharges(res.data.data);
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
    const editArrivalNoticeCharges = (id) => {
        history.push(`edit-arrivalNoticeCharges/${id}`);
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
                                                onClick={() => editArrivalNoticeCharges(record.id)}
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
                count={postCount}
                page={currentPage}
                onChange={handlePaginationChange}
                variant="outlined"
                style={{ float: 'right' }}
            />
        </>
    );
};

const ArrivalNoticeChargesList = (props) => {
    const history = useHistory();

    const addArrivalNoticeChargesForm = () => {
        history.push('/add-arrivalNoticeCharges');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <Row>
                        <h3 className="mb-1 mt-0">Arrival Notice Charges</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[{ label: 'Arrival Notice Charges', path: '/arrivalNoticeCharges' }]}
                        />
                    </Row>
                </Col>

                <Col>
                    <Button color="info" className="float-right" onClick={() => addArrivalNoticeChargesForm()}>
                        + Create Arrival Notice Charges
                    </Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                    <ArrivalNoticeChargesTable />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ArrivalNoticeChargesList;
