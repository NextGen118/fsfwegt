import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Grid } from '@mui/material';
import { editClientApiCall, showAllClientApi } from '../../axios/clients/Clients';
import SuccessMsg from '../../components/AlertMsg';

const EditClients = (props) => {

    const { id } = useParams()
    const [values, setValues] = useState({ client_code: '', client_name: '', sub_code: '', country_id: '', port_id: '', currency_id: '', email: '', telephone_number: '', fax: '', mobile_number: '', contact_name: '', remarks: '', is_active: '', address: '' });

    const history = useHistory()

    useEffect(() => {
        getClientByid()
        getCountry()
        getCurrency()
        getPort()
    }, [props.id])

    const [country, setCountry] = useState([])
    const [countryselect, setCountryselect] = useState('')

    const [currency, setCurrency] = useState([])
    const [currencyselect, setCurrencyselect] = useState('')

    const [port, setPort] = useState([])
    const [portselect, setPortselect] = useState('')

    const [activeselect, setActiveselect] = useState('')

    const getCountry = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/countries/show/all`)
<<<<<<< HEAD
            .then(res => {
=======
            .then(res=>{
>>>>>>> 0810c3a5dd00a9220853ddd1f41ac7fba6289ccf
                setCountry(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getCurrency = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/currencies/show/all`)
