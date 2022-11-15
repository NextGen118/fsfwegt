import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditRoles = (props) => {

    const { id } = useParams()
    const [values, setValues] = useState({ rolename: '', description: '' });

    const history = useHistory()

    useEffect(() => {
        getRoleByid()
    }, [])

    const getRoleByid = () => {
        axios.get(`http://127.0.0.1:8000/api/roles/show/all`)
            .then(res => {
                console.log(res.data)
                const data = res.data.filter(ress => ress.id === parseInt(id))
                console.log(data, 'edit data')
                setValues({
                    rolename: data[0].role_name,
                    description: data[0].description
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleChange = (evt) => {

        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value
        });
    }

    const submitEdit = () => {
        axios.post(`http://127.0.0.1:8000/api/roles/store?role_name=${values.rolename} &description=${values.description}&id=${id}`)
            .then(res => {
                history.push('/roles')
                console.log("success to edit")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Roles', path: '/roles' },
                            { label: 'Edit Role', path: '/edit-roles/:id', active: true },
                        ]}
                        title={'Edit Role'}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            <AvForm>
                                <AvField name="rolename" label="Role Name" type="text" required onChange={handleChange} value={values.rolename} />
                                <AvField name="description" label="Description" type="text" required onChange={handleChange} value={values.description} />

                                <Button color="primary" type="submit" onClick={() => submitEdit()}>
                                    Edit
                                </Button>
                            </AvForm>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment >
    );
}

export default EditRoles;