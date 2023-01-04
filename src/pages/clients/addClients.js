import React,{useState,useEffect} from "react";
import {Row,Col,Card,CardBody,Button} from 'reactstrap';
import { AvForm,AvField } from "availity-reactstrap-validation";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Grid } from "@mui/material";
import { createClientApiCall, showAllClientApi } from '../../axios/clients/Clients';

const AddClients = () =>{

    const [values,setValues] = useState({});
    let history = useHistory()

    const handleChange = (evt) => {
        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value
        });
    }

    useEffect(() => {
        getCountry()
        getCurrency()
        getPort()
    }, [])

    const [country,setCountry] = useState([])
    const [countryselect, setCountryselect] = useState('')

    const [currency,setCurrency] = useState([])
    const [currencyselect, setCurrencyselect] = useState('')

    const [port,setPort] = useState([])
    const [portselect, setPortselect] = useState('')

    const [alertSuccess, setAlertSucces] = useState(true);
    const [alertFaild, setAlertFaild] = useState(true);

    const getCountry = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/countries/show/all`)
            .then(res=>{
                setCountry(res.data.data);
                setCountryselect(res.data.data[0]?.id);
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    const getCurrency = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/currencies/show/all`)
            .then(res=>{
                setCurrency(res.data.data);
                setCurrencyselect(res.data.data[0]?.id);
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    const getPort = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/ports/show/all`)
            .then(res=>{
                setPort(res.data.data);
                setPortselect(res.data.data[0]?.id);
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    const changeCountry = (event) => {
        setCountryselect(event.target.value);
    }

    const changeCurrency = (event) => {
        setCurrencyselect(event.target.value);
    }

    const changePort = (event) => {
        setPortselect(event.target.value);
    }

    function isFormValidate() {
        if (
            !values.client_code ||
            !values.client_name ||
            !values.sub_code ||
            !values.email ||
            !values.mobile_number ||
            !values.fax ||
            !countryselect ||
            !portselect ||
            !currencyselect ||
            !values.telephone_number ||
            !values.contact_name ||
            !values.address 
        ) {
            return false;
        }

        return true;
    }

    const onAdd = (event) => {
        let clientsobj = {
            client_code:values.client_code,
            client_name:values.client_name,
            sub_code:values.sub_code,
            countryselect:countryselect,
            portselect:portselect,
            currencyselect:currencyselect,
            email:values.email,
            telephone_number:values.telephone_number,
            fax:values.fax,
            mobile_number:values.mobile_number,
            contact_name:values.contact_name,
            address:values.address,
            remarks:values.remarks,
            activeselect: 1,
        };
        if (isFormValidate()) {
            event.preventDefault();
            createClientApiCall(clientsobj)
            .then((createRes) => {
                    showAllClientApi();
                    history.push('/clients');
                    setAlertSucces(false);
            });
        }
    };

    const onBack = () =>{
        history.push('/clients')
    }

    return(
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle breadCrumbItems={[
                        {label: 'Client',path:'/clients'},
                        {label: 'Add Client',path:'/add-clients',active:true}
                    ]}
                    title={'Add Client'}
                    />
                </Col>
            </Row>

            <Card>
                <CardBody>
                    <AvForm onSubmit={onAdd}>

                        <Row container item spacing={2}>
                            <Col lg={4}><AvField name="client_code" label="Client Code" type="text" required onChange={handleChange}/></Col>
                            <Col lg={4}><AvField name="client_name" label="Client Name" type="text" required onChange={handleChange}/></Col>
                            <Col lg={4}><AvField name="contact_name" label="Contact Name" type="text" required onChange={handleChange}/></Col>
                            <Col lg={4}><AvField name="sub_code" label="Sub Code" type="text" required onChange={handleChange}/></Col>
                            <Col lg={4}><AvField name="email" label="Email" type="email" required onChange={handleChange}/></Col>
                            <Col lg={4}><AvField name="telephone_number" label="Telephone Number" type="number" required onChange={handleChange}/></Col>
                            <Col lg={4}><AvField name="mobile_number" label="Mobile Number" type="number" required onChange={handleChange}/></Col>
                            <Col lg={4}><AvField name="fax" label="Fax" type="text" required onChange={handleChange}/></Col>
                            <Col lg={4}><AvField name="address" label="Address" type="text" required onChange={handleChange}/></Col>
                            <Col lg={4}><InputLabel id="demo-simple-select-label">Country</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={countryselect} onChange={changeCountry} sx={{ width: '100%', height:36 , mb: 2 }}>{country.map((con) =>(<MenuItem value={con.id} key={con.id}>{con.country_name}</MenuItem>))}</Select></Col>
                            <Col lg={4}><InputLabel id="demo-simple-select-label">Port</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={portselect} onChange={changePort} sx={{ width: '100%', height:36, mb: 2 }}>{port.map((por) => (<MenuItem value={por.id} key={por.id}>{por.port_name}</MenuItem>))}</Select></Col>
                            <Col lg={4}><InputLabel id="demo-simple-select-label">Currency</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={currencyselect} onChange={changeCurrency} sx={{ width: '100%', height:36, mb: 2 }}>{currency.map((cur) => (<MenuItem value={cur.id} key={cur.id}>{cur.currency_name}</MenuItem>))}</Select></Col>
                            <Col lg={4}><AvField name="remarks" label="Remarks" type="text" required onChange={handleChange}/></Col>                  
                        </Row>
                        <Grid md={12} sx={{ textAlign: 'right' }}>
                            <Button color="danger" type="submit" style={{ marginLeft: 15 }} onClick={onBack}>
                                Back
                            </Button>
                            <Button color="primary" type="submit" style={{ marginLeft: 15 }}>
                                Submit
                            </Button>
                        </Grid>
                    </AvForm>
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default AddClients;