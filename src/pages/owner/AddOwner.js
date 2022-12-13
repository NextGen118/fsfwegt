import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput, Input } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
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

    const onSubmit = () => {
        axios.post(`http://127.0.0.1:8000/api/owners/store?owner_code=${values.owner_code}&owner_name=${values.owner_name}&sub_code=${values.sub_code}&country_id=${countryselect}&port_id=${portselect}&email=${values.email}&telephone_number=${values.telephone_number}&fax=${values.fax}&mobile_number=${values.mobile_number}&contact_name=${values.contact_name}&address=${values.address}&remarks=${values.remarks}&is_active=${activeselect}`)
            .then(res => {
                console.log("successfully")
                history.push('/owner')

            })
            .catch((error) => {
                console.log(error);
            });

    }

    const Back = () => {
        history.push('/equipments')
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

            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>

                            <AvForm>
                                <AvField name="owner_code" label="Owner Code" type="text" required onChange={handleChange} />
                                <AvField name="owner_name" label="Owner Name" type="text" required onChange={handleChange} />
                                <AvField name="sub_code" label="Sub Code" type="text" required onChange={handleChange} />


                                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={countryselect}
                                    onChange={changeCountry}
                                    sx={{ width: 150, mb: 5 }}

                                >

                                    {country.map((con) => (

                                        <MenuItem value={con.id} key={con.id}>{con.country_name}</MenuItem>

                                    ))}

                                </Select>

                                <InputLabel id="demo-simple-select-label">Port</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={portselect}
                                    onChange={changePort}
                                    sx={{ width: 150, mb: 5, height: 45 }}

                                >
                                    {port.map((con) => (
                                        <MenuItem value={con.id} key={con.id}>{con.port_name}</MenuItem>

                                    ))}

                                </Select>

                                <AvField name="email" label="Email" type="email" required onChange={handleChange} />
                                <AvField name="contact_name" label="Contact Name" type="text" required onChange={handleChange} />

                            </AvForm>
                        </CardBody>
                    </Card>
                </Col>

                <Col lg={6}>
                    <Card>
                        <CardBody>

                            <AvForm>
                                <AvField name="mobile_number" label="Mobile Number" type="mobile" required onChange={handleChange} />
                                <AvField name="address" label="Address" type="text" required onChange={handleChange} />
                                <AvField name="Remarks" label="remarks" type="text" required onChange={handleChange} />
                                <AvField name="telephone_number" label="Telephone Number" type="mobile" required onChange={handleChange} />
                                <AvField name="fax" label="Fax" type="text" required onChange={handleChange} />

                                <InputLabel id="demo-simple-select-label">Is Active</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={activeselect}
                                    onChange={changeActive}
                                    sx={{ width: 150, mb: 5, height: 45 }}

                                >
                                    {activate.map((con) => (
                                        <MenuItem value={con.Key} key={con.Key}>{con.Value}</MenuItem>

                                    ))}

                                </Select>


                            </AvForm>
                        </CardBody>
                    </Card>

                </Col>
                <Button color="primary" type="submit" style={{ marginLeft: 15 }} onClick={onSubmit}>
                    Submit
                </Button>
                <Button color="danger" type="submit" style={{ marginLeft: 15 }} onClick={Back}>
                    Back
                </Button>
            </Row>
        </React.Fragment>
    );
};

export default AddOwner;
