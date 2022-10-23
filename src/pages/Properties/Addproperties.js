import React, { useState } from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput, Input } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const Addproperties = (props) => {

    const [values, setValues] = useState({});
    let history = useHistory()

    const handleChange = (evt) => {

        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value
        });
    }

    const onSubmit = () => {
        axios.post(`http://127.0.0.1:8000/api/properties/store?property_name=${values.propertiesname}&description=${values.description}`)
            .then(res => {
                console.log("successfully")
                history.push('/properties')

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
                            { label: 'Add properties', path: '/add-properties', active: true },
                        ]}
                        title={'Add Properties'}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>

                            <AvForm>
                                <AvField name="propertiesname" label="Propeeties Name" type="text" required onChange={handleChange} />
                                <AvField name="description" label="Description" type="text" required onChange={handleChange} />

                                <Button color="primary" type="submit" onClick={onSubmit}>
                                    Submit
                                </Button>
                            </AvForm>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment >
    );
}

export default Addproperties;