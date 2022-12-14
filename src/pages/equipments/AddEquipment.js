import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput, Input } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';

import PageTitle from '../../components/PageTitle';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const AddEquipment = () => {

    let history = useHistory()

    const [owner, setOwner] = useState([])
    const [typeofunit, setTypeofunit] = useState([])
    const [vendor, setVendor] = useState([])
    const [client, setClient] = useState([])

    const [ownerselect, setOwnerselect] = useState('')
    const [typeofselect, setTypeofselect] = useState('')
    const [clientselect, setClientselect] = useState('')
    const [vendorselect, setVendorselect] = useState('')

    const getOwner = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/owners/show/all`)
            .then(res => {
                setOwner(res.data.data);
                setOwnerselect(res.data.data[0]?.id);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getTypeofunit = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/typeofunits/show/all`)
            .then(res => {
                setTypeofunit(res.data.data);
                setTypeofselect(res.data.data[0]?.id);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getVendor = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/vendors/show/all`)
            .then(res => {
                setVendor(res.data.data);
                setVendorselect(res.data.data[0]?.id);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getClient = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/clients/show/all`)
            .then(res => {
                setClient(res.data.data);
                setClientselect(res.data.data[0]?.id);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getOwner()
        getClient()
        getVendor()
        getTypeofunit()
    }, [])

    const changeOwner = (event) => {
        setOwnerselect(event.target.value);
        console.log(event.target.value, " select")
    };

    const changeType = (event) => {
        setTypeofselect(event.target.value);
        console.log(event.target.value, " select")
    };

    const changeVendor = (event) => {
        setVendorselect(event.target.value);
        console.log(event.target.value, " select")
    };

    const changeClient = (event) => {
        setClientselect(event.target.value);
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
    function isFormValidate() {
        if (
            !values.equipment_number ||
            !ownerselect ||
            !typeofselect ||
            !values.grade ||
            !values.status ||
            !vendorselect ||
            !clientselect
        ) {
            return false;
        }

        return true;
    }

    const onSubmit = () => {
        if (isFormValidate()) {
            axios.post(`${process.env.REACT_APP_BASE_URL}/equipments/store?equipment_number=${values.equipment_number}&owner_id=${ownerselect}&type_of_unit_id=${typeofselect}&grade=${values.grade}&status=${values.status}&vendor_id_yard=${vendorselect}&client_id_agent=${clientselect}`)
                .then(res => {
                    console.log("successfully")
                    history.push('/equipments')

                })
                .catch((error) => {
                    console.log(error);
                });
        }

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
                            { label: 'Equipments', path: '/equipments' },
                            { label: 'Add Equipment', path: '/add-equipments', active: true },
                        ]}
                        title={'Add Equipment'}
                    />
                </Col>
            </Row>
            <AvForm onSubmit={onSubmit}>
                <Row>

                    <Col lg={6}>

                        <Card>
                            <CardBody>


                                <AvField name="equipment_number" label="Equipment Number" type="text" required onChange={handleChange} />

                                <InputLabel id="demo-simple-select-label">Owner</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={ownerselect}
                                    onChange={changeOwner}
                                    fullWidth
                                    sx={{ mb: 5, height: 45 }}

                                >
                                    {owner.map((con) => (
                                        <MenuItem value={con.id} key={con.id}>{con.owner_name}</MenuItem>

                                    ))}

                                </Select>

                                <InputLabel id="demo-simple-select-label">Type of unit</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={typeofselect}
                                    onChange={changeType}
                                    fullWidth
                                    required
                                    sx={{ mb: 5, height: 45 }}

                                >
                                    {typeofunit.map((con) => (
                                        <MenuItem value={con.id} key={con.id}>{con.type_of_unit}</MenuItem>

                                    ))}

                                </Select>
                                <br />

                                <AvField name="grade" label="Grade" type="text" required onChange={handleChange} />


                            </CardBody>
                        </Card>
                    </Col>

                    <Col lg={6}>
                        <Card>
                            <CardBody>
                                <AvField name="status" label="Status" type="text" required onChange={handleChange} />


                                <InputLabel id="demo-simple-select-label">Vendor</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={vendorselect}
                                    onChange={changeVendor}
                                    fullWidth
                                    required
                                    sx={{ mb: 5, height: 45 }}

                                >
                                    {vendor.map((con) => (
                                        <MenuItem value={con.id} key={con.id}>{con.vendor_name}</MenuItem>

                                    ))}

                                </Select>

                                <InputLabel id="demo-simple-select-label">Client</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={clientselect}
                                    onChange={changeClient}
                                    fullWidth
                                    required
                                    sx={{ mb: 5, height: 45 }}

                                >
                                    {client.map((con) => (
                                        <MenuItem value={con.id} key={con.id}>{con.client_name}</MenuItem>

                                    ))}

                                </Select>
                                <br />
                                <Button color="primary" type="submit" style={{ marginLeft: 15 }}>
                                    Submit
                                </Button>
                                <Button color="danger" type="submit" style={{ marginLeft: 15 }} onClick={Back}>
                                    Back
                                </Button>

                            </CardBody>
                        </Card>

                    </Col>

                </Row>
            </AvForm>
        </React.Fragment>
    );
};

export default AddEquipment;
