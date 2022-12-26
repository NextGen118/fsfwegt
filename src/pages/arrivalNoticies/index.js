import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import Badge from '@mui/material/Badge';

const ArrivalNoticiesTable = (props) => {
    const history = useHistory();

    const [arrivalNoticies, setArrivalNoticies] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);
    const [postCount, setPostCount] = useState(1)

    useEffect(() => {
        getArrivalNoticies();
    }, []);

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage;
    const indexOfFirstdata = indexOfLastdata - postPerPage;
    const currentData = arrivalNoticies.slice(indexOfFirstdata, indexOfLastdata);

    //pagination part onchange
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
    };

    const getArrivalNoticies = () => {
        axios
            .get(`http://127.0.0.1:8000/api/arivalnotices/show/all`)
            .then((res) => {
                setArrivalNoticies(res.data.data);
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

    const editArrivalNoticies = (id) => {
        history.push(`edit-arrivalNoticies/${id}`);
    };

    return (
        <>
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
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <td>{record.date}</td>
                                        <td>{record.arrival_notice_no}</td>
                                        <td>{record.obl_no}</td>
                                        <td>{record.carrier}</td>
                                        <td>{record.client_name}</td>
                                        <td>{record.shipment_type}</td>

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
                                                onClick={() => editArrivalNoticies(record.id)}
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

const ArrivalNoticiesList = (props) => {
    const history = useHistory();

    const addArrivalNoticiesForm = () => {
        history.push('/add-arrivalNoticies');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <Row>
                        <h3 className="mb-1 mt-0">Arrival Noticies</h3>
                    </Row>
                    <Row>
                        <PageTitle breadCrumbItems={[{ label: 'Arrival Noticies', path: '/arrivalNoticies' }]} />
                    </Row>
                </Col>
                <Col>
                    <Button color="info" className="float-right" onClick={() => addArrivalNoticiesForm()}>
                        + Create Arrival Noticies
                    </Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                    <ArrivalNoticiesTable />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ArrivalNoticiesList;
