import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Grid } from '@mui/material';
import { editInvoicesApiCall, showAllInvoicesApi } from '../../axios/invoices/invoices';
import SuccessMsg from '../../components/AlertMsg';

const EditInvoices = (props) => {
    const { id } = useParams();
    const [values, setValues] = useState({
        date: '',
        invoice_no: '',
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
        getInvoicesByid();
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
    const [activeselect, setActiveselect] = useState('');
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

    const getInvoicesByid = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/invoices/show/all`)
            .then((res) => {
                const data = res.data.data.filter((ress) => ress.id === parseInt(id));
                setValues({
                    date: data[0].date,
                    invoice_no: data[0].invoice_no,
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
            !values.invoice_no ||
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
            !clientconsigneeselect ||
            !clientselect ||
            !port_loadingselect ||
            !port_dischargeselect ||
            !igmselect ||
            !activeselect
        ) {
            return false;
        }

        return true;
    }

    const onEdit = (event) => {
        let invoicesobj = {
            date: values.date,
            invoice_no: values.invoice_no,
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
            activeselect: activeselect,
            id: id,
        };
        console.log(invoicesobj, 'invoices obj');
        if (isFormValidate) {
            event.preventDefault();
            const editRes = editInvoicesApiCall(invoicesobj).then((editRes) => {
                console.log(editRes);
                if (editRes.status === 200) {
                    showAllInvoicesApi();
                    history.push('/invoices');
                    setAlertSucces(false);
                } else {
                    setAlertFaild(false);
                }
            });
        }
    };
    const onBack = () => {
        history.push('/invoices');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <Row>
                        <h3 className="mb-1 mt-0">Edit Invoices</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Invoices', path: '/invoices' },
                                { label: 'Edit Invoices', path: '/invoices-add', active: true },
                            ]}
                        />
                    </Row>
                </Col>
            </Row>
            <Card>
                <CardBody>
                    <AvForm onSubmit={onEdit}>
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
                                    name="invoice_no"
                                    label="Invoice No"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.invoice_no}
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
                                    name="cbm"
                                    label="CBM"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.cbm}
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
                                <AvField
                                    type="select"
                                    value={activeselect}
                                    required
                                    onChange={changeActive}
                                    label="Status *"
                                    name="selectstatus">
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
                                </AvField>
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="tax_invoice"
                                    label="Tax Invoice"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.tax_invoice}
                                />
                            </Col>
                        </Row>
                        <Grid md={12} sx={{ textAlign: 'right' }}>
                            <Button color="danger" type="submit" style={{ marginLeft: 15 }} onClick={onBack}>
                                Back
                            </Button>
                            <Button color="primary" type="submit" style={{ marginLeft: 15 }}>
                                Edit
                            </Button>
                        </Grid>
                    </AvForm>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default EditInvoices;
