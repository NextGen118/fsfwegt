import React,{useState,useEffect} from "react";
import {Row,Col,Card,CardBody,Button} from 'reactstrap';
import { AvForm,AvField } from "availity-reactstrap-validation";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const AddBilloflandingsubswitches = (props) =>{

    const [values,setValues] = useState({});
    let history = useHistory()

    const handleChange = (evt) => {
        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value
        });
    }

    useEffect(() => {
        getClient()
        getBilloflanding()
        getEquipment()
        getVendor()
    }, [])

    const [clientagent,setClientagent] = useState([])
    const [clientagentselect, setClientagentselect] = useState('')
    const [client_exagent,setClient_exagent] = useState([])
    const [client_exagentselect, setClient_exagentselect] = useState('')

    const [billoflanding,setBilloflanding] = useState([])
    const [billoflandingselect, setBilloflandingselect] = useState('')

    const [equipment,setEquipment] = useState([])
    const [equipmentselect, setEquipmentselect] = useState('')

    const [vendor,setVendor] = useState([])
    const [vendorselect, setVendorselect] = useState('')


    const getClient = () => {
        axios.get(`http://127.0.0.1:8000/api/clients/show/all`)
            .then(res=>{
                setClientagent(res.data.data)
                setClient_exagent(res.data.data)
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    const getBilloflanding = () => {
        axios.get(`http://127.0.0.1:8000/api/billoflandings/show/all`)
            .then(res=>{
                setBilloflanding(res.data.data)
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    const getEquipment = () => {
        axios.get(`http://127.0.0.1:8000/api/equipments/show/all`)
            .then(res=>{
                setEquipment(res.data.data)
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    const getVendor = () => {
        axios.get(`http://127.0.0.1:8000/api/vendors/show/all`)
            .then(res=>{
                setVendor(res.data.data)
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    const changeClientagent = (event) => {
        setClientagentselect(event.target.value);
    }
    const changeClient_exagent = (event) => {
        setClient_exagentselect(event.target.value);
    }

    const changeBilloflanding = (event) => {
        setBilloflandingselect(event.target.value);
    }

    const changeEquipment = (event) => {
        setEquipmentselect(event.target.value);
    }

    const changeVendor = (event) => {
        setVendorselect(event.target.value);
    }
 
    const onSubmit = () =>{
        axios.post(`http://127.0.0.1:8000/api/billoflandingsubswitches/store?bill_of_landing_id=${billoflandingselect}
        &equipment_id=${equipmentselect}&seal_no=${values.seal_no}&marks=${values.marks}&package_quantity=${values.package_quantity}&description=${values.description}
        &gross_weight=${values.gross_weight}&measurement=${values.measurement}&bill_confirmation_id=${values.bill_confirmation_id}&status=${values.status}&ignore_data=${values.ignore_data}
        &reserved_date=${values.reserved_date}&shipper_date=${values.shipper_date}&on_job_date=${values.on_job_date}&yard_in_date=${values.yard_in_date}
        &client_id_agent=${clientagentselect}&client_id_ex_agent=${client_exagentselect}&vendor_id_yard=${vendorselect}&free_days=${values.free_days}&free_days_standard=${values.free_days_standard}
        &ata_fpd=${values.ata_fpd}&payed_till=${values.payed_till}&soa_status_exp=${values.soa_status_exp}&soa_status_imp=${values.soa_status_imp}&lift_on_off=${values.lift_on_off}
        &other_expenses=${values.other_expenses}&other_expenses_remarks=${values.other_expenses_remarks}&deleted=${values.deleted}`)

            .then(res=>{
                history.push('/billoflandingsubswitches')
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    const onBack = () =>{
        history.push('/billoflandingsubswitches')
    }

    return(
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle breadCrumbItems={[
                        {label: 'Bill of landing sub switces',path:'/billoflandingsubswitches'},
                        {label: 'Add Bill of landing sub switch',path:'/add-billoflandingsubswitches',active:true}
                    ]}
                    title={'Add Bill of landing sub switch'}
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
                                    <InputLabel id="demo-simple-select-label">Client Agent</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={clientagentselect} onChange={changeClientagent} sx={{ width: 540, height:36 , mb: 2 }}>{clientagent.map((cag) => (<MenuItem value={cag.id} key={cag.id}>{cag.client_name}</MenuItem>))}</Select>
                                    <InputLabel id="demo-simple-select-label">Bill of landing</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={billoflandingselect} onChange={changeBilloflanding} sx={{ width: 540, height:36 , mb: 2 }}>{billoflanding.map((bill) => (<MenuItem value={bill.id} key={bill.id}>{bill.bill_of_landing_number}</MenuItem>))}</Select>
                                    <InputLabel id="demo-simple-select-label">Vendor</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={vendorselect} onChange={changeVendor} sx={{ width: 540, height:36 , mb: 2 }}>{vendor.map((ven) => (<MenuItem value={ven.id} key={ven.id}>{ven.vendor_name}</MenuItem>))}</Select>
                                    <AvField name="seal_no" label="Seal number" type="text" required onChange={handleChange}/>
                                    <AvField name="marks" label="Marks" type="text" required onChange={handleChange}/>
                                    <AvField name="package_quantity" label="Package quantity" type="number" required onChange={handleChange}/>
                                    <AvField name="description" label="Description" type="text" required onChange={handleChange}/>
                                    <AvField name="gross_weight" label="Gross weight" type="text" required onChange={handleChange}/>
                                    <AvField name="measurement" label="Measurement" type="text" required onChange={handleChange}/>
                                    <AvField name="bill_confirmation_id" label="Bill of confirmation ID" type="number" required onChange={handleChange}/>
                                    <AvField name="ignore_data" label="Ignore data" type="number" required onChange={handleChange}/>
                                    <AvField name="reserved_date" label="Reserved date" type="date" required onChange={handleChange}/>
                                    <AvField name="shipper_date" label="Sipper date" type="date" required onChange={handleChange}/>
                                    <AvField name="on_job_date" label="On the job" type="date" required onChange={handleChange}/>                                    
                                </AvForm>
                            </Col>
                            <Col lg={6}>
                                <AvForm>
                                    <InputLabel id="demo-simple-select-label">Client Ex-Agent</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={client_exagentselect} onChange={changeClient_exagent} sx={{ width: 540, height:36 , mb: 2 }}>{client_exagent.map((ccon) => (<MenuItem value={ccon.id} key={ccon.id}>{ccon.client_name}</MenuItem>))}</Select>
                                    <InputLabel id="demo-simple-select-label">Equipment</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={equipmentselect} onChange={changeEquipment} sx={{ width: 540, height:36 , mb: 2 }}>{equipment.map((equ) => (<MenuItem value={equ.id} key={equ.id}>{equ.equipment_number}</MenuItem>))}</Select>
                                    <AvField name="yard_in_date" label="Yarn in date" type="date" required onChange={handleChange}/>
                                    <AvField name="free_days" label="Free days" type="number" required onChange={handleChange}/>
                                    <AvField name="free_days_standard" label="Free days standard" type="number" required onChange={handleChange}/>
                                    <AvField name="ata_fpd" label="ata FPD" type="date" required onChange={handleChange}/>
                                    <AvField name="payed_till" label="Payed till" type="date" required onChange={handleChange}/>
                                    <AvField name="soa_status_exp" label="Soa status export" type="text" required onChange={handleChange}/>
                                    <AvField name="soa_status_imp" label="Soa status import" type="text" required onChange={handleChange}/>
                                    <AvField name="lift_on_off" label="Lift on off" type="text" required onChange={handleChange}/>
                                    <AvField name="other_expenses" label="Other expensess" type="text" required onChange={handleChange}/>
                                    <AvField name="other_expenses_remarks" label="Other expensess remarks" type="text" required onChange={handleChange}/>
                                    <AvField name="deleted" label="Deleted" type="number" required onChange={handleChange}/>
                                    <AvField name="status" label="Status" type="text" required onChange={handleChange}/>
                                </AvForm>
                            </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Button color="primary" type="submit" onClick={onSubmit}>Submit</Button>&nbsp;
            <Button color="danger" type="submit" onClick={onBack}>Back</Button>    
        </React.Fragment>
    )
}

export default AddBilloflandingsubswitches;