import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditAccesspoints = (props) => {

    const { id } = useParams()
    const [values, setValues] = useState({ display_name: '',value: '', access_model_id: '' });

    const history = useHistory()

    useEffect(() => {
        getAccesspointsByid()
    }, [])

    const getAccesspointsByid = () => {
        axios.get(`http://127.0.0.1:8000/api/accesspoints/show/all`)
            .then(res => {
                console.log(res.data)
                const data = res.data.filter(ress => ress.id === parseInt(id))
                console.log(data, 'edit data')
                setValues({
                    display_name: data[0].display_name,
                    value: data[0].value,
                    access_model_id: data[0].access_model_id
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
        axios.post(`http://127.0.0.1:8000/api/accesspoints/store?display_name=${values.display_name}&value=${values.value}&access_model_id=${values.access_model_id}&id=${id}`)
            .then(res => {
                history.push('/accesspoints')
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
                            { label: 'Accesspoints', path: '/accesspoints' },
                            { label: 'Edit Accesspoints', path: '/edit-accesspoints/:id', active: true },
                        ]}
                        title={'Edit Accesspoints'}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            <AvForm>
                                <AvField name="access_model_id" label="Access Model Id" type="text" required onChange={handleChange} value={values.access_model_id} />
                                <AvField name="display_name" label="Display Name" type="text" required onChange={handleChange} value={values.display_name} />
                                <AvField name="value" label="Value" type="text" required onChange={handleChange} value={values.value} />

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

export default EditAccesspoints;