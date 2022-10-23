import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Table } from 'reactstrap';
import axios from 'axios';
import { Trash, Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';


const Propertiestable = (props) => {
    const history = useHistory()

    const [properties, setProperties] = useState([])

    useEffect(() => {
        getProperties()
    }, [])

    const getProperties = () => {
        axios.get(`http://127.0.0.1:8000/api/properties/show/all`)
            .then(res => {
                console.log(res.data)
                setProperties(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const deleteProperties = (id) => {
        axios.delete(`http://127.0.0.1:8000/properties/show/all?${id}`)
            .then(res => {
                getProperties()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const goEdit = (id) => {
        history.push(`edit-properties/${id}`)
    }

    return (
        <Card>
            <CardBody>
                <Table className="mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Property Name</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((record) => {
                            return (
                                <tr key={record.id}>
                                    <th scope="row">{record.id}</th>
                                    <td>{record.property_name}</td>
                                    <td>{record.description}</td>
                                    <td><Trash color='red' onClick={() => deleteProperties(record.id)} /><Edit onClick={() => goEdit(record.id)} /></td>

                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
}

const Propertieslist = (props) => {
    return (
        <React.Fragment>
            <Row className="page-title">

                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Properties', path: '/properties' }]}
                        title={'Properties List'}
                    />
                </Col>
            </Row>

            <Row>
                <Col xl={12}>
                    <Propertiestable />
                </Col>
            </Row>
        </React.Fragment>
    );
}
export default Propertieslist;