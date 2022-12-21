import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';

const ArrivalNoticeContainersTable = (props) => {
    const history = useHistory();

    const [arrivalNoticeContainers, setArrivalNoticeContainers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);

    useEffect(() => {
        getArrivalNoticeContainers();
    }, []);

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage;
    const indexOfFirstdata = indexOfLastdata - postPerPage;
    const currentData = arrivalNoticeContainers.slice(indexOfFirstdata, indexOfLastdata);

    //pagination part onchange
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
    };

    const getArrivalNoticeContainers = () => {
        axios
            .get(`http://127.0.0.1:8000/api/arrivalnoticecontainers/show/all`)
            .then((res) => {
                setArrivalNoticeContainers(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const editArrivalNoticeContainers = (id) => {
        history.push(`edit-arrivalNoticeContainers/${id}`);
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
                                        
                                        <td>
                                            <Edit color="blue" size={20} onClick={() => editArrivalNoticeContainers(record.id)} />
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

const ArrivalNoticeContainersList = (props) => {
    const history = useHistory();

    const addArrivalNoticeContainersForm = () => {
        history.push('/add-arrivalNoticeContainers');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                <Row>
                        <h3 className="mb-1 mt-0">Arrival Notice Containers</h3>
                    </Row>
                    <Row>
                        <PageTitle breadCrumbItems={[{ label: 'Arrival Notice Containers', path: '/arrivalNoticeContainers' }]} />
                    </Row>
                </Col>
                <Col>
                    <Button color="info" className="float-right" onClick={() => addArrivalNoticeContainersForm()}>
                        + Create Arrival Notice Containers
                    </Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                    <ArrivalNoticeContainersTable />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ArrivalNoticeContainersList;
