import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import { Grid, TextField } from '@mui/material';

const ArrivalNoticeContainersTable = (props) => {
    const history = useHistory();

    const [arrivalNoticeContainers, setArrivalNoticeContainers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);
    const [postCount, setPostCount] = useState(1);

    const [values, setValues] = React.useState('');

    const handleSearchChange = (event) => {
        setValues(event.target.value);
        console.log('search', values);
    };

    useEffect(() => {
        getArrivalNoticeContainers();
    }, [values]);

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage;
    const indexOfFirstdata = indexOfLastdata - postPerPage;
    const currentData = arrivalNoticeContainers.slice(indexOfFirstdata, indexOfLastdata);

    //pagination part onchange
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
    };

    const getArrivalNoticeContainers = () => {
        if (values !== '') {
            axios
                .get(`${process.env.REACT_APP_BASE_URL}/arrivalnoticecontainers/search/query?query=${values}`)
                .then((res) => {
                    console.log(res.data);
                    setArrivalNoticeContainers(res.data);
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
                .get(`${process.env.REACT_APP_BASE_URL}/arrivalnoticecontainers/show/all`)
                .then((res) => {
                    console.log(res.data.data);
                    setArrivalNoticeContainers(res.data.data);
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

    const editArrivalNoticeContainers = (id) => {
        history.push(`edit-arrivalNoticeContainers/${id}`);
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
                                <th>Marks</th>
                                <th>Seal No</th>
                                <th>Arrival Notice</th>
                                <th>Equipment</th>
                                <th>Type Of Unit</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{record.marks}</td>
                                        <td>{record.seal_no}</td>
                                        <td>{record.arrival_notice_no}</td>
                                        <td>{record.equipment_number}</td>
                                        <td>{record.type_of_unit}</td>

                                        <td>
                                            <Edit
                                                color="blue"
                                                size={20}
                                                onClick={() => editArrivalNoticeContainers(record.id)}
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
                        <PageTitle
                            breadCrumbItems={[{ label: 'Arrival Notice Containers', path: '/arrivalNoticeContainers' }]}
                        />
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
