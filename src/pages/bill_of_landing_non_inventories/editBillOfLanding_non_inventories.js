import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const EditdBilloflandings_non_inventories = (props) => {

    const { id } = useParams()
    const [values, setValues] = useState({ date: '',bill_of_landing_number: '',export_references: '',detention_free_days: '',detention_description: '',
    pre_carriage_by: '',place_of_receipt: '',ship_on_board_date: '',
    voyage_number: '',no_of_bls: '',ocean_freight: '',bl_type: '',special_instructions: '',shipper_loaded: '',
    status_1: '',status_2: ''});

    const history = useHistory()

    useEffect(() => {
        getBilloflandingsByid()
        getCountry()
        getPort()
        getClient()
        getIgm()
        getTrafficmode()
        getBookingconfirmation()

    }, [props.id])

    const [country,setCountry] = useState([])
    const [countryselect, setCountryselect] = useState('')
    const [country_release,setCountry_release] = useState([])
    const [country_releaseselect, setCountry_releaseselect] = useState('')
    const [country_ocefrepayable,setCountry_ocefrepayable] = useState([])
    const [country_ocefrepayableselect, setCountry_ocefrepayableselect] = useState('')

    const [port_loading,setPort_loading] = useState([])
    const [port_loadingselect, setPort_loadingselect] = useState('')
    const [port_discharge,setPort_discharge] = useState([])
    const [port_dischargeselect, setPort_dischargeselect] = useState('')
    const [port_finaldest,setPort_finaldest] = useState([])
    const [port_finaldestselect, setPort_finaldestselect] = useState('')
    const [port_loadingbill,setPort_loadingbill] = useState([])
    const [port_loadingbillselect, setPort_loadingbillselect] = useState('')
    const [port_dischargebill,setPort_dischargebill] = useState([])
    const [port_dischargebillselect, setPort_dischargebillselect] = useState('')
    const [port_finaldestbill,setPort_finaldestbill] = useState([])
    const [port_finaldestbillselect, setPort_finaldestbillselect] = useState('')

    const [clientshipper,setClientshipper] = useState([])
    const [clientshipperselect, setClientshipperselect] = useState('')
    const [clientnofify,setClientnofify] = useState([])
    const [clientnofifyselect, setClientnofifyselect] = useState('')
    const [clientagent,setClientagent] = useState([])
    const [clientagentselect, setClientagentselect] = useState('')
    const [clientconsignee,setClientconsignee] = useState([])
    const [clientconsigneeselect, setClientconsigneeselect] = useState('')

    const [igm,setIgm] = useState([])
    const [igmselect, setIgmselect] = useState('')

    const [trafficmode,setTrafficmode] = useState([])
    const [trafficmodeselect, setTrafficmodeselect] = useState('')

    const [bookingconfirmation,setBookingconfirmation] = useState([])
    const [bookingconfirmationselect, setBookingconfirmationselect] = useState('')

    const getCountry = () => {
        axios.get(`http://127.0.0.1:8000/api/countries/show/all`)
            .then(res=>{
                setCountry(res.data.data)
                setCountry_release(res.data.data)
                setCountry_ocefrepayable(res.data.data)
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    const getPort = () => {
        axios.get(`http://127.0.0.1:8000/api/ports/show/all`)
            .then(res=>{
                setPort_loading(res.data.data)
                setPort_discharge(res.data.data)
                setPort_finaldest(res.data.data)
                setPort_loadingbill(res.data.data)
                setPort_dischargebill(res.data.data)
                setPort_finaldestbill(res.data.data)
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    const getClient = () => {
        axios.get(`http://127.0.0.1:8000/api/clients/show/all`)
            .then(res=>{
                setClientshipper(res.data.data)
                setClientnofify(res.data.data)
                setClientagent(res.data.data)
                setClientconsignee(res.data.data)
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    const getIgm = () => {
        axios.get(`http://127.0.0.1:8000/api/igmindiavoyages/show/all`)
            .then(res=>{
                setIgm(res.data.data)
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    const getTrafficmode = () => {
        axios.get(`http://127.0.0.1:8000/api/trafficmodes/show/all`)
            .then(res=>{
                setTrafficmode(res.data.data)
            })
            .catch((error)=>{
                console.log(error);
            });
    }
    const getBookingconfirmation = () => {
        axios.get(`http://127.0.0.1:8000/api/bookingconfirmations/show/all`)
            .then(res=>{
                setBookingconfirmation(res.data.data)
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    const changeCountry = (event) => {
        setCountryselect(event.target.value);
    }
    const changeCountry_release = (event) => {
        setCountry_releaseselect(event.target.value);
    }
    const changeCountry_ocefrepayable = (event) => {
        setCountry_ocefrepayableselect(event.target.value);
    }

    const changePort_loading = (event) => {
        setPort_loadingselect(event.target.value);
    }
    const changePort_discharge = (event) => {
        setPort_dischargeselect(event.target.value);
    }
    const changePort_finaldest = (event) => {
        setPort_finaldestselect(event.target.value);
    }
    const changePort_loadingbill = (event) => {
        setPort_loadingbillselect(event.target.value);
    }
    const changePort_dischargebill = (event) => {
        setPort_dischargebillselect(event.target.value);
    }
    const changePort_finaldestbill = (event) => {
        setPort_finaldestbillselect(event.target.value);
    }

    const changeClientshipper = (event) => {
        setClientshipperselect(event.target.value);
    }
    const changeClientnofify = (event) => {
        setClientnofifyselect(event.target.value);
    }
    const changeClientagent = (event) => {
        setClientagentselect(event.target.value);
    }
    const changeClientconsignee = (event) => {
        setClientconsigneeselect(event.target.value);
    }

    const changeIgm = (event) => {
        setIgmselect(event.target.value);
    }

    const changeTrafficmode = (event) => {
        setTrafficmodeselect(event.target.value);
    }

    const changeBookingconfirmation = (event) => {
        setBookingconfirmationselect(event.target.value);
    }

    const getBilloflandingsByid = () => {
        axios.get(`http://127.0.0.1:8000/api/billoflandingnoninventories/show/all`)
            .then(res => {
                const data = res.data.data.filter(ress => ress.id === parseInt(id))
                setValues({
                    date: data[0].date,
                    bill_of_landing_number: data[0].bill_of_landing_number,
                    export_references: data[0].export_references,
                    detention_free_days: data[0].detention_free_days,
                    detention_description: data[0].detention_description,
                    pre_carriage_by: data[0].pre_carriage_by,
                    place_of_receipt: data[0].place_of_receipt,
                    ship_on_board_date: data[0].ship_on_board_date,
                    voyage_number: data[0].voyage_number,
                    no_of_bls: data[0].no_of_bls,
                    ocean_freight: data[0].ocean_freight,
                    bl_type: data[0].bl_type,
                    special_instructions: data[0].special_instructions,
                    shipper_loaded: data[0].shipper_loaded,
                    status_1: data[0].status_1,
                    status_2: data[0].status_2,
                })
                setCountryselect(data[0].country_id_origin)
                setCountry_releaseselect(data[0].country_id_bltb_released)
                setCountry_ocefrepayableselect(data[0].country_id_ocefrepayable)
                setPort_loadingselect(data[0].port_id_loading)
                setPort_dischargeselect(data[0].port_id_discharge)
                setPort_finaldestselect(data[0].port_id_final_dest)
                setPort_loadingbillselect(data[0].port_id_loading_bl)
                setPort_dischargebillselect(data[0].port_id_discharge_bl)
                setPort_finaldestbillselect(data[0].port_id_final_dest_bl)
                setClientshipperselect(data[0].client_id_shipper)
                setClientnofifyselect(data[0].client_id_notify)
                setClientagentselect(data[0].client_id_fw_agent)
                setClientconsigneeselect(data[0].client_id_consignee)
                setIgmselect(data[0].igm_india_voyage_id)
                setTrafficmodeselect(data[0].traffic_mode_id)
                setBookingconfirmationselect(data[0].booking_confirmation_id)
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
        axios.post(`http://127.0.0.1:8000/api/billoflandingnoninventories/store?date=${values.date}
        &bill_of_landing_number=${values.bill_of_landing_number}&booking_confirmation_id=${bookingconfirmationselect}
        &client_id_shipper=${clientshipperselect}&export_references=${values.export_references}
        &client_id_consignee=${clientconsigneeselect}&client_id_fw_agent=${clientagentselect}
        &client_id_notify=${clientnofifyselect}&port_id_loading=${port_loadingselect}&port_id_discharge=${port_dischargeselect}
        &port_id_final_dest=${port_finaldestselect}&port_id_loading_bl=${port_loadingbillselect}
        &port_id_discharge_bl=${port_dischargebillselect}&port_id_final_dest_bl=${port_finaldestbillselect}
        &detention_free_days=${values.detention_free_days}&detention_description=${values.detention_description}&pre_carriage_by=${values.pre_carriage_by}
        &place_of_receipt=${values.place_of_receipt}&ship_on_board_date=${values.ship_on_board_date}
        &country_id_origin=${countryselect}&country_id_bltb_released=${country_releaseselect}
        &igm_india_voyage_id=${igmselect}&voyage_number=${values.voyage_number}&ocean_freight=${values.ocean_freight}
        &country_id_ocefrepayable=${country_ocefrepayableselect}&traffic_mode_id=${trafficmodeselect}
        &no_of_bls=${values.no_of_bls}&bl_type=${values.bl_type}&special_instructions=${values.special_instructions}&shipper_loaded=${values.shipper_loaded}
        &status_1=${values.status_1}&status_2=${values.status_2}&id=${id}`)
            .then(res => {
                history.push('/billoflandingnoninventories')
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const onBack = () =>{
        history.push('/billoflandingnoninventories')
    }

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Bill of landing non inventories', path: '/billoflandingnoninventories' },
                            { label: 'Edit bill of landing non inventory', path: '/edit-billoflandingnoninventories/:id', active: true },
                        ]}
                        title={'Edit Bill of landing non inentory'}
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
                                    <AvField name="date" label="Date" type="date" required onChange={handleChange} value={values.date}/>
                                                        
                                    <InputLabel id="demo-simple-select-label">Client Shipper</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={clientshipperselect} onChange={changeClientshipper} sx={{ width: 540, height:36 , mb: 2 }}>{clientshipper.map((cshi) => (<MenuItem value={cshi.id} key={cshi.id}>{cshi.client_name}</MenuItem>))}</Select>
                                    <InputLabel id="demo-simple-select-label">Client Consignee</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={clientconsigneeselect} onChange={changeClientconsignee} sx={{ width: 540, height:36 , mb: 2 }}>{clientconsignee.map((ccon) => (<MenuItem value={ccon.id} key={ccon.id}>{ccon.client_name}</MenuItem>))}</Select>
                                    <InputLabel id="demo-simple-select-label">Client Agent</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={clientagentselect} onChange={changeClientagent} sx={{ width: 540, height:36 , mb: 2 }}>{clientagent.map((cage) => (<MenuItem value={cage.id} key={cage.id}>{cage.client_name}</MenuItem>))}</Select>
                                    <InputLabel id="demo-simple-select-label">Client Notify</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={clientnofifyselect} onChange={changeClientnofify} sx={{ width: 540, height:36 , mb: 2 }}>{clientnofify.map((cnot) => (<MenuItem value={cnot.id} key={cnot.id}>{cnot.client_name}</MenuItem>))}</Select>
                        
                                    <InputLabel id="demo-simple-select-label">Booking Confirmation</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={bookingconfirmationselect} onChange={changeBookingconfirmation} sx={{ width: 540, height:36 , mb: 2 }}>{bookingconfirmation.map((booking) => (<MenuItem value={booking.id} key={booking.id}>{booking.booking_confirmation_number}</MenuItem>))}</Select>

                                    <InputLabel id="demo-simple-select-label">Country Origin</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={countryselect} onChange={changeCountry} sx={{ width: 540, height:36 , mb: 2 }}>{country.map((con) => (<MenuItem value={con.id} key={con.id}>{con.country_name}</MenuItem>))}</Select>
                                    <InputLabel id="demo-simple-select-label">Country Release</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={country_releaseselect} onChange={changeCountry_release} sx={{ width: 540, height:36 , mb: 2 }}>{country_release.map((crel) => (<MenuItem value={crel.id} key={crel.id}>{crel.country_name}</MenuItem>))}</Select>
                                    <InputLabel id="demo-simple-select-label">Country Ocefrepayable</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={country_ocefrepayableselect} onChange={changeCountry_ocefrepayable} sx={{ width: 540, height:36 , mb: 2 }}>{country_ocefrepayable.map((coce) => (<MenuItem value={coce.id} key={coce.id}>{coce.country_name}</MenuItem>))}</Select>

                                    <InputLabel id="demo-simple-select-label">Port Landing</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={port_loadingselect} onChange={changePort_loading} sx={{ width: 540, height:36, mb: 2 }}>{port_loading.map((por) => (<MenuItem value={por.id} key={por.id}>{por.port_name}</MenuItem>))}</Select>
                                    <InputLabel id="demo-simple-select-label">Port Discharge</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={port_dischargeselect} onChange={changePort_discharge} sx={{ width: 540, height:36, mb: 2 }}>{port_discharge.map((por) => (<MenuItem value={por.id} key={por.id}>{por.port_name}</MenuItem>))}</Select>
                                    <InputLabel id="demo-simple-select-label">Port Finaldest</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={port_finaldestselect} onChange={changePort_finaldest} sx={{ width: 540, height:36, mb: 2 }}>{port_finaldest.map((por) => (<MenuItem value={por.id} key={por.id}>{por.port_name}</MenuItem>))}</Select>
                                    <InputLabel id="demo-simple-select-label">Port Landing Bill</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={port_loadingbillselect} onChange={changePort_loadingbill} sx={{ width: 540, height:36, mb: 2 }}>{port_loadingbill.map((por) => (<MenuItem value={por.id} key={por.id}>{por.port_name}</MenuItem>))}</Select>
                                    <InputLabel id="demo-simple-select-label">Port Discharge Bill</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={port_dischargebillselect} onChange={changePort_dischargebill} sx={{ width: 540, height:36, mb: 2 }}>{port_dischargebill.map((por) => (<MenuItem value={por.id} key={por.id}>{por.port_name}</MenuItem>))}</Select>
                                    <InputLabel id="demo-simple-select-label">Port Finaldest Bill</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={port_finaldestbillselect} onChange={changePort_finaldestbill} sx={{ width: 540, height:36, mb: 2 }}>{port_finaldestbill.map((por) => (<MenuItem value={por.id} key={por.id}>{por.port_name}</MenuItem>))}</Select>

                                    <InputLabel id="demo-simple-select-label">IGM voyage</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={igmselect} onChange={changeIgm} sx={{ width: 540, height:36 , mb: 2 }}>{igm.map((igm) => (<MenuItem value={igm.id} key={igm.id}>{igm.voyage}</MenuItem>))}</Select>
                                </AvForm>
                            </Col>
                            <Col lg={6}>
                                <AvForm>
                                    <AvField name="bill_of_landing_number" label="Bill of landing number" type="text" required onChange={handleChange} value={values.bill_of_landing_number}/>
                                    <AvField name="export_references" label="Export references" type="text" required onChange={handleChange} value={values.export_references}/>
                                    <AvField name="detention_free_days" label="Detention free days" type="number" required onChange={handleChange} value={values.detention_free_days}/>
                                    <AvField name="detention_description" label="detention description" type="text" required onChange={handleChange} value={values.detention_description}/>
                                    <AvField name="pre_carriage_by" label="Pre carriage by" type="text" required onChange={handleChange} value={values.pre_carriage_by}/>
                                    <AvField name="place_of_receipt" label="Place of receipt" type="text" required onChange={handleChange} value={values.place_of_receipt}/>
                                    <AvField name="ship_on_board_date" label="Ship on board date" type="date" required onChange={handleChange} value={values.ship_on_board_date}/>
                                    <AvField name="voyage_number" label="Voyaye number" type="text" required onChange={handleChange} value={values.voyage_number}/>
                                    <AvField name="no_of_bls" label="Number of bills" type="number" required onChange={handleChange} value={values.no_of_bls}/>
                                    <AvField name="ocean_freight" label="Ocean freight" type="text" required onChange={handleChange} value={values.ocean_freight}/>
                                    <AvField name="bl_type" label="Bill type" type="text" required onChange={handleChange} value={values.bl_type}/>
                                    <AvField name="special_instructions" label="Special Instructions" type="text" required onChange={handleChange} value={values.special_instructions}/>
                                    <AvField name="shipper_loaded" label="Shipper loaded" type="number" required onChange={handleChange} value={values.shipper_loaded}/>                                  
                                    <AvField name="status_1" label="Status 1" type="text" required onChange={handleChange} value={values.status_1}/>
                                    <AvField name="status_2" label="Status 2" type="text" required onChange={handleChange} value={values.status_2}/>
                                    <InputLabel id="demo-simple-select-label">Trafficmode</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={trafficmodeselect} onChange={changeTrafficmode} sx={{ width: 540, height:36 , mb: 2 }}>{trafficmode.map((traf) => (<MenuItem value={traf.id} key={traf.id}>{traf.trafficmode_type}</MenuItem>))}</Select>                               
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

export default EditdBilloflandings_non_inventories;