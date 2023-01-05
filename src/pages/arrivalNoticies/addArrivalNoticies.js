import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Grid } from '@mui/material';
import { createarrivalNoticiesApiCall, showAllArrivalNoticiesApi } from '../../axios/arrivalNoticies/ArrivalNoticies';
import SuccessMsg from '../../components/AlertMsg';

const AddArrivalNoticies = forwardRef((props, ref) => {
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
        getVendor();
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
    const [vendor, setVendor] = useState([]);
    const [vendorselect, setVendorselect] = useState('');
    const changeActive = (event) => {
        setActiveselect(event.target.value);
    };

    const getBilloflanding = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/billoflandings/show/all`)
            .then((res) => {
                setBilloflanding(res.data.data);
                setBilloflandingselect(res.data.data[0]?.id);
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
                setClientshipperselect(res.data.data[0]?.id);

                setClientconsignee(res.data.data);
                setClientconsigneeselect(res.data.data[0]?.id);

                setClient(res.data.data);
                setClientselect(res.data.data[0]?.id);
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
                setPort_loadingselect(res.data.data[0]?.id);

                setPort_discharge(res.data.data);
                setPort_dischargeselect(res.data.data[0]?.id);
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
                setIgmselect(res.data.data[0]?.id);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getVendor = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/vendors/show/all`)
            .then((res) => {
                setVendor(res.data.data);
                setVendorselect(res.data.data[0]?.id);
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
            !values.arrival_notice_no ||
            !values.etd_pol ||
            !values.eta_pod ||
            !values.st_expire ||
            !values.ata_fpd ||
            !values.obl_no ||
            !values.shipment_type ||
            !values.hbl_no ||
            !values.carrier ||
            !values.nos_units ||
            !values.weight ||
            !values.cbm ||
            !values.remarks ||
            !values.usd_rate ||
            !values.usd_tot ||
            !values.tax_invoice ||
            !billoflandingselect ||
            !clientshipperselect ||
            !clientselect ||
            !clientconsigneeselect ||
            !port_loadingselect ||
            !port_dischargeselect ||
            !igmselect ||
            !vendorselect ||
            !activeselect
        ) {
            return false;
        }

        return true;
    }

    const onAdd = (event) => {
        let arrivalNoticiesobj = {
            date: values.date,
            arrival_notice_no: values.arrival_notice_no,
            etd_pol: values.etd_pol,
            eta_pod: values.eta_pod,
            st_expire: values.st_expire,
            ata_fpd: values.ata_fpd,
            obl_no: values.obl_no,
            shipment_type: values.shipment_type,
            hbl_no: values.hbl_no,
            carrier: values.carrier,
            nos_units: values.nos_units,
            weight: values.weight,
            cbm: values.cbm,
            remarks: values.remarks,
            usd_rate: values.usd_rate,
            usd_tot: values.usd_tot,
            tax_invoice: values.tax_invoice,
            billoflandingselect: billoflandingselect,
            clientshipperselect: clientshipperselect,
            clientselect: clientselect,
            clientconsigneeselect: clientconsigneeselect,
            port_loadingselect: port_loadingselect,
            port_dischargeselect: port_dischargeselect,
            igmselect: igmselect,
            vendorselect: vendorselect,
            activeselect: 1,
        };
        console.log(arrivalNoticiesobj, 'arrivalNoticies obj');
        if (isFormValidate) {
            event.preventDefault();
            const createRes = createarrivalNoticiesApiCall(arrivalNoticiesobj).then((createRes) => {
                console.log(createRes);
                if (createRes.status === 200) {
                    showAllArrivalNoticiesApi();
                    history.push('/arrivalNoticies');
                    setAlertSucces(false);
                } else {
                    setAlertFaild(false);
                }
            });
        }
    };

    const onBack = () => {
        history.push('/arrivalNoticies');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <Row>
                        <h3 className="mb-1 mt-0">Add Arrival Noticies</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Arrival Noticies', path: '/arrivalNoticies' },
                                { label: 'Add Arrival Noticies', path: '/arrivalNoticies-add', active: true },
                            ]}
                        />
                    </Row>
                </Col>
            </Row>

            <Card>
                <CardBody>
                    <AvForm onSubmit={onAdd}>
                        <Row>
                            <Col lg={4}>
                                <AvField name="date" label="Date" type="date" required onChange={handleChange} />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="arrival_notice_no"
                                    label="Arrival Notice No"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>

                            <Col lg={4}>
                                <AvField
                                    type="select"
                                    value={billoflandingselect}
                                    required
                                    onChange={changeBilloflanding}
                                    label="Bill of Landing *"
                                    name="selectbilloflanding">
                                    {billoflanding.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.bill_of_landing_number}
                                        </option>
                                    ))}
                                </AvField>
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    type="select"
                                    value={clientshipperselect}
                                    required
                                    onChange={changeClientshipper}
                                    label="Shipper Client *"
                                    name="selectclientshipper">
                                    {clientshipper.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.client_name}
                                        </option>
                                    ))}
                                </AvField>
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    type="select"
                                    value={clientselect}
                                    required
                                    onChange={changeClient}
                                    label="Client *"
                                    name="selectclient">
                                    {client.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.client_name}
                                        </option>
                                    ))}
                                </AvField>
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    type="select"
                                    value={clientconsigneeselect}
                                    required
                                    onChange={changeClientconsignee}
                                    label="Consignee Client *"
                                    name="selectclientconsignee">
                                    {clientconsignee.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.client_name}
                                        </option>
                                    ))}
                                </AvField>
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    type="select"
                                    value={port_loadingselect}
                                    required
                                    onChange={changePort_loading}
                                    label="Loading Port *"
                                    name="selectport_loading">
                                    {port_loading.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.port_name}
                                        </option>
                                    ))}
                                </AvField>
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    type="select"
                                    value={port_dischargeselect}
                                    required
                                    onChange={changePort_discharge}
                                    label="Discharge Port *"
                                    name="selectport_discharge">
                                    {port_discharge.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.port_name}
                                        </option>
                                    ))}
                                </AvField>
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    type="select"
                                    value={igmselect}
                                    required
                                    onChange={changeIgm}
                                    label="IGM India Voyage *"
                                    name="selectigm">
                                    {igm.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.voyage}
                                        </option>
                                    ))}
                                </AvField>
                            </Col>

                            <Col lg={4}>
                                <AvField
                                    type="select"
                                    value={vendorselect}
                                    required
                                    onChange={changeVendor}
                                    label="Vendor Yard *"
                                    name="selectvendor">
                                    {vendor.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.vendor_name}
                                        </option>
                                    ))}
                                </AvField>
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
                        </Row>
                        <Grid md={12} sx={{ textAlign: 'right' }}>
                            <Button color="danger" type="submit" style={{ marginLeft: 15 }} onClick={onBack}>
                                Back
                            </Button>
                            <Button color="primary" type="submit" style={{ marginLeft: 15 }}>
                                Submit
                            </Button>
                        </Grid>
                    </AvForm>
                </CardBody>
            </Card>
        </React.Fragment>
    );
});

export default AddArrivalNoticies;
