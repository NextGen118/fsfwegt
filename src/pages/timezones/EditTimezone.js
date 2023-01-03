import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput, Input } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditTimezone = (props) => {

    const { id } = useParams()
    const [values, setValues] = useState({ timezone_data_name: '', timezone_data_value: '' });

    const history = useHistory()

    useEffect(() => {
        getPropertiesByid()
    }, [])

    const getPropertiesByid = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/timezones/show/all`)
            .then(res => {
                console.log(res.data)
                const data = res.data.data.filter(ress => ress.id === parseInt(id))
                setValues({
                    timezone_data_name: data[0].timezone_data_name,
                    timezone_data_value: data[0].timezone_data_value
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
        axios.post(`${process.env.REACT_APP_BASE_URL}/timezones/store?timezone_data_name=${values.timezone_data_name} &timezone_data_value=${values.timezone_data_value}&id=${id}`)
            .then(res => {
                history.push('/timezone')
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
                            { label: 'Timezone', path: '/timezone' },
                            { label: 'Edit Timezone', path: '/edit-timezone/:id', active: true },
                        ]}
                        title={'Edit Timezone'}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            <AvForm>
                                <AvField name="timezone_data_name" label="Timezone data name" type="text" required onChange={handleChange} value={values.timezone_data_name} />
                                <AvField name="timezone_data_value" label="Timezone data value" type="text" required onChange={handleChange} value={values.timezone_data_value} />

                                <Button color="primary" type="submit" onClick={submitEdit}>
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

export default EditTimezone;