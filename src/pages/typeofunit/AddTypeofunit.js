import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput, Input } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const AddTypeofunit = (props) => {

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
        axios.post(`http://127.0.0.1:8000/api/typeofunits/store?type_of_unit=${values.type_of_unit}`)
            .then(res => {
                console.log("successfully")
                history.push('/typeofunit')

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
                            { label: 'Typeofunit', path: '/typeofunit' },
                            { label: 'Add Typeofunit', path: '/add-typeofunit', active: true },
                        ]}
                        title={'Add Typeofunit'}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>

                            <AvForm>
                                <AvField name="type_of_unit" label="Type of unit" type="text" required onChange={handleChange} />


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

export default AddTypeofunit;