import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Table } from 'reactstrap';
import axios from 'axios';
import { Trash, Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';


const TrafficmodeTable = (props) => {
    const history = useHistory()

    const [trafficmode, setTrafficmode] = useState([])

    useEffect(() => {
        getTimemode()
    }, [])

    const getTimemode = () => {
        axios.get(`http://127.0.0.1:8000/api/trafficmodes/show/all`)
            .then(res => {
                console.log(res.data)
                setTrafficmode(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const goEdit = (id) => {
        history.push(`edit-trafficmode/${id}`)
    }

    return (
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
                        {trafficmode.map((record) => {
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