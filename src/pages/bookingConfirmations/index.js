import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import Badge from '@mui/material/Badge';
import { Grid, TextField } from '@mui/material';

const BookingConfirmationsTable = (props) => {
    const history = useHistory();

    const [bookingConfirmations, setBookingConfirmations] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);
    const [postCount, setPostCount] = useState(1);
    const [values, setValues] = React.useState('');

    const handleSearchChange = (event) => {
        setValues(event.target.value);
        console.log('search', values);
    };

    useEffect(() => {
        getBookingConfirmations();
    }, [values]);

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage;
    const indexOfFirstdata = indexOfLastdata - postPerPage;
    const currentData = bookingConfirmations.slice(indexOfFirstdata, indexOfLastdata);

    //pagination part onchange
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
    };

    const getBookingConfirmations = () => {
        if (values !== '') {
            axios
                .get(`http://127.0.0.1:8000/api/bookingconfirmations/search/query?query=${values}`)
                .then((res) => {
                    console.log(res.data);
                    setBookingConfirmations(res.data);
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
                .get(`http://127.0.0.1:8000/api/bookingconfirmations/show/all`)
                .then((res) => {
                    console.log(res.data.data);
                    setBookingConfirmations(res.data.data);
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

    const editBookingConfirmations = (id) => {
        history.push(`edit-bookingConfirmations/${id}`);
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
                                <th>Date</th>
                                <th>Arrival Notice No</th>
                                <th>OBL No</th>
                                <th>Carrier</th>
                                <th>Client</th>
                                <th>Shipmint Type</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{record.date}</td>
                                        <td>{record.booking_confirmation_number}</td>
                                        <td>{record.place_of_delivery}</td>
                                        <td>{record.place_of_receipt}</td>
                                        <td>{record.client_name}</td>
                                        <td>{record.type_of_shipment}</td>

                                        <th>
                                            {record.status_2 == 1 ? (
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
                                                onClick={() => editBookingConfirmations(record.id)}
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

const BookingConfirmationsList = (props) => {
    const history = useHistory();

    const addBookingConfirmationsForm = () => {
        history.push('/add-bookingConfirmations');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <Row>
                        <h3 className="mb-1 mt-0">Booking Confirmations</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[{ label: 'Booking Confirmations', path: '/bookingConfirmations' }]}
                        />
                    </Row>
                </Col>
                <Col>
                    <Button color="info" className="float-right" onClick={() => addBookingConfirmationsForm()}>
                        + Create Booking Confirmations
                    </Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                    <BookingConfirmationsTable />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default BookingConfirmationsList;
