import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditSwaps = (props) => {

    const { id } = useParams()
    const [values, setValues] = useState({ date: '', equipment_id: '', description: '', client_id_agent: '' });

    const history = useHistory()

    useEffect(() => {
        getSwapByid()
    }, [])

    const getSwapByid = () => {
        axios.get(`http://127.0.0.1:8000/api/swaps/show/all`)
            .then(res => {
                console.log(res.data)
                const data = res.data.filter(ress => ress.id === parseInt(id))
                console.log(data, 'edit data')
                setValues({
                    date: data[0].date,
                    equipment_id: data[0].equipment_id,
                    description: data[0].description,
                    client_id_agent: data[0].client_id_agent,
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
        axios.post(`http://127.0.0.1:8000/api/swaps/store?date=${values.date}&equipment_id=${values.equipment_id}&description=${values.description}&client_id_agent=${values.client_id_agent}&id=${id}`)
            .then(res => {
                history.push('/swaps')
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
                            { label: 'Swaps', path: '/swaps' },
                            { label: 'Edit Swap', path: '/edit-swaps/:id', active: true },
                        ]}
                        title={'Edit Swap'}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            <AvForm>
                                <AvField name="date" label="Date" type="date" required onChange={handleChange} value={values.date} />
                                <AvField name="equipment_id" label="Equipment Id" type="text" required onChange={handleChange} value={values.equipment_id} />
                                <AvField name="description" label="Description" type="text" required onChange={handleChange} value={values.description} />
                                <AvField name="client_id_agent" label="Client Id Agent" type="text" required onChange={handleChange} value={values.client_id_agent} />

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

export default EditSwaps;