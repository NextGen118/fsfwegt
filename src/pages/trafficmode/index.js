import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Table } from 'reactstrap';
import axios from 'axios';
import { Trash, Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';


const TrafficmodeTable = (props) => {
    const history = useHistory()

    const [trafficmode, setTrafficmode] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [postCount, setPostCount] = useState(1)


    useEffect(() => {
        getTimemode()
    }, [])

    const getTimemode = () => {
        axios.get(`http://127.0.0.1:8000/api/trafficmodes/show/all`)
            .then(res => {
                console.log(res.data)
                setTrafficmode(res.data.data)
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
    }


    const goEdit = (id) => {
        history.push(`edit-trafficmode/${id}`)
    }

    const indexOfLastdata = currentPage * postPerPage
    const indexOfFirstdata = indexOfLastdata - postPerPage
    const currentData = trafficmode.slice(indexOfFirstdata, indexOfLastdata)

    const handlePaginationChange = (
        event,
        value
    ) => {
        setCurrentPage(value);
    };

    return (
        <>
            <Card>
                <CardBody>
                    <Table className="mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Trafficmode type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <th scope="row">{record.id}</th>
                                        <td>{record.trafficmode_type}</td>
                                        <td><Edit onClick={() => goEdit(record.id)} /></td>

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
}

const TrafficmodeList = (props) => {
    return (
        <React.Fragment>
            <Row className="page-title">

                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Trafficmode', path: '/trafficmode' }]}
                        title={'Traffic mode'}
                    />
                </Col>
            </Row>

            <Row>
                <Col xl={12}>
                    <TrafficmodeTable />
                </Col>
            </Row>
        </React.Fragment>
    );
}
export default TrafficmodeList;