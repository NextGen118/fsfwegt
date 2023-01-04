import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from "availity-reactstrap-validation";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Grid } from "@mui/material";
import { createVendorApiCall, showAllVendorApi } from '../../axios/vendors/Vendors';

const AddVendors = (props) => {

    const [values, setValues] = useState({});
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
        getPort()
    }, [])

    const [country, setCountry] = useState([])
    const [countryselect, setCountryselect] = useState('')

    const [port, setPort] = useState([])
    const [portselect, setPortselect] = useState('')

    const [activeselect, setActiveselect] = useState('')

    const [alertSuccess, setAlertSucces] = useState(true);
    const [alertFaild, setAlertFaild] = useState(true);

    const getCountry = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/countries/show/all`)
            .then(res => {
                setCountry(res.data.data);
                setCountryselect(res.data.data[0]?.id);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getPort = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/ports/show/all`)
            .then(res => {
                setPort(res.data.data);
                setPortselect(res.data.data[0]?.id);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const changeCountry = (event) => {
        setCountryselect(event.target.value);
    }

    const changePort = (event) => {
        setPortselect(event.target.value);
    }

    const changeActive = (event) => {
        setActiveselect(event.target.value);
    }

    const onSubmit = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/vendors/store?vendor_code=${values.vendor_code}
        &vendor_name=${values.vendor_name}&sub_code=${values.sub_code}
        &country_id=${countryselect}&port_id=${portselect}&email=${values.email}&telephone_number=${values.telephone_number}
        &fax=${values.fax}&mobile_number=${values.mobile_number}&contact_name=${values.contact_name}
        &address=${values.address}&image&remarks=${values.remarks}&is_active=${activeselect}`)
            .then(res => {
                console.log("success")
                history.push('/vendors')
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function isFormValidate() {
        if (
            !values.vendor_code ||
            !values.vendor_name ||
            !values.sub_code ||
            !values.email ||
            !values.mobile_number ||
            !values.fax ||
            !countryselect ||
            !portselect ||
            !values.telephone_number ||
            !values.contact_name ||
            !values.address 
        ) {
            return false;
        }

        return true;
    }

    const onAdd = (event) => {
        let vendorsobj = {
            vendor_code:values.vendor_code,
            vendor_name:values.vendor_name,
            sub_code:values.sub_code,
            countryselect:countryselect,
            portselect:portselect,
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
            createVendorApiCall(vendorsobj)
            .then((createRes) => {
                    showAllVendorApi();
                    history.push('/vendors');
                    setAlertSucces(false);
            });
        }
    };

    const onBack = () => {
        history.push('/vendors')
    }

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle breadCrumbItems={[
                        { label: 'Vendors', path: '/vendors' },
                        { label: 'Add Vendor', path: '/add-vendors', active: true }
                    ]}
                        title={'Add Vendor'}
                    />
                </Col>
            </Row>
            <Row>
            <Card>
                <CardBody>
                    <AvForm onSubmit={onAdd}>
                        <Row container item spacing={2}>
                            <Col lg={4}><AvField name="vendor_code" label="Vendor Code" type="text" required onChange={handleChange}/></Col>
                            <Col lg={4}><AvField name="vendor_name" label="Vendor Name" type="text" required onChange={handleChange}/></Col>
                            <Col lg={4}><AvField name="contact_name" label="Contact Name" type="text" required onChange={handleChange}/></Col>
                            <Col lg={4}><AvField name="sub_code" label="Sub Code" type="text" required onChange={handleChange}/></Col>
                            <Col lg={4}><AvField name="email" label="Email" type="email" required onChange={handleChange}/></Col>
                            <Col lg={4}><AvField name="telephone_number" label="Telephone Number" type="number" required onChange={handleChange}/></Col>
                            <Col lg={4}><AvField name="mobile_number" label="Mobile Number" type="number" required onChange={handleChange}/></Col>
                            <Col lg={4}><AvField name="fax" label="Fax" type="text" required onChange={handleChange}/></Col>
                            <Col lg={4}><AvField name="address" label="Address" type="text" required onChange={handleChange}/></Col>
                            <Col lg={4}><InputLabel id="demo-simple-select-label">Country</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={countryselect} onChange={changeCountry} sx={{ width: '100%', height:36 , mb: 2 }}>{country.map((con) =>(<MenuItem value={con.id} key={con.id}>{con.country_name}</MenuItem>))}</Select></Col>
                            <Col lg={4}><InputLabel id="demo-simple-select-label">Port</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={portselect} onChange={changePort} sx={{ width: '100%', height:36, mb: 2 }}>{port.map((por) => (<MenuItem value={por.id} key={por.id}>{por.port_name}</MenuItem>))}</Select></Col>
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
            </Row>
        </React.Fragment>
    )
}

export default AddVendors;