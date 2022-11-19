import React, { useEffect, useState, useRef } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Trash, Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import Addproperties from './Addproperties';
import EditProperties from './EditProperties';


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

    const [id, seiId] = useState('')
    const updateRef = useRef();
    const handleUpdateForm = (event, id) => {
        seiId(id)
        event.preventDefault();
        console.log('check');
        if (updateRef.current !== undefined) {
            updateRef.current.handleOpen();
        }
    };

    return (
        <>
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
                                        <td>  {/*<Trash color='red' onClick={() => deleteProperties(record.id)} />*/}<Edit style={{ cursor: 'pointer' }} onClick={(e) => handleUpdateForm(e, record.id)} /></td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <EditProperties ref={updateRef} id={id} refresh={getProperties} />
        </>
    );
}

const Propertieslist = (props) => {

    const childref = useRef();
    const handleAddUserForm = (event) => {
        event.preventDefault();
        console.log('check');
        if (childref.current !== undefined) {
            childref.current.handleOpen();
        }
    };

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
            <Col md={12}>
                <Button onClick={(e) => handleAddUserForm(e)}>Add</Button>
            </Col>
            <Row>
                <Col xl={12}>
                    <Propertiestable />
                </Col>
            </Row>

            <Addproperties ref={childref} />
        </React.Fragment>
    );
}
export default Propertieslist;