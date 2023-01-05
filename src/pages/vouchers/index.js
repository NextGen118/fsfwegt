import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button, Badge } from 'reactstrap';
import axios from 'axios';
import { Delete, Edit, Trash2 } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import { Grid, TextField } from '@mui/material';

const VouchersTable = (props) => {
    const history = useHistory();

    const [vouchers, setVouchers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);
    const [postCount, setPostCount] = useState(1);

    const [values, setValues] = React.useState('');

    const handleSearchChange = (event) => {
        setValues(event.target.value);
        console.log('search', values);
    };
    useEffect(() => {
        getVouchers();
    }, [values]);

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage;
    const indexOfFirstdata = indexOfLastdata - postPerPage;
    const currentData = vouchers.slice(indexOfFirstdata, indexOfLastdata);

    //pagination part onchange
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
    };

    const getVouchers = () => {
        if (values !== '') {
            axios
                .get(`${process.env.REACT_APP_BASE_URL}/vouchers/search/query?query=${values}`)
                .then((res) => {
                    console.log(res.data);
                    setVouchers(res.data);
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
                .get(`${process.env.REACT_APP_BASE_URL}/vouchers/show/all`)
                .then((res) => {
                    console.log(res.data.data);
                    setVouchers(res.data.data);
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

    const editVouchers = (id) => {
        history.push(`edit-vouchers/${id}`);
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
                                <th>Voucher No</th>
                                <th>Description</th>
                                <th>Currency</th>
                                <th>Bill of Landing</th>
                                <th>Vendor</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{record.date}</td>
                                        <td>{record.voucher_no}</td>
                                        <td>{record.description}</td>
                                        <td>{record.currency_name}</td>
                                        <td>{record.bill_of_landing_number}</td>
                                        <td>{record.vendor_name}</td>
                                        <th>
                                            {record.status == 1 ? (
                                                <>
                                                    <Badge color="success" sx={{ ml: 3 }}>
                                                        success
                                                    </Badge>
                                                </>
                                            ) : (
                                                <Badge color="danger" sx={{ ml: 3 }}>
                                                    Inactive
                                                </Badge>
                                            )}
                                        </th>{' '}
                                        <td>
                                            <Edit color="blue" size={20} onClick={() => editVouchers(record.id)} />
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

const VouchersList = (props) => {
    const history = useHistory();

    const addVouchersForm = () => {
        history.push('/add-vouchers');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <Row>
                        <h3 className="mb-1 mt-0">Vouchers</h3>
                    </Row>
                    <Row>
                        <PageTitle breadCrumbItems={[{ label: 'Vouchers', path: '/vouchers' }]} />
                    </Row>
                </Col>

                <Col>
                    <Button color="info" className="float-right" onClick={() => addVouchersForm()}>
                        + Create Vouchers
                    </Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                    <VouchersTable />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default VouchersList;
