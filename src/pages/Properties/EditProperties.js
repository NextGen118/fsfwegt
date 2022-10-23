import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput, Input } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditProperties = (props) => {

    const { id } = useParams()
    const [values, setValues] = useState({ propertiesname: '', description: '' });

    const history = useHistory()

    useEffect(() => {
        getPropertiesByid()
    }, [])

    const getPropertiesByid = () => {
        axios.get(`http://127.0.0.1:8000/api/properties/show/{id}?id=${id}`)
            .then(res => {
                console.log(res.data)
                setValues({
                    propertiesname: res.data[0].property_name,
                    description: res.data[0].description
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
        axios.post(`http://127.0.0.1:8000/api/properties/store?property_name=${values.propertiesname} &description=${values.description}&id=${id}`)
            .then(res => {
                history.push('/properties')
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
                            { label: 'Properties', path: '/properties' },
                            { label: 'Edit properties', path: '/edit-properties/:id', active: true },
                        ]}
                        title={'Edit Properties'}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            <AvForm>
                                <AvField name="propertiesname" label="Propeeties Name" type="text" required onChange={handleChange} value={values.propertiesname} />
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

export default EditProperties;