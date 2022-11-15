import React,{useState} from "react";
import {Row,Col,Card,CardBody,Button} from 'reactstrap';
import { AvForm,AvField } from "availity-reactstrap-validation";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddCurrencies = (props) =>{

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
        axios.post(`http://127.0.0.1:8000/api/currencies/store?currency_code=${values.currencycode}&currency_name=${values.currencyname}&country_id=${values.country}`)
            .then(res=>{
                console.log("success")
                history.push('/currencies')
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
                        {label: 'Currencies',path:'/currencies'},
                        {label: 'Add Currency',path:'/add-currencies',active:true}
                    ]}
                    title={'Add Currency'}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            <AvForm>
                                <AvField name="country" label="Country Code" type="number" required onChange={handleChange}/>
                                <AvField name="currencycode" label="Currency Code" type="text" required onChange={handleChange}/>
                                <AvField name="currencyname" label="Currency Name" type="text" required onChange={handleChange}/>
                                <Button color="primary" type="submit" onClick={onSubmit}>Submit</Button>
                            </AvForm>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default AddCurrencies;