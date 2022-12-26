import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import Badge from '@mui/material/Badge';

const DetentionInvoiceSlabsTable = (props) => {
    const history = useHistory();

    const [detentionInvoiceSlabs, setDetentionInvoiceSlabs] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);
    const [postCount, setPostCount] = useState(1)

    useEffect(() => {
        getDetentionInvoiceSlabs();
    }, []);

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage;
    const indexOfFirstdata = indexOfLastdata - postPerPage;
    const currentData = detentionInvoiceSlabs.slice(indexOfFirstdata, indexOfLastdata);

    //pagination part onchange
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
    };

    const getDetentionInvoiceSlabs = () => {
        axios
            .get(`http://127.0.0.1:8000/api/detentioninvoiceslabs/show/all`)
            .then((res) => {
                setDetentionInvoiceSlabs(res.data.data);
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

    const editDetentionInvoiceSlabs = (id) => {
        history.push(`edit-detentionInvoiceSlabs/${id}`);
    };

    return (
        <>
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
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
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
            <Pagination count={postCount} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
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
