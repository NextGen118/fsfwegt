import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import Badge from '@mui/material/Badge';

const DetentionTraffSubsTable = (props) => {
    const history = useHistory();

    const [detentionTraffSubs, setDetentionTraffSubs] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);

    useEffect(() => {
        getDetentionTraffSubs();
    }, []);

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage;
    const indexOfFirstdata = indexOfLastdata - postPerPage;
    const currentData = detentionTraffSubs.slice(indexOfFirstdata, indexOfLastdata);

    //pagination part onchange
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
    };

    const getDetentionTraffSubs = () => {
        axios
            .get(`http://127.0.0.1:8000/api/detentiontraffsubs/show/all`)
            .then((res) => {
                setDetentionTraffSubs(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const editDetentionTraffSubs = (id) => {
        history.push(`edit-detentionTraffSubs/${id}`);
    };

    return (
        <>
            <Card>
                <CardBody style={{ width: '100%', overflow: 'auto', display: 'flex' }}>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Traiff Name</th>
                                <th>SLAB Days</th>
                                <th>SLAB Rate</th>
                                <th>Detention Traff</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <td>{record.tariff_name}</td>
                                        <td>{record.slab_days}</td>
                                        <td>{record.slab_rate}</td>
                                        <td>{record.id}</td>
                                        
                                        <td>
                                            <Edit color="blue" size={20} onClick={() => editDetentionTraffSubs(record.id)} />
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

const DetentionTraffSubsList = (props) => {
    const history = useHistory();

    const addDetentionTraffSubsForm = () => {
        history.push('/add-detentionTraffSubs');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <Row>
                        <h3 className="mb-1 mt-0">Detention Traff Subs</h3>
                    </Row>
                    <Row>
                        <PageTitle breadCrumbItems={[{ label: 'Detention Traff Subs', path: '/detentionTraffSubs' }]} />
                    </Row>
                </Col>
                <Col>
                    <Button color="info" className="float-right" onClick={() => addDetentionTraffSubsForm()}>
                        + Add Detention Traff Subs
                    </Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                    <DetentionTraffSubsTable />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default DetentionTraffSubsList;
