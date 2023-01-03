import React, { useState } from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput, Input } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const AddTimezone = (props) => {

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
        axios.post(`${process.env.REACT_APP_BASE_URL}/timezones/store?timezone_data_name=${values.timezonedataname}&timezone_data_value=${values.timezonedatavalue}`)
            .then(res => {
                console.log("successfully")
                history.push('/timezone')

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
                            { label: 'Timezone', path: '/timezone' },
                            { label: 'Add timezone', path: '/add-timezone', active: true },
                        ]}
                        title={'Add Timezone'}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>

                            <AvForm>
                                <AvField name="timezonedataname" label="Timezone data name" type="text" required onChange={handleChange} />
                                <AvField name="timezonedatavalue" label="Timezone data value" type="text" required onChange={handleChange} />

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

export default AddTimezone;