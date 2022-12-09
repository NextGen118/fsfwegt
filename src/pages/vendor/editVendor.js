import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const EditVendors = (props) => {

    const { id } = useParams()
    const [values, setValues] = useState({ vendor_code: '',vendor_name: '',sub_code: '',country_id: '',port_id: '',currency_id: '',email: '',telephone_number: '',fax: '',mobile_number: '',contact_name: '',remarks: '',is_active: '',address: '' });

    const history = useHistory()

    useEffect(() => {
        getVendorsByid()
        getCountry()
        getPort()
    }, [props.id])

    const [country,setCountry] = useState([])
    const [countryselect, setCountryselect] = useState('')

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
    const changePort = (event) => {
        setPortselect(event.target.value);
    }
    const changeActive = (event) => {
        setActiveselect(event.target.value);
    }

    const getVendorsByid = () => {
        axios.get(`http://127.0.0.1:8000/api/vendors/show/all`)
            .then(res => {
                const data = res.data.data.filter(ress => ress.id === parseInt(id))
                console.log(data, 'edit data')
                setValues({
                    vendor_code: data[0].vendor_code,
                    vendor_name: data[0].vendor_name,
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
                setCountryselect(data[0].country_id)
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

    const submitEdit = () => {
        axios.post(`http://127.0.0.1:8000/api/vendors/store?vendor_code=${values.vendor_code}
        &vendor_name=${values.vendor_name}&sub_code=${values.sub_code}&country_id=${countryselect}&port_id=${portselect}&email=${values.email}&telephone_number=${values.telephone_number}
        &fax=${values.fax}&mobile_number=${values.mobile_number}&contact_name=${values.contact_name}&address=${values.address}&image=&remarks=${values.remarks}&is_active=${activeselect}&id=${id}`)
            .then(res => {
                history.push('/vendors')
                console.log("success to edit")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const onBack = () =>{
        history.push('/vendors')
    }

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Vendors', path: '/vendors' },
                            { label: 'Edit Vendor', path: '/edit-vendors/:id', active: true },
                        ]}
                        title={'Edit Vendor'}
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
                                        <AvField name="vendor_code" label="Vendor Code" type="text" required onChange={handleChange} value={values.vendor_code}/>
                                        <AvField name="vendor_name" label="Vendor Name" type="text" required onChange={handleChange} value={values.vendor_name}/>
                                        <AvField name="contact_name" label="Contact Name" type="text" required onChange={handleChange} value={values.contact_name}/>
                                        <AvField name="sub_code" label="Sub Code" type="text" required onChange={handleChange} value={values.sub_code}/>
                                        <AvField name="email" label="Email" type="email" required onChange={handleChange} value={values.email}/>
                                        <AvField name="telephone_number" label="Telephone Number" type="text" required onChange={handleChange} value={values.telephone_number}/>
                                        <AvField name="mobile_number" label="Mobile Number" type="text" required onChange={handleChange} value={values.mobile_number}/>               
                                    </AvForm>
                                </Col>
                                <Col lg={6}>
                                    <AvForm>
                                        <AvField name="fax" label="Fax" type="text" required onChange={handleChange} value={values.fax}/>            
                                        <AvField name="address" label="Address" type="text" required onChange={handleChange} value={values.address}/>
                                        <InputLabel id="demo-simple-select-label">Country</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={countryselect} onChange={changeCountry} sx={{  width: 540, height:36 , mb: 2 }}>{country.map((con) => (<MenuItem value={con.id} key={con.id}>{con.country_name}</MenuItem>))}</Select>
                                        <InputLabel id="demo-simple-select-label">Port</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={portselect} onChange={changePort} sx={{ width: 540, height:36 , mb: 2 }}>{port.map((por) => (<MenuItem value={por.id} key={por.id}>{por.port_name}</MenuItem>))}</Select>  
                                        <AvField name="remarks" label="Remarks" type="text" required onChange={handleChange} value={values.remarks}/>
                                        <InputLabel id="demo-simple-select-label">Active</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={activeselect} onChange={changeActive} sx={{ width: 540, height:36 , mb: 2 }}><MenuItem value={1}>Active</MenuItem><MenuItem value={0}>Inactive</MenuItem></Select>
                                    </AvForm>
                                </Col>
                            </Row>                       
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Button color="primary" type="submit" onClick={() => submitEdit()}>Edit</Button>&nbsp;
            <Button color="danger" type="submit" onClick={onBack}>Back</Button>
        </React.Fragment >
    );
}

export default EditVendors;