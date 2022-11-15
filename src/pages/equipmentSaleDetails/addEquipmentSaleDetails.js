import React,{useState} from "react";
import {Row,Col,Card,CardBody,Button} from 'reactstrap';
import { AvForm,AvField } from "availity-reactstrap-validation";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddEquipmentSaleDetails = (props) =>{

    const [values,setValues] = useState({});
    let history = useHistory()

    const handleChange = (evt) => {
        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value
        });
    }

    const onSubmit = () =>{
        axios.post(`http://127.0.0.1:8000/api/equipmentsaledetails/store?equipment_sale_id=${values.equipment_sale_id}&equipment_id=${values.equipment_id}&amount=${values.amount}&destination=${values.destination}`)
            .then(res=>{
                console.log("success")
                history.push('/equipmentsaledetails')
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    return(
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle breadCrumbItems={[
                        {label: 'Equipment Sale Details',path:'/equipmentsaledetails'},
                        {label: 'Add Equipment Sale Details',path:'/add-equipmentsaledetails',active:true}
                    ]}
                    title={'Add Equipment Sale Details'}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            <AvForm>
                                <AvField name="equipment_sale_id" label="Equipment Sale Id" type="number" required onChange={handleChange}/>
                                <AvField name="equipment_id" label="Equipment Id" type="number" required onChange={handleChange}/>
                                <AvField name="amount" label="Amount" type="text" required onChange={handleChange}/>
                                <AvField name="destination" label="Destination" type="text" required onChange={handleChange}/>

                                <Button color="primary" type="submit" onClick={onSubmit}>Submit</Button>
                            </AvForm>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default AddEquipmentSaleDetails;