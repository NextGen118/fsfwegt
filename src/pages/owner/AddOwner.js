import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Row, Col, Card, CardBody, InputGroupAddon, Label, CustomInput, Input, Button } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { FormGroup, Grid, FormControl, TextField, MenuItem, InputLabel, Select } from '@mui/material';
import axios from 'axios';

import PageTitle from '../../components/PageTitle';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const AddOwner = () => {

    let history = useHistory()

    const [port, setPort] = useState([])
    const [country, setCountry] = useState([])

    const [activate, setActivate] = useState([

        { Key: 1, Value: 'Activate' },
        { Key: 2, Value: 'De Active' }
    ])



    const getPort = () => {
        axios.get(`http://127.0.0.1:8000/api/ports/show/all`)
            .then(res => {
                setPort(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getCountry = () => {
        axios.get(`http://127.0.0.1:8000/api/countries/show/all`)
            .then(res => {
                setCountry(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getCountry()
        getPort()
    }, [])

    const [ownerselect, setOwnerselect] = useState('')

    const changeOwner = (event) => {
        setOwnerselect(event.target.value);
        console.log(event.target.value, " select")
    };

    const [countryselect, setCountryselect] = useState('')
    const changeCountry = (event) => {
        setCountryselect(event.target.value);
        console.log(event.target.value, "country select")
    };

    const [portselect, setPortselect] = useState('')
    const changePort = (event) => {
        setPortselect(event.target.value);
        console.log(event.target.value, "country select")
    };

    const [activeselect, setActiveselect] = useState('')

    const changeActive = (event) => {
        setActiveselect(event.target.value);
        console.log(event.target.value, " select")
    };

    const [values, setValues] = useState({});

    const handleChange = (evt) => {

        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value
        });
    }

    const onAdd = (event) => {
        event.preventDefault();
        axios.post(`http://127.0.0.1:8000/api/owners/store?owner_code=${values.owner_code}&owner_name=${values.owner_name}&sub_code=${values.sub_code}&country_id=${countryselect}&port_id=${portselect}&email=${values.email}&telephone_number=${values.telephone_number}&fax=${values.fax}&mobile_number=${values.mobile_number}&contact_name=${values.contact_name}&address=${values.address}&remarks=${values.remarks}&is_active=1`)
            .then(res => {

                console.log("successfully")
                history.push('/owner')

            })
            .catch((error) => {
                console.log(error, "error");
            });

    }

    const Back = () => {
        history.push('/owner')
    }

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Owner', path: '/owner' },
                            { label: 'Add Owner', path: '/owner-add', active: true },
                        ]}
                        title={'Add Owner'}
                    />
                </Col>
            </Row>
            <Card>
                <CardBody>
                    <FormGroup onSubmit={onAdd}>
                        <form >
                            <Grid container spacing={2}>

                                <Col lg={4} style={{ padding: '25px' }} >


                                    <Grid mb={2} >
                                        <TextField name="owner_code" label="Owner Code" type="text" id="outlined-required" required onChange={handleChange} fullWidth />
                                    </Grid>


                                    <Grid mb={2}>
                                        <TextField name="owner_name" label="Owner Name" type="text" required onChange={handleChange} fullWidth />
                                    </Grid>

                                    <Grid mb={2}>
                                        <TextField name="sub_code" label="Sub Code" type="text" required onChange={handleChange} fullWidth />
                                    </Grid>


                                    <Grid mb={2}>
                                        <TextField name="email" label="Email" type="email" required onChange={handleChange} fullWidth />
                                    </Grid>

                                </Col>

                                <Col lg={4} style={{ padding: '25px' }}>
                                    <Grid mb={2}>
                                        <TextField name="mobile_number" label="Mobile Number" type="mobile" required onChange={handleChange} fullWidth />
                                    </Grid>

                                    <Grid mb={2}>
                                        <TextField name="address" label="Address" type="text" required onChange={handleChange} fullWidth />
                                    </Grid>

                                    <Grid mb={2}>
                                        <TextField name="Remarks" label="remarks" type="text" required onChange={handleChange} fullWidth />
                                    </Grid>

                                    <Grid mb={2}>
                                        <TextField name="contact_name" label="Contact Name" type="text" required onChange={handleChange} fullWidth />
                                    </Grid>

                                </Col>

                                <Col lg={4} style={{ padding: '25px' }}>
                                    <Grid mb={2}>
                                        <TextField name="telephone_number" label="Telephone Number" type="mobile" required onChange={handleChange} fullWidth />
                                    </Grid>

                                    <Grid mb={2}>
                                        <TextField name="fax" label="Fax" type="text" required onChange={handleChange} fullWidth />
                                    </Grid>

                                    <Grid mb={2}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Port *</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={portselect}
                                                onChange={changePort}
                                                sx={{ width: '100%' }}
                                                label="Port"

                                            >
                                                {port.map((con) => (
                                                    <MenuItem value={con.id} key={con.id}>{con.port_name}</MenuItem>

                                                ))}

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid mb={2}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Country *</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={countryselect}
                                                onChange={changeCountry}
                                                sx={{ width: '100%' }}
                                                required
                                                label="Country"

                                            >

                                                {country.map((con) => (

                                                    <MenuItem value={con.id} key={con.id}>{con.country_name}</MenuItem>

                                                ))}

                                            </Select>
                                        </FormControl >
                                    </Grid>

                                </Col>

                                <Grid md={12} sx={{ textAlign: 'right' }}>
                                    <Button color="danger" style={{ marginLeft: 15 }} onClick={Back} >
                                        Back
                                    </Button>
                                    <Button color="primary" type="submit" style={{ marginLeft: 15 }} >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form >

                    </FormGroup>
                </CardBody>
            </Card>
        </React.Fragment >
    );
};

export default AddOwner;
