import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput, Input } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditTypeofunit = (props) => {

    const { id } = useParams()
    const [values, setValues] = useState({ type_of_unit: '' });

    const history = useHistory()

    useEffect(() => {
        getPropertiesByid()
    }, [])

    const getPropertiesByid = () => {
        axios.get(`http://127.0.0.1:8000/api/typeofunits/show/all`)
            .then(res => {
                console.log(res.data)
                const data = res.data.filter(ress => ress.id === parseInt(id))
                setValues({
                    type_of_unit: data[0].type_of_unit,
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
        axios.post(`http://127.0.0.1:8000/api/typeofunits/store?typeofunit_type=${values.type_of_unit}&id=${id}`)
            .then(res => {
                history.push('/typeofunit')
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
                            { label: 'Type of unit', path: '/typeofnit' },
                            { label: 'Edit Typeof unit', path: '/edit-typeofunit/:id', active: true },
                        ]}
                        title={'Edit Typeof unit'}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            <AvForm>
                                <AvField name="type_of_unit" label="Traffic mode type" type="text" required onChange={handleChange} value={values.type_of_unit} />

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

export default EditTypeofunit;