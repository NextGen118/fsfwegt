import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom/cjs/react-router-dom';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Grid } from '@mui/material';
import { editOwnerApiCall, showAllOwnerApi } from '../../axios/owner/Owner';
import SuccessMsg from '../../components/AlertMsg';

const EditOwner = () => {
    const { id } = useParams();
    const [values, setValues] = useState({
        owner_code: '',
        owner_name: '',
        sub_code: '',
        email: '',
        telephone_number: '',
        fax: '',
        mobile_number: '',
        contact_name: '',
        address: '',
        image: '',
        remarks: '',
    });

    const history = useHistory();


    const [port, setPort] = useState([]);
    const [country, setCountry] = useState([]);
    const [activeselect, setActiveselect] = useState('');
    const changeActive = (event) => {
        setActiveselect(event.target.value);
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

    const getOwnerByid = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/owners/show/all`)
            .then((res) => {
                console.log(res.data.data, "datas")
                const ownerData = res.data.data
                const data = ownerData.filter(ress => ress.id === parseInt(id));

                console.log(data, "data")
                setValues({
                    owner_code: data[0].owner_code,
                    owner_name: data[0].owner_name,
                    sub_code: data[0].sub_code,
                    email: data[0].email,
                    telephone_number: data[0].telephone_number,
                    fax: data[0].fax,
                    mobile_number: data[0].mobile_number,
                    contact_name: data[0].contact_name,
                    address: data[0].address,
                    image: data[0].image,
                    remarks: data[0].remarks,
                });
                setCountryselect(data[0].country_id);
                setPortselect(data[0].port_id);
                setActiveselect(data[0].status);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getCountry();
        getPort();
        getOwnerByid();
        console.log(id, "ir")
    }, []);
    const handleChange = (evt) => {
        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value,
        });
    };

    const [alertSuccess, setAlertSucces] = useState(true);
    const [alertFaild, setAlertFaild] = useState(true);
    const [errorName, setErrorname] = useState('');
    useEffect(() => {
        SuccessMsg('ArrivalNoticies', true, 'error');
        setTimeout(() => {
            SuccessMsg('ArrivalNoticies', false, 'error');
        }, 500);
    });

    function isFormValidate() {
        if (
            !values.date ||
            !values.owner_code ||
            !values.owner_name ||
            !values.sub_code ||
            !values.email ||
            !values.telephone_number ||
            !values.fax ||
            !values.mobile_number ||
            !values.contact_name ||
            !values.address ||
            !values.image ||
            !values.remarks ||
            !countryselect ||
            !portselect ||
            !activeselect
        ) {
            return false;
        }

        return true;
    }

    const onEdit = (event) => {
        let ownerobj = {
            date: values.date,
            owner_code: values.owner_code,
            owner_name: values.owner_name,
            sub_code: values.sub_code,
            email: values.email,
            telephone_number: values.telephone_number,
            fax: values.fax,
            mobile_number: values.mobile_number,
            contact_name: values.contact_name,
            address: values.address,
            image: values.image,
            remarks: values.remarks,
            countryselect: countryselect,
            portselect: portselect,
            activeselect: activeselect,
            id: id,
        };
        console.log(ownerobj, 'owner obj');
        if (isFormValidate) {
            event.preventDefault();
            const editRes = editOwnerApiCall(ownerobj).then((editRes) => {
                console.log(editRes);
                if (editRes.status === 200) {
                    showAllOwnerApi();
                    history.push('/owner');
                    setAlertSucces(false);
                } else {
                    setAlertFaild(false);
                }
            });
        }
    };

    const onBack = () => {
        history.push('/owner');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Owner', path: '/owner' },
                            { label: 'Edit Owner', path: '/owner-add', active: true },
                        ]}
                        title={'Edit Owner'}
                    />
                </Col>
            </Row>
            <Card>
                <CardBody>
                    <AvForm onSubmit={onEdit}>
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
                                        label="Editress"
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
                                    {/* <AvField
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
                                    </AvField> */}

                                    <InputLabel id="demo-simple-select-label">Port *</InputLabel>
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
                                    </Select>
                                </Grid>
                                <Grid mb={2}>
                                    {/* <AvField
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
                                    </AvField> */}

                                    <InputLabel id="demo-simple-select-label">Country *</InputLabel>
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
                                    </Select>
                                </Grid>
                            </Col>

                            <Grid md={12} sx={{ textAlign: 'right' }}>
                                <Button color="danger" style={{ marginLeft: 15 }} onClick={onBack}>
                                    Back
                                </Button>
                                <Button color="primary" type="submit" style={{ marginLeft: 15 }}>
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

export default EditOwner;
