import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Row, Col, Card, CardBody, InputGroupAddon, Label, CustomInput, Input, Button } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { FormGroup, Grid, FormControl, TextField, MenuItem, InputLabel, Select, useStepContext } from '@mui/material';
import axios from 'axios';

import PageTitle from '../../components/PageTitle';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { createOwnerApiCall, showAllOwnerApi } from '../../axios/owner/Owner';

import SuccessMsg from '../../components/AlertMsg';
import { create } from 'sortablejs';

const AddOwner = () => {
    let history = useHistory();

    const [port, setPort] = useState([]);
    const [country, setCountry] = useState([]);

    const [activate, setActivate] = useState([
        { Key: 1, Value: 'Activate' },
        { Key: 2, Value: 'De Active' },
    ]);

    const [alertSuccess, setAlertSucces] = useState(true);
    const [alertFaild, setAlertFaild] = useState(true);
    const [errorName, setErrorname] = useState('');

    const getPort = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/ports/show/all`)
            .then((res) => {
                setPort(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getCountry = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/countries/show/all`)
            .then((res) => {
                setCountry(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getCountry();
        getPort();
    }, []);

    const [ownerselect, setOwnerselect] = useState('');

    const changeOwner = (event) => {
        setOwnerselect(event.target.value);
        console.log(event.target.value, ' select');
    };

    const [countryselect, setCountryselect] = useState('');
    const changeCountry = (event) => {
        setCountryselect(event.target.value);
        console.log(event.target.value, 'country select');
    };

    const [portselect, setPortselect] = useState('');
    const changePort = (event) => {
        setPortselect(event.target.value);
        console.log(event.target.value, 'country select');
    };

    const [activeselect, setActiveselect] = useState('');

    const changeActive = (event) => {
        setActiveselect(event.target.value);
        console.log(event.target.value, ' select');
    };

    const [values, setValues] = useState({});

    const handleChange = (evt) => {
        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value,
        });
    };

    useEffect(() => {
        SuccessMsg('Owner', true, 'error');
        setTimeout(() => {
            SuccessMsg('Owner', false, 'error');
        }, 500);
    });

    function isFormValidate() {
        if (
            !values.remarks ||
            !values.address ||
            !values.contact_name ||
            !values.fax ||
            !values.owner_code ||
            !values.sub_code ||
            !countryselect ||
            !portselect ||
            !values.telephone_number ||
            !values.mobile_number
        ) {
            return false;
        }

        return true;
    }

    const onAdd = (event) => {
        let ownerobj = {
            owner_code: values.owner_code,
            sub_code: values.sub_code,
            countryselect: countryselect,
            portselect: portselect,
            email: values.email,
            telephone_number: values.telephone_number,
            mobile_number: values.mobile_number,
            fax: values.fax,
            owner_name: values.owner_name,
            address: values.address,
            remarks: values.remarks,
            activeselect: 1,
        };
        console.log(ownerobj, 'owner obj');
        if (isFormValidate) {
            event.preventDefault();
            const createRes = createOwnerApiCall(ownerobj).then((createRes) => {
                console.log(createRes);
                if (createRes.status === 200) {
                    showAllOwnerApi();
                    history.push('/owner');
                    setAlertSucces(false);
                } else {
                    setAlertFaild(false);
                }
            });
        }
    };

    const Back = () => {
        history.push('/owner');
    };

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
                    <AvForm onSubmit={onAdd}>
                        <Grid container spacing={2}>
                            <Col lg={4} style={{ padding: '25px' }}>
                                <Grid mb={2}>
                                    <AvField
                                        name="owner_code"
                                        label="Owner Code"
                                        type="text"
                                        id="outlined-required"
                                        required
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid mb={2}>
                                    <AvField
                                        name="owner_name"
                                        label="Owner Name"
                                        type="text"
                                        required
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid mb={2}>
                                    <AvField
                                        name="sub_code"
                                        label="Sub Code"
                                        type="text"
                                        required
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid mb={2}>
                                    <AvField name="email" label="Email" type="email" required onChange={handleChange} />
                                </Grid>
                            </Col>

                            <Col lg={4} style={{ padding: '25px' }}>
                                <Grid mb={2}>
                                    <AvField
                                        name="mobile_number"
                                        label="Mobile Number"
                                        type="mobile"
                                        required
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid mb={2}>
                                    <AvField
                                        name="address"
                                        label="Address"
                                        type="text"
                                        required
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid mb={2}>
                                    <AvField
                                        name="Remarks"
                                        label="remarks"
                                        type="text"
                                        required
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid mb={2}>
                                    <AvField
                                        name="contact_name"
                                        label="Contact Name"
                                        type="text"
                                        required
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Col>

                            <Col lg={4} style={{ padding: '25px' }}>
                                <Grid mb={2}>
                                    <AvField
                                        name="telephone_number"
                                        label="Telephone Number"
                                        type="mobile"
                                        required
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid mb={2}>
                                    <AvField name="fax" label="Fax" type="text" required onChange={handleChange} />
                                </Grid>

                                <Grid mb={2}>
                                    <AvField
                                        type="select"
                                        value={portselect}
                                        onChange={changePort}
                                        required
                                        label="Country"
                                        name="selectport">
                                        {port.map((con) => (
                                            <option value={con.id} key={con.id}>
                                                {' '}
                                                {con.port_name}
                                            </option>
                                        ))}
                                    </AvField>

                                    {/* <InputLabel id="demo-simple-select-label">Port *</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={portselect}
                                        onChange={changePort}
                                        sx={{ width: '100%', height: 40 }}
                                        label="Port">
                                        {port.map((con) => (
                                            <MenuItem value={con.id} key={con.id}>
                                                {con.port_name}
                                            </MenuItem>
                                        ))}
                                    </Select> */}
                                </Grid>
                                <Grid mb={2}>
                                    <AvField
                                        type="select"
                                        value={countryselect}
                                        required
                                        onChange={changeCountry}
                                        label="Country"
                                        name="selectcountry">
                                        {country.map((con) => (
                                            <option value={con.id} key={con.id}>
                                                {' '}
                                                {con.country_name}
                                            </option>
                                        ))}
                                    </AvField>

                                    {/* <InputLabel id="demo-simple-select-label">Country *</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={countryselect}
                                        onChange={changeCountry}
                                        sx={{ width: '100%', height: 40 }}
                                        required
                                        label="Country">
                                        {country.map((con) => (
                                            <MenuItem value={con.id} key={con.id}>
                                                {con.country_name}
                                            </MenuItem>
                                        ))}
                                    </Select> */}
                                </Grid>
                            </Col>

                            <Grid md={12} sx={{ textAlign: 'right' }}>
                                <Button color="danger" style={{ marginLeft: 15 }} onClick={Back}>
                                    Back
                                </Button>
                                <Button color="primary" type="submit" style={{ marginLeft: 15 }} onClick={AddOwner}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </AvForm>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default AddOwner;
