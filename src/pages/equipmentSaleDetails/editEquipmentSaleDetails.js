import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditEquipmentSaleDetails = (props) => {

    const { id } = useParams()
    const [values, setValues] = useState({ equipment_sale_id: '', equipment_id: '',amount:'',destination:'' });

    const history = useHistory()

    useEffect(() => {
        getEquipmentSaleDetailsByid()
    }, [])

    const getEquipmentSaleDetailsByid = () => {
        axios.get(`http://127.0.0.1:8000/api/equipmentsaledetails/show/all`)
            .then(res => {
                console.log(res.data)
                const data = res.data.filter(ress => ress.id === parseInt(id))
                console.log(data, 'edit data')
                setValues({
                    equipment_sale_id: data[0].equipment_sale_id,
                    equipment_id: data[0].equipment_id,
                    amount: data[0].amount,
                    destination: data[0].destination
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
        axios.post(`http://127.0.0.1:8000/api/equipmentsaledetails/store?equipment_sale_id=${values.equipment_sale_id}&equipment_id=${values.equipment_id}&amount=${values.amount}&destination=${values.destination}&id=${id}`)
            .then(res => {
                history.push('/equipmentsaledetails')
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
                            { label: 'Equipment Sale Details', path: '/requipmentsaledetails' },
                            { label: 'Edit Equipment Sale Details', path: '/edit-requipmentsaledetails/:id', active: true },
                        ]}
                        title={'Edit Equipment Sale Details'}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            <AvForm>
                                <AvField name="equipment_sale_id" label="Equipment Sale Id" type="text" required onChange={handleChange} value={values.equipment_sale_id} />
                                <AvField name="equipment_id" label="Equipment Id" type="text" required onChange={handleChange} value={values.equipment_id} />
                                <AvField name="amount" label="Amount" type="text" required onChange={handleChange} value={values.amount} />
                                <AvField name="destination" label="Destination" type="text" required onChange={handleChange} value={values.destination} />

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

export default EditEquipmentSaleDetails;