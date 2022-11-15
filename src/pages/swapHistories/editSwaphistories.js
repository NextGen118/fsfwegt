import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditSwaphistories = (props) => {

    const { id } = useParams()
    const [values, setValues] = useState({ swap_id: '',status: '', equipment_id: '',client_id_agent: '' });

    const history = useHistory()

    useEffect(() => {
        getSwaphistoriesByid()
    }, [])

    const getSwaphistoriesByid = () => {
        axios.get(`http://127.0.0.1:8000/api/swaphistories/show/all`)
            .then(res => {
                console.log(res.data)
                const data = res.data.filter(ress => ress.id === parseInt(id))
                console.log(data, 'edit data')
                setValues({
                    swap_id: data[0].swap_id,
                    equipment_id: data[0].equipment_id,
                    status: data[0].status,
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
        axios.post(`http://127.0.0.1:8000/api/swaphistories/store?swap_id=${values.swap_id}&status=${values.status}&equipment_id=${values.equipment_id}&client_id_agent=${values.client_id_agent}&id=${id}`)
            .then(res => {
                history.push('/swaphistories')
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
                            { label: 'SwapHistories', path: '/swaphistories' },
                            { label: 'Edit SwapHistories', path: '/edit-swaphistories/:id', active: true },
                        ]}
                        title={'Edit SwapHistories'}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            <AvForm>

                                <AvField name="swap_id" label="Swap Id" type="text" required onChange={handleChange} value={values.swap_id}/>
                                <AvField name="status" label="Status" type="text" required onChange={handleChange} value={values.status}/>
                                <AvField name="equipment_id" label="Equipmnt Id" type="text" required onChange={handleChange}value={values.equipment_id}/>
                                <AvField name="client_id_agent" label="Client Id Agent" type="text" required onChange={handleChange} value={values.client_id_agent}/>

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

export default EditSwaphistories;