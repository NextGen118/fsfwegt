import React,{useState,useEffect} from "react";
import {Row,Col,Card,CardBody,Button} from 'reactstrap';
import { AvForm,AvField } from "availity-reactstrap-validation";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const AddClients = (props) =>{

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

    const [activeselect, setActiveselect] = useState('')

    const getCountry = () => {
        axios.get(`http://127.0.0.1:8000/api/countries/show/all`)
            .then(res=>{
                setCountry(res.data.data)
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    const getCurrency = () => {
        axios.get(`http://127.0.0.1:8000/api/currencies/show/all`)
            .then(res=>{
                setCurrency(res.data.data)
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    const getPort = () => {
        axios.get(`http://127.0.0.1:8000/api/ports/show/all`)
            .then(res=>{
                setPort(res.data.data)
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

    const changeActive = (event) => {
        setActiveselect(event.target.value);
    }


    const onSubmit = () =>{
        axios.post(`http://127.0.0.1:8000/api/clients/store?client_code=${values.client_code}&client_name=${values.client_name}&sub_code=${values.sub_code}&country_id=${countryselect}&port_id=${portselect}&currency_id=${currencyselect}&email=${values.email}&telephone_number=${values.telephone_number}&fax=${values.fax}&mobile_number=${values.mobile_number}&contact_name=${values.contact_name}&address=${values.address}&image&remarks=${values.remarks}&is_active=${activeselect}`)
            .then(res=>{
                console.log("success")
                history.push('/clients')
            })
            .catch((error)=>{
                console.log(error);
            });
    }

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
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardBody>
                            <Row>
                            <Col lg={6}>
                            <AvForm>
                                <AvField name="client_code" label="Client Code" type="text" required onChange={handleChange}/>
                                <AvField name="client_name" label="Client Name" type="text" required onChange={handleChange}/>
                                <AvField name="contact_name" label="Contact Name" type="text" required onChange={handleChange}/>
                                <AvField name="sub_code" label="Sub Code" type="text" required onChange={handleChange}/>
                                <AvField name="email" label="Email" type="email" required onChange={handleChange}/>
                                <AvField name="telephone_number" label="Telephone Number" type="text" required onChange={handleChange}/>
                                <AvField name="mobile_number" label="Mobile Number" type="text" required onChange={handleChange}/>
                            </AvForm>
                            </Col>
                            <Col lg={6}>
                            <AvForm>
                                <AvField name="fax" label="Fax" type="text" required onChange={handleChange}/>
                                <AvField name="address" label="Address" type="text" required onChange={handleChange}/>
                                <InputLabel id="demo-simple-select-label">Country</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={countryselect} onChange={changeCountry} sx={{ width: 540, height:36 , mb: 2 }}>{country.map((con) => (<MenuItem value={con.id} key={con.id}>{con.country_name}</MenuItem>))}</Select>
                                <InputLabel id="demo-simple-select-label">Port</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={portselect} onChange={changePort} sx={{ width: 540, height:36, mb: 2 }}>{port.map((por) => (<MenuItem value={por.id} key={por.id}>{por.port_name}</MenuItem>))}</Select>
                                <InputLabel id="demo-simple-select-label">Currency</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={currencyselect} onChange={changeCurrency} sx={{ width: 540, height:36, mb: 2 }}>{currency.map((cur) => (<MenuItem value={cur.id} key={cur.id}>{cur.currency_name}</MenuItem>))}</Select>
                                <AvField name="remarks" label="Remarks" type="text" required onChange={handleChange}/>
                                <InputLabel id="demo-simple-select-label">Active</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={activeselect} onChange={changeActive} sx={{ width: 540, height:36 , mb: 2 }}><MenuItem value={1}>Active</MenuItem><MenuItem value={0}>Inactive</MenuItem></Select>
                            </AvForm>
                            </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Button color="primary" type="submit" onClick={onSubmit}>Submit</Button>&nbsp;
            <Button color="danger" type="submit" onClick={onBack}>Back</Button>    
        </React.Fragment>
    )
}

export default AddClients;