import React,{useState} from "react";
import {Row,Col,Card,CardBody,Button} from 'reactstrap';
import { AvForm,AvField } from "availity-reactstrap-validation";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddAccesspoints = (props) =>{

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
        axios.post(`http://127.0.0.1:8000/api/accesspoints/store?display_name=${values.display_name}&value=${values.value}&access_model_id=${values.access_model_id}`)
            .then(res=>{
                console.log("success")
                history.push('/accesspoints')
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
                        {label: 'Accesspoints',path:'/accesspoints'},
                        {label: 'Add Accesspoints',path:'/add-accesspoints',active:true}
                    ]}
                    title={'Add Accesspoints'}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            <AvForm>
                                <AvField name="access_model_id" label="Access Model Id" type="text" required onChange={handleChange}/>
                                <AvField name="display_name" label="Display Name" type="text" required onChange={handleChange}/>
                                <AvField name="value" label="Value" type="text" required onChange={handleChange}/>

                                <Button color="primary" type="submit" onClick={onSubmit}>Submit</Button>
                            </AvForm>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default AddAccesspoints;