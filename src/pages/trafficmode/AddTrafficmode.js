import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput, Input } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const AddTrafficmode = (props) => {

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
        axios.post(`${process.env.REACT_APP_BASE_URL}/trafficmodes/store?trafficmode_type=${values.trafficmode_type}`)
            .then(res => {
                console.log("successfully")
                history.push('/trafficmode')

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
                            { label: 'Trafficmode', path: '/trafficmode' },
                            { label: 'Add Trafficmode', path: '/add-trafficmode', active: true },
                        ]}
                        title={'Add Trafficmode'}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>

                            <AvForm>
                                <AvField name="trafficmode_type" label="Traffic mode type" type="text" required onChange={handleChange} />


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

export default AddTrafficmode;