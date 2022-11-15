import React,{useState} from "react";
import {Row,Col,Card,CardBody,Button} from 'reactstrap';
import { AvForm,AvField } from "availity-reactstrap-validation";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddSwaphistories = (props) =>{

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
        axios.post(`http://127.0.0.1:8000/api/swaphistories/store?swap_id=${values.swap_id}&status=${values.status}&equipment_id=${values.equipment_id}&client_id_agent=${values.client_id_agent}`)
            .then(res=>{
                console.log("success")
                history.push('/swaphistories')
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
                        {label: 'SwapHistories',path:'/swaphistories'},
                        {label: 'Add SwapHistories',path:'/add-swaphistories',active:true}
                    ]}
                    title={'Add SwapHistories'}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            <AvForm>
                                <AvField name="swap_id" label="Swap Id" type="text" required onChange={handleChange}/>
                                <AvField name="status" label="Status" type="text" required onChange={handleChange}/>
                                <AvField name="equipment_id" label="Equipment Id" type="text" required onChange={handleChange}/>
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

export default AddSwaphistories;