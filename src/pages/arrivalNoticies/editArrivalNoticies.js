import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const EditArrivalNoticies = (props) => {
    const { id } = useParams();
    const [values, setValues] = useState({
        date: '',
        arrival_notice_no: '',
        etd_pol: '',
        eta_pod: '',
        st_expire: '',
        ata_fpd: '',
        obl_no: '',
        shipment_type: '',
        hbl_no: '',
        carrier: '',
        nos_units: '',
        weight: '',
        cbm: '',
        remarks: '',
        usd_rate: '',
        usd_tot: '',
        status: '',
        tax_invoice: '',
    });

    const history = useHistory();

    useEffect(() => {
        getBilloflanding();
        getIgm();
        getClient();
        getPort();
        getArrivalNoticiesByid();
        getVendor();
    }, [props.id]);

    const [billoflanding, setBilloflanding] = useState([]);
    const [billoflandingselect, setBilloflandingselect] = useState('');
    const [clientshipper, setClientshipper] = useState([]);
    const [clientshipperselect, setClientshipperselect] = useState('');
    const [client, setClient] = useState([]);
    const [clientselect, setClientselect] = useState('');
    const [clientconsignee, setClientconsignee] = useState([]);
    const [clientconsigneeselect, setClientconsigneeselect] = useState('');
    const [port_loading, setPort_loading] = useState([]);
    const [port_loadingselect, setPort_loadingselect] = useState('');
    const [port_discharge, setPort_discharge] = useState([]);
    const [port_dischargeselect, setPort_dischargeselect] = useState('');
    const [igm, setIgm] = useState([]);
    const [igmselect, setIgmselect] = useState('');
    const [vendor, setVendor] = useState([]);
    const [vendorselect, setVendorselect] = useState('');
    const [activeselect, setActiveselect] = useState('');
    const changeActive = (event) => {
        setActiveselect(event.target.value);
    };
    const getBilloflanding = () => {
        axios
            .get(`http://127.0.0.1:8000/api/billoflandings/show/all`)
            .then((res) => {
                setBilloflanding(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getClient = () => {
        axios
            .get(`http://127.0.0.1:8000/api/clients/show/all`)
            .then((res) => {
                setClientshipper(res.data.data);
                setClientconsignee(res.data.data);
                setClient(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getPort = () => {
        axios
            .get(`http://127.0.0.1:8000/api/ports/show/all`)
            .then((res) => {
                setPort_loading(res.data.data);
                setPort_discharge(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getIgm = () => {
        axios
            .get(`http://127.0.0.1:8000/api/igmindiavoyages/show/all`)
            .then((res) => {
                setIgm(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getVendor = () => {
        axios
            .get(`http://127.0.0.1:8000/api/vendors/show/all`)
            .then((res) => {
                setVendor(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const changeBilloflanding = (event) => {
        setBilloflandingselect(event.target.value);
    };
    const changeClientshipper = (event) => {
        setClientshipperselect(event.target.value);
    };
    const changeClient = (event) => {
        setClientselect(event.target.value);
    };
    const changeClientconsignee = (event) => {
        setClientconsigneeselect(event.target.value);
    };
    const changePort_loading = (event) => {
        setPort_loadingselect(event.target.value);
    };
    const changePort_discharge = (event) => {
        setPort_dischargeselect(event.target.value);
    };
    const changeIgm = (event) => {
        setIgmselect(event.target.value);
    };
    const changeVendor = (event) => {
        setVendorselect(event.target.value);
    };

    const getArrivalNoticiesByid = () => {
        axios
            .get(`http://127.0.0.1:8000/api/arivalnotices/show/all`)
            .then((res) => {
                const data = res.data.data.filter((ress) => ress.id === parseInt(id));
                setValues({
                    date: data[0].date,
                    arrival_notice_no: data[0].arrival_notice_no,
                    etd_pol: data[0].etd_pol,
                    eta_pod: data[0].eta_pod,
                    st_expire: data[0].st_expire,
                    ata_fpd: data[0].ata_fpd,
                    obl_no: data[0].obl_no,
                    shipment_type: data[0].shipment_type,
                    hbl_no: data[0].hbl_no,
                    carrier: data[0].carrier,
                    nos_units: data[0].nos_units,
                    weight: data[0].weight,
                    cbm: data[0].cbm,
                    remarks: data[0].remarks,
                    usd_rate: data[0].usd_rate,
                    usd_tot: data[0].usd_tot,
                    status: data[0].status,
                    tax_invoice: data[0].tax_invoice,
                });
                setBilloflandingselect(data[0].bill_of_landing_id);
                setClientshipperselect(data[0].client_id_shipper);
                setClientconsigneeselect(data[0].client_id_consignee);
                setClientselect(data[0].client_id);
                setPort_loadingselect(data[0].port_id_loading);
                setPort_dischargeselect(data[0].port_id_discharge);
                setIgmselect(data[0].igm_india_voyage_id);
                setVendorselect(data[0].vendor_id_yard);
                setActiveselect(data[0].status);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChange = (evt) => {
        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value,
        });
    };

    const submitEdit = () => {
        axios
            .post(
                `http://127.0.0.1:8000/api/arivalnotices/store?date=${values.date}&arrival_notice_no=${values.arrival_notice_no}&bill_of_landing_id=${billoflandingselect}&client_id_shipper=${clientshipperselect}&client_id_consignee=${clientconsigneeselect}&client_id=${clientselect}&port_id_loading=${port_loadingselect}&port_id_discharge=${port_dischargeselect}&igm_india_voyage_id=${igmselect}&etd_pol=${values.etd_pol}&eta_pod=${values.eta_pod}&st_expire=${values.st_expire}&ata_fpd=${values.ata_fpd}&obl_no=${values.obl_no}&shipment_type=${values.shipment_type}&hbl_no=${values.hbl_no}&carrier=${values.carrier}&nos_units=${values.nos_units}&weight=${values.weight}&vendor_id_yard=${vendorselect}&remarks=${values.remarks}&usd_rate=${values.usd_rate}&usd_tot=${values.usd_tot}&status=${activeselect}&id=${id}`
            )
            .then((res) => {
                history.push('/arrivalNoticies');
                console.log('successfully1');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onBack = () => {
        history.push('/arrivalNoticies');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <Row>
                        <h3 className="mb-1 mt-0">Edit Arrival Noticies</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Arrival Noticies', path: '/arrivalNoticies' },
                                { label: 'Edit Arrival Noticies', path: '/arrivalNoticies-add', active: true },
                            ]}
                        />
                    </Row>
                </Col>
            </Row>
            <Card>
                <CardBody>
                    <AvForm>
                        <Row>
                            <Col lg={4}>
                                <AvField
                                    name="date"
                                    label="Date"
                                    type="date"
                                    required
                                    onChange={handleChange}
                                    value={values.date}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="arrival_notice_no"
                                    label="Arrival Notice No"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.arrival_notice_no}
                                />
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Bill of Landing</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={billoflandingselect}
                                    onChange={changeBilloflanding}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {billoflanding.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.bill_of_landing_number}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Shipper Client</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={clientshipperselect}
                                    onChange={changeClientshipper}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {clientshipper.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.client_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Client</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={clientselect}
                                    onChange={changeClient}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {client.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.client_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Consignee Client</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={clientconsigneeselect}
                                    onChange={changeClientconsignee}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {clientconsignee.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.client_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Loading Port</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={port_loadingselect}
                                    onChange={changePort_loading}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {port_loading.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.port_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Discharge Port</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={port_dischargeselect}
                                    onChange={changePort_discharge}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {port_discharge.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.port_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">IGM India Voyage</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={igmselect}
                                    onChange={changeIgm}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {igm.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.voyage}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Vendor Yard</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={vendorselect}
                                    onChange={changeVendor}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {vendor.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.vendor_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>

                            <Col lg={4}>
                                <AvField
                                    name="etd_pol"
                                    label="ETD (POL)"
                                    type="date"
                                    required
                                    onChange={handleChange}
                                    value={values.etd_pol}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="eta_pod"
                                    label="ETA (POD)"
                                    type="date"
                                    required
                                    onChange={handleChange}
                                    value={values.eta_pod}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="st_expire"
                                    label="ST Expire"
                                    type="date"
                                    required
                                    onChange={handleChange}
                                    value={values.st_expire}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="ata_fpd"
                                    label="ATA (FPD)"
                                    type="date"
                                    required
                                    onChange={handleChange}
                                    value={values.ata_fpd}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="obl_no"
                                    label="OBL No"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.obl_no}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="shipment_type"
                                    label="Shipment Type"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.shipment_type}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="hbl_no"
                                    label="HBL No"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.hbl_no}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="carrier"
                                    label="Carrier"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.carrier}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="nos_units"
                                    label="No Units"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.nos_units}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="weight"
                                    label="Weight"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.weight}
                                />
                            </Col>

                            <Col lg={4}>
                                <AvField
                                    name="remarks"
                                    label="Remarks"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.remarks}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="usd_rate"
                                    label="USD Rate"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.usd_rate}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="usd_tot"
                                    label="Total USD"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.usd_tot}
                                />
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={activeselect}
                                    onChange={changeActive}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    <MenuItem value={1}>Active</MenuItem>
                                    <MenuItem value={0}>Inactive</MenuItem>
                                </Select>
                            </Col>
                        </Row>
                    </AvForm>
                    <Button color="primary" type="submit" onClick={() => submitEdit()}>
                        Edit
                    </Button>
                    &nbsp;
                    <Button color="danger" type="submit" onClick={onBack}>
                        Back
                    </Button>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default EditArrivalNoticies;
