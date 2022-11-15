import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput, Input } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditTrafficmode = (props) => {

    const { id } = useParams()
    const [values, setValues] = useState({ trafficmode_type: '' });

    const history = useHistory()

    useEffect(() => {
        getPropertiesByid()
    }, [])

    const getPropertiesByid = () => {
        axios.get(`http://127.0.0.1:8000/api/trafficmodes/show/all`)
            .then(res => {
                console.log(res.data)
                const data = res.data.filter(ress => ress.id === parseInt(id))
                setValues({
                    trafficmode_type: data[0].trafficmode_type,
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
        axios.post(`http://127.0.0.1:8000/api/trafficmodes/store?trafficmode_type=${values.trafficmode_type}&id=${id}`)
            .then(res => {
                history.push('/trafficmode')
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
                            { label: 'Traffic mode', path: '/trafficmode' },
                            { label: 'Edit Trafficmode', path: '/edit-trafficmode/:id', active: true },
                        ]}
                        title={'Edit Trafficmode'}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            <AvForm>
                                <AvField name="trafficmode_type" label="Traffic mode type" type="text" required onChange={handleChange} value={values.trafficmode_type} />


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

export default EditTrafficmode;