import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';

const VouchersTable = (props) => {
    const history = useHistory();

    const [vouchers, setVouchers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);

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
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Voucher No</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <th scope="row">{record.id}</th>
                                        <td>{record.date}</td>
                                        <td>{record.voucher_no}</td>
                                        <td>{record.description}</td>
                                        <td>{record.status}</td>
                                        <td>
                                            <Edit onClick={() => editVouchers(record.id)} />
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

const VouchersList = (props) => {
    const history = useHistory();

    const addVouchersForm = () => {
        history.push('/add-vouchers');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <PageTitle breadCrumbItems={[{ label: 'Vouchers', path: '/vouchers' }]} title={'Vouchers'} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button color="info" className="float-right" onClick={() => addVouchersForm()}>
                        Add
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
