import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Table } from 'reactstrap';
import axios from 'axios';
import { Trash, Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';


const TimezoneTable = (props) => {
    const history = useHistory()

    const [timexone, setTimezone] = useState([])

    useEffect(() => {
        getTimezone()
    }, [])

    const getTimezone = () => {
        axios.get(`http://127.0.0.1:8000/api/timezones/show/all`)
            .then(res => {
                console.log(res.data)
                setTimezone(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const goEdit = (id) => {
        history.push(`edit-timezone/${id}`)
    }

    return (
        <Card>
            <CardBody>
                <Table className="mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Timezone data name</th>
                            <th>Timezone data value</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timexone.map((record) => {
                            return (
                                <tr key={record.id}>
                                    <th scope="row">{record.id}</th>
                                    <td>{record.timezone_data_name}</td>
                                    <td>{record.timezone_data_value}</td>
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

const Timezonelist = (props) => {
    return (
        <React.Fragment>
            <Row className="page-title">

                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Timezone', path: '/timezone' }]}
                        title={'Timezone List'}
                    />
                </Col>
            </Row>

            <Row>
                <Col xl={12}>
                    <TimezoneTable />
                </Col>
            </Row>
        </React.Fragment>
    );
}
export default Timezonelist;