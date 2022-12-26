import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Delete, Edit, Trash2 } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import Badge from '@mui/material/Badge';

const VouchersTable = (props) => {
    const history = useHistory();

    const [vouchers, setVouchers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);
    const [postCount, setPostCount] = useState(1)

    useEffect(() => {
        getVouchers();
    }, []);

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage;
    const indexOfFirstdata = indexOfLastdata - postPerPage;
    const currentData = vouchers.slice(indexOfFirstdata, indexOfLastdata);

    //pagination part onchange
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
    };

    const getVouchers = () => {
        axios
            .get(`http://127.0.0.1:8000/api/vouchers/show/all`)
            .then((res) => {
                setVouchers(res.data.data);
                setPostCount(() => {
                    if (res.data.data.length < 8) {
                        return 1
                    }

                    return Math.ceil(res.data.data.length / 8)
                })
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const editVouchers = (id) => {
        history.push(`edit-vouchers/${id}`);
    };

    return (
        <>
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
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <td>{record.date}</td>
                                        <td>{record.voucher_no}</td>
                                        <td>{record.description}</td>
                                        <td>{record.currency_name}</td>
                                        <td>{record.bill_of_landing_number}</td>
                                        <td>{record.vendor_name}</td>
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
            <Pagination count={postCount} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
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
