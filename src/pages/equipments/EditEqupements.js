import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput, Input } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';

import PageTitle from '../../components/PageTitle';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom/cjs/react-router-dom';


const EditEquipment = () => {

    let history = useHistory()

    const [values, setValues] = useState({});
    const { id } = useParams()

    const [owner, setOwner] = useState([])
    const [typeofunit, setTypeofunit] = useState([])
    const [vendor, setVendor] = useState([])
    const [client, setClient] = useState([])


    const getOwner = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/owners/show/all`)
            .then(res => {
                setOwner(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getTypeofunit = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/typeofunits/show/all`)
            .then(res => {
                setTypeofunit(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getVendor = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/vendors/show/all`)
            .then(res => {
                setVendor(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getClient = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/clients/show/all`)
            .then(res => {
                setClient(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getEqupementsByid = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/equipments/show/all`)
            .then(res => {
                console.log(res.data.data)
                const filter = res.data.data
                const data = filter.filter(ress => ress.id === parseInt(id))
                console.log(data, "data eqi")
                setValues({
                    equipment_number: data[0].equipment_number,
                    owner_id: data[0].owner_id,
                    type_of_unit_id: data[0].type_of_unit_id,
                    grade: data[0].grade,
                    vendor_id_yard: data[0].vendor_id_yard,
                    client_id_agent: data[0].client_id_agent,
                    status: data[0].status
                })
                setClientselect(data[0].client_id_agent)
                setOwnerselect(data[0].owner_id)
                setTypeofselect(data[0].type_of_unit_id)
                setVendorselect(data[0].vendor_id_yard)
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
        getEqupementsByid()
        console.log(id, "parm  id")
    }, [])

    const [ownerselect, setOwnerselect] = useState('')

    const changeOwner = (event) => {
        setOwnerselect(event.target.value);
        console.log(event.target.value, " select")
    };


    const [typeofselect, setTypeofselect] = useState('')

    const changeType = (event) => {
        setTypeofselect(event.target.value);
        console.log(event.target.value, " select")
    };

    const [vendorselect, setVendorselect] = useState('')

    const changeVendor = (event) => {
        setVendorselect(event.target.value);
        console.log(event.target.value, " select")
    };

    const [clientselect, setClientselect] = useState('')

    const changeClient = (event) => {
        setClientselect(event.target.value);
        console.log(event.target.value, " select")
    };


    const handleChange = (evt) => {

        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value
        });
    }

    const onSubmit = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/equipments/store?equipment_number=${values.equipment_number}&owner_id=${ownerselect}&typeofunit_id=${typeofselect}&grade=${values.grade}&status=${values.status}&vendor_id_yard=${vendorselect}&client_id_agent=${clientselect}&id=${id}`)
            .then(res => {
                console.log("successfully")
                history.push('/equipments')

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
                            { label: 'Equipments', path: '/edit-eqipments/:id' },
                            { label: 'Edit Equipment', path: '/add-equipments', active: true },
                        ]}
                        title={'Add Equipment'}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>

                            <AvForm>

                                <AvField name="equipment_number" label="Equipment Number" type="text" required onChange={handleChange} value={values.equipment_number} />


                                <InputLabel id="demo-simple-select-label">Owner</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={ownerselect}
                                    onChange={changeOwner}
                                    sx={{ width: 150, mb: 5, height: 45 }}

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
                                    sx={{ width: 150, mb: 5, height: 45 }}

                                >
                                    {typeofunit.map((con) => (
                                        <MenuItem value={con.id} key={con.id}>{con.type_of_unit}</MenuItem>

                                    ))}

                                </Select>
                                <br />

                                <AvField name="grade" label="Grade" type="text" required onChange={handleChange} value={values.grade} />

                            </AvForm>
                        </CardBody>
                    </Card>
                </Col>

                <Col lg={6}>
                    <Card>
                        <CardBody>

                            <AvForm>
                                <AvField name="status" label="Status" type="text" required onChange={handleChange} value={values.status} />
                                <InputLabel id="demo-simple-select-label">Vendor</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={vendorselect}
                                    onChange={changeVendor}
                                    sx={{ width: 150, mb: 5, height: 45 }}

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
                                    sx={{ width: 150, mb: 5, height: 45 }}

                                >
                                    {client.map((con) => (
                                        <MenuItem value={con.id} key={con.id}>{con.client_name}</MenuItem>

                                    ))}

                                </Select>
                                <br />



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

export default EditEquipment;
