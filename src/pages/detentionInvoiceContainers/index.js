import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import Badge from '@mui/material/Badge';


const DetentionInvoiceContainersTable = (props) => {
    const history = useHistory();

    const [detentionInvoiceContainers, setDetentionInvoiceContainers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);

    useEffect(() => {
        getDetentionInvoiceContainers();
    }, []);

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage;
    const indexOfFirstdata = indexOfLastdata - postPerPage;
    const currentData = detentionInvoiceContainers.slice(indexOfFirstdata, indexOfLastdata);

    //pagination part onchange
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
    };

    const getDetentionInvoiceContainers = () => {
        axios
            .get(`http://127.0.0.1:8000/api/detentioninvoicecontainers/show/all`)
            .then((res) => {
                setDetentionInvoiceContainers(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const editDetentionInvoiceContainers = (id) => {
        history.push(`edit-detentionInvoiceContainers/${id}`);
    };

    return (
        <>
            <Card>
                <CardBody style={{ width: '100%', overflow: 'auto', display: 'flex' }}>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Marks</th>
                                <th>Seal No</th>
                                <th>Arrival Notice</th>
                                <th>Equipment</th>
                                <th>Type Of Unit</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <td>{record.marks}</td>
                                        <td>{record.seal_no}</td>
                                        <td>{record.arrival_notice_no}</td>
                                        <td>{record.equipment_number}</td>
                                        <td>{record.type_of_unit}</td>
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
                                                onClick={() => editDetentionInvoiceContainers(record.id)}
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

const DetentionInvoiceContainersList = (props) => {
    const history = useHistory();

    const addDetentionInvoiceContainersForm = () => {
        history.push('/add-detentionInvoiceContainers');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <Row>
                        <h3 className="mb-1 mt-0">Detention Invoice Containers</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Detention Invoice Containers', path: '/detentionInvoiceContainers' },
                            ]}
                        />
                    </Row>
                </Col>
                <Col>
                    <Button color="info" className="float-right" onClick={() => addDetentionInvoiceContainersForm()}>
                        + Create Detention Invoice Containers
                    </Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                    <DetentionInvoiceContainersTable />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default DetentionInvoiceContainersList;
