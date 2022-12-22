import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import Badge from '@mui/material/Badge';

const DetentionInvoicesTable = (props) => {
    const history = useHistory();

    const [detentionInvoices, setDetentionInvoices] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);

    useEffect(() => {
        getDetentionInvoices();
    }, []);

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage;
    const indexOfFirstdata = indexOfLastdata - postPerPage;
    const currentData = detentionInvoices.slice(indexOfFirstdata, indexOfLastdata);

    //pagination part onchange
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
    };

    const getDetentionInvoices = () => {
        axios
            .get(`http://127.0.0.1:8000/api/detentioninvoice/show/all`)
            .then((res) => {
                setDetentionInvoices(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const editDetentionInvoices = (id) => {
        history.push(`edit-detentionInvoices/${id}`);
    };

    return (
        <>
            <Card>
                <CardBody style={{ width: '100%', overflow: 'auto', display: 'flex' }}>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Detention No</th>
                                <th>OBL No</th>
                                <th>Discount Type</th>
                                <th>Previous Bill</th>
                                <th>nos_units</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <td>{record.date}</td>
                                        <td>{record.detention_no}</td>
                                        <td>{record.obl_no}</td>
                                        <td>{record.discount_type}</td>
                                        <td>{record.previous_bill}</td>
                                        <td>{record.nos_units}</td>
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
                                        </th>
                                        <td>
                                            <Edit
                                                color="blue"
                                                size={20}
                                                onClick={() => editDetentionInvoices(record.id)}
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

const DetentionInvoicesList = (props) => {
    const history = useHistory();

    const addDetentionInvoicesForm = () => {
        history.push('/add-detentionInvoices');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <Row>
                        <h3 className="mb-1 mt-0">Detention Invoices</h3>
                    </Row>
                    <Row>
                        <PageTitle breadCrumbItems={[{ label: 'Detention Invoices', path: '/detentionInvoices' }]} />
                    </Row>
                </Col>
                <Col>
                    <Button color="info" className="float-right" onClick={() => addDetentionInvoicesForm()}>
                        + Create Detention Invoice
                    </Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                    <DetentionInvoicesTable />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default DetentionInvoicesList;
