import React,{useState} from "react";
import {Row,Col,Card,CardBody,Button} from 'reactstrap';
import { AvForm,AvField } from "availity-reactstrap-validation";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddSwaps = (props) =>{

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
        axios.post(`http://127.0.0.1:8000/api/swaps/store?date=${values.date}&equipment_id=${values.equipment_id}&description=${values.description}&client_id_agent=${values.client_id_agent}`)
            .then(res=>{
                console.log("success")
                history.push('/swaps')
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
                        {label: 'Swaps',path:'/swaps'},
                        {label: 'Add Swap',path:'/add-swaps',active:true}
                    ]}
                    title={'Add Swap'}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            <AvForm>
                                <AvField name="date" label="Date" type="date" required onChange={handleChange}/>
                                <AvField name="equipment_id" label="Equipmnt Id" type="text" required onChange={handleChange}/>
                                <AvField name="description" label="Description" type="text" required onChange={handleChange}/>
                                <AvField name="client_id_agent" label="Client Id Agent" type="text" required onChange={handleChange}/>

                                <Button color="primary" type="submit" onClick={onSubmit}>Submit</Button>
                            </AvForm>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default AddSwaps;