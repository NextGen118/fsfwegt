import React,{useState} from "react";
import {Row,Col,Card,CardBody,Button} from 'reactstrap';
import { AvForm,AvField } from "availity-reactstrap-validation";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddCountries = (props) =>{

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
        axios.post(`http://127.0.0.1:8000/api/countries/store?country_name=${values.countriesname}&capital_city_name=${values.countrycapitalname}`)
            .then(res=>{
                console.log("success")
                history.push('/countries')
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
                        {label: 'Countries',path:'/countries'},
                        {label: 'Add Countries',path:'/add-countries',active:true}
                    ]}
                    title={'Add Countries'}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            <AvForm>
                                <AvField name="countriesname" label="Countries Name" type="text" required onChange={handleChange}/>
                                <AvField name="countrycapitalname" label="Countries Capital Name" type="text" required onChange={handleChange}/>

                                <Button color="primary" type="submit" onClick={onSubmit}>Submit</Button>
                            </AvForm>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default AddCountries;