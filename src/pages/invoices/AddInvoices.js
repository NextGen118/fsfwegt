import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Grid } from '@mui/material';

const AddInvoices = forwardRef((props, ref) => {
    const [values, setValues] = useState({});
    let history = useHistory();

    const handleChange = (evt) => {
        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value,
        });
    };

    useEffect(() => {
        getBilloflanding();
        getIgm();
        getClient();
        getPort();
    }, []);

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
    const [activeselect, setActiveselect] = useState('');
    const changeActive = (event) => {
        setActiveselect(event.target.value);
    };

    const getBilloflanding = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/billoflandings/show/all`)
            .then((res) => {
                setBilloflanding(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getClient = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/clients/show/all`)
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
            .get(`${process.env.REACT_APP_BASE_URL}/ports/show/all`)
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
            .get(`${process.env.REACT_APP_BASE_URL}/igmindiavoyages/show/all`)
            .then((res) => {
                setIgm(res.data.data);
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

    const onSubmit = () => {
        axios
            .post(
                `${process.env.REACT_APP_BASE_URL}/invoices/store?date=${values.date}&invoice_no=${values.invoice_no}&bill_of_landing_id=${billoflandingselect}&client_id_shipper=${clientshipperselect}&client_id_consignee=${clientconsigneeselect}&client_id=${clientselect}&port_id_loading=${port_loadingselect}&port_id_discharge=${port_dischargeselect}&igm_india_voyage_id=${igmselect}&etd_pol=${values.etd_pol}&eta_pod=${values.eta_pod}&st_expire=${values.st_expire}&ata_fpd=${values.ata_fpd}&obl_no=${values.obl_no}&shipment_type=${values.shipment_type}&hbl_no=${values.hbl_no}&carrier=${values.carrier}&nos_units=${values.nos_units}&weight=${values.weight}&cbm=${values.cbm}&remarks=${values.remarks}&usd_rate=${values.usd_rate}&usd_tot=${values.usd_tot}&status=${activeselect}&tax_invoice=${values.tax_invoice}`
            )

            .then((res) => {
                history.push('/invoices');
                console.log('successfully1');
            })
            .catch((error) => {
                console.log(error);
                console.log('error');
            });
    };

    const onBack = () => {
        history.push('/invoices');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <Row>
                        <h3 className="mb-1 mt-0">Add Invoices</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Invoices', path: '/invoices' },
                                { label: 'Add Invoices', path: '/invoices-add', active: true },
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
                                <AvField name="date" label="Date" type="date" required onChange={handleChange} />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="invoice_no"
                                    label="Invoice No"
                                    type="text"
                                    required
                                    onChange={handleChange}
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
                                <AvField
                                    name="etd_pol"
                                    label="ETD (POL)"
                                    type="date"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="eta_pod"
                                    label="ETA (POD)"
                                    type="date"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="st_expire"
                                    label="ST Expire"
                                    type="date"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="ata_fpd"
                                    label="ATA (FPD)"
                                    type="date"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField name="obl_no" label="OBL No" type="text" required onChange={handleChange} />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="shipment_type"
                                    label="Shipment Type"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField name="hbl_no" label="HBL No" type="number" required onChange={handleChange} />
                            </Col>
                            <Col lg={4}>
                                <AvField name="carrier" label="Carrier" type="text" required onChange={handleChange} />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="nos_units"
                                    label="No Units"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField name="weight" label="Weight" type="number" required onChange={handleChange} />
                            </Col>
                            <Col lg={4}>
                                <AvField name="cbm" label="CBM" type="text" required onChange={handleChange} />
                            </Col>
                            <Col lg={4}>
                                <AvField name="remarks" label="Remarks" type="text" required onChange={handleChange} />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="usd_rate"
                                    label="USD Rate"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="usd_tot"
                                    label="Total USD"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>

                            <Col lg={4}>
                                <AvField
                                    name="tax_invoice"
                                    label="Tax Invoice"
                                    type="number"
                                    required
                                    onChange={handleChange}
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
                    <Grid md={12} sx={{ textAlign: 'right' }}>
                        <Button color="danger" type="submit" style={{ marginLeft: 15 }} onClick={onBack}>
                            Back
                        </Button>
                        <Button color="primary" type="submit" style={{ marginLeft: 15 }} onClick={onSubmit}>
                            Submit
                        </Button>
                    </Grid>
                </CardBody>
            </Card>
        </React.Fragment>
    );
});

export default AddInvoices;
