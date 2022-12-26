import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import Badge from '@mui/material/Badge';

const DetentionTraffiesTable = (props) => {
    const history = useHistory();

    const [detentionTraffies, setDetentionTraffies] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);
    const [postCount, setPostCount] = useState(1)

    useEffect(() => {
        getDetentionTraffies();
    }, []);

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage;
    const indexOfFirstdata = indexOfLastdata - postPerPage;
    const currentData = detentionTraffies.slice(indexOfFirstdata, indexOfLastdata);

    //pagination part onchange
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
    };

    const getDetentionTraffies = () => {
        axios
            .get(`http://127.0.0.1:8000/api/detentiontraffies/show/all`)
            .then((res) => {
                setDetentionTraffies(res.data.data);
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

    const editDetentionTraffies = (id) => {
        history.push(`edit-detentionTraffies/${id}`);
    };

    return (
        <>
            <Card>
                <CardBody style={{ width: '100%', overflow: 'auto', display: 'flex' }}>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Client Agent</th>
                                <th>Free Days</th>
                                <th>Comm</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <td>{record.client_name}</td>
                                        <td>{record.free_days}</td>
                                        <td>{record.comm}</td>

                                        <td>
                                            <Edit color="blue" size={20} onClick={() => editDetentionTraffies(record.id)} />
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

const DetentionTraffiesList = (props) => {
    const history = useHistory();

    const addDetentionTraffiesForm = () => {
        history.push('/add-detentionTraffies');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <Row>
                        <h3 className="mb-1 mt-0">Detention Traffies</h3>
                    </Row>
                    <Row>
                        <PageTitle breadCrumbItems={[{ label: 'Detention Traffies', path: '/detentionTraffies' }]} />
                    </Row>
                </Col>
                <Col>
                    <Button color="info" className="float-right" onClick={() => addDetentionTraffiesForm()}>
                        + Add Detention Traffies
                    </Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                    <DetentionTraffiesTable />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default DetentionTraffiesList;