<<<<<<< HEAD
            .then(res => {
=======
            .then(res=>{
>>>>>>> 0810c3a5dd00a9220853ddd1f41ac7fba6289ccf
                setCurrency(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getPort = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/ports/show/all`)
<<<<<<< HEAD
            .then(res => {
=======
            .then(res=>{
>>>>>>> 0810c3a5dd00a9220853ddd1f41ac7fba6289ccf
                setPort(res.data.data)
            })
            .catch((error) => {
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

    const getClientByid = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/clients/show/all`)
            .then(res => {
                const data = res.data.data.filter(ress => ress.id === parseInt(id))
                setValues({
                    client_code: data[0].client_code,
                    client_name: data[0].client_name,
                    sub_code: data[0].sub_code,
                    country_id: data[0].country_id,
                    port_id: data[0].port_id,
                    currency_id: data[0].currency_id,
                    email: data[0].email,
                    telephone_number: data[0].telephone_number,
                    fax: data[0].fax,
                    mobile_number: data[0].mobile_number,
                    contact_name: data[0].contact_name,
                    remarks: data[0].remarks,
                    is_active: data[0].is_active,
                    address: data[0].address
                })
<<<<<<< HEAD
                console.log("current ID", data[0].country_id);
=======
>>>>>>> 0810c3a5dd00a9220853ddd1f41ac7fba6289ccf
                setCountryselect(data[0].country_id)
                setCurrencyselect(data[0].currency_id)
                setPortselect(data[0].port_id)
                setActiveselect(data[0].is_active)
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

<<<<<<< HEAD
    const submitEdit = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/clients/store?client_code=${values.client_code}&client_name=${values.client_name}&sub_code=${values.sub_code}&country_id=${countryselect}&port_id=${portselect}&currency_id=${currencyselect}&email=${values.email}&telephone_number=${values.telephone_number}&fax=${values.fax}&mobile_number=${values.mobile_number}&contact_name=${values.contact_name}&address=${values.address}&image&remarks=${values.remarks}&is_active=${activeselect}&id=${id}`)
            .then(res => {
                history.push('/clients')
                console.log("success to edit")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const onBack = () => {
=======
    const [alertSuccess, setAlertSucces] = useState(true);
    const [alertFaild, setAlertFaild] = useState(true);
    useEffect(() => {
        SuccessMsg('ArrivalNoticies', true, 'error');
        setTimeout(() => {
            SuccessMsg('ArrivalNoticies', false, 'error');
        }, 500);
    });

    function isFormValidate() {
        if (
            !values.client_code ||
            !values.client_name ||
            !values.sub_code ||
            !values.email ||
            !values.telephone_number ||
            !values.fax ||
            !countryselect ||
            !portselect ||
            !currencyselect ||
            !values.telephone_number ||
            !values.contact_name ||
            !values.address ||
            !activeselect
        ) {
            return false;
        }

        return true;
    }

    const onEdit = (event) => {
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
            activeselect: activeselect,
            id:id
        };
        if (isFormValidate) {
            event.preventDefault();
            editClientApiCall(clientsobj).then((editRes) => {
                if (editRes.status === 200) {
                    showAllClientApi();
                    history.push('/clients');
                    setAlertSucces(false);
                } else {
                    setAlertFaild(false);
                }
            });
        }
    };

    const onBack = () =>{
>>>>>>> 0810c3a5dd00a9220853ddd1f41ac7fba6289ccf
        history.push('/clients')
    }

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Client', path: '/clients' },
                            { label: 'Edit Client', path: '/edit-clients/:id', active: true },
                        ]}
                        title={'Edit Client'}
                    />
                </Col>
            </Row>

<<<<<<< HEAD
            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            <AvForm>
                                <AvField name="client_code" label="Client Code" type="text" required onChange={handleChange} value={values.client_code} />
                                <AvField name="client_name" label="Client Name" type="text" required onChange={handleChange} value={values.client_name} />
                                <AvField name="contact_name" label="Contact Name" type="text" required onChange={handleChange} value={values.contact_name} />
                                <AvField name="sub_code" label="Sub Code" type="text" required onChange={handleChange} value={values.sub_code} />
                                <AvField name="email" label="Email" type="email" required onChange={handleChange} value={values.email} />
                                <AvField name="telephone_number" label="Telephone Number" type="text" required onChange={handleChange} value={values.telephone_number} />
                                <AvField name="mobile_number" label="Mobile Number" type="text" required onChange={handleChange} value={values.mobile_number} />
                            </AvForm>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            <AvForm>
                                <AvField name="fax" label="Fax" type="text" required onChange={handleChange} value={values.fax} />
                                <AvField name="address" label="Address" type="text" required onChange={handleChange} value={values.address} />
                                <InputLabel id="demo-simple-select-label">Country</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={countryselect} onChange={changeCountry} sx={{ width: 540, height: 36, mb: 2 }}>{country.map((con) => (<MenuItem value={con.id} key={con.id}>{con.country_name}</MenuItem>))}</Select>
                                <InputLabel id="demo-simple-select-label">Port</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={portselect} onChange={changePort} sx={{ width: 540, height: 36, mb: 2 }}>{port.map((por) => (<MenuItem value={por.id} key={por.id}>{por.port_name}</MenuItem>))}</Select>
                                <InputLabel id="demo-simple-select-label">Currency</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={currencyselect} onChange={changeCurrency} sx={{ width: 540, height: 36, mb: 2 }}>{currency.map((cur) => (<MenuItem value={cur.id} key={cur.id}>{cur.currency_name}</MenuItem>))}</Select>
                                <AvField name="remarks" label="Remarks" type="text" required onChange={handleChange} value={values.remarks} />
                                <InputLabel id="demo-simple-select-label">Active</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={activeselect} onChange={changeActive} sx={{ width: 540, height: 36, mb: 2 }}><MenuItem value={1}>Active</MenuItem><MenuItem value={0}>Inactive</MenuItem></Select>
                            </AvForm>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Button color="primary" type="submit" onClick={() => submitEdit()}>Edit</Button>&nbsp;
            <Button color="danger" type="submit" onClick={onBack}>Back</Button>
=======
            <Card>
                <CardBody>
                    <AvForm onSubmit={onEdit}>

                        <Row container item spacing={2}>
                            <Col lg={4}><AvField name="client_code" label="Client Code" type="text" required onChange={handleChange} value={values.client_code}/></Col>
                            <Col lg={4}><AvField name="client_name" label="Client Name" type="text" required onChange={handleChange} value={values.client_name}/></Col>
                            <Col lg={4}><AvField name="contact_name" label="Contact Name" type="text" required onChange={handleChange} value={values.contact_name}/></Col>
                            <Col lg={4}><AvField name="sub_code" label="Sub Code" type="text" required onChange={handleChange} value={values.sub_code}/></Col>
                            <Col lg={4}><AvField name="email" label="Email" type="email" required onChange={handleChange} value={values.email}/></Col>
                            <Col lg={4}><AvField name="telephone_number" label="Telephone Number" type="text" required onChange={handleChange} value={values.telephone_number}/></Col>
                            <Col lg={4}><AvField name="mobile_number" label="Mobile Number" type="text" required onChange={handleChange} value={values.mobile_number}/></Col>
                            <Col lg={4}><AvField name="fax" label="Fax" type="text" required onChange={handleChange} value={values.fax}/></Col>            
                            <Col lg={4}><AvField name="address" label="Address" type="text" required onChange={handleChange} value={values.address}/></Col>
                            <Col lg={4}><InputLabel id="demo-simple-select-label">Country</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={countryselect} onChange={changeCountry} sx={{  width: '100%', height:36 , mb: 2 }}>{country.map((con) => (<MenuItem value={con.id} key={con.id}>{con.country_name}</MenuItem>))}</Select></Col>
                            <Col lg={4}><InputLabel id="demo-simple-select-label">Port</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={portselect} onChange={changePort} sx={{ width: '100%', height:36 , mb: 2 }}>{port.map((por) => (<MenuItem value={por.id} key={por.id}>{por.port_name}</MenuItem>))}</Select></Col>
                            <Col lg={4}><InputLabel id="demo-simple-select-label">Currency</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={currencyselect} onChange={changeCurrency} sx={{ width: '100%', height:36 , mb: 2 }}>{currency.map((cur) => (<MenuItem value={cur.id} key={cur.id}>{cur.currency_name}</MenuItem>))}</Select></Col>
                            <Col lg={4}><AvField name="remarks" label="Remarks" type="text" required onChange={handleChange} value={values.remarks}/></Col>
                            <Col lg={4}><InputLabel id="demo-simple-select-label">Active</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={activeselect} onChange={changeActive} sx={{ width: '100%', height:36 , mb: 2 }}><MenuItem value={1}>Active</MenuItem><MenuItem value={0}>Inactive</MenuItem></Select></Col>  
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
>>>>>>> 0810c3a5dd00a9220853ddd1f41ac7fba6289ccf
        </React.Fragment >
    );
}

export default EditClients;