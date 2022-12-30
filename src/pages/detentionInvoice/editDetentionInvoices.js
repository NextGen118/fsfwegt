import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Grid } from '@mui/material';
import { editDetentionInvoiceApiCall, showAllDetentionInvoiceApi } from '../../axios/detentionInvoice/detentionInvoice';
import SuccessMsg from '../../components/AlertMsg';

const EditDetentionInvoices = (props) => {
    const { id } = useParams();
    const [values, setValues] = useState({
        date: '',
        detention_no: '',
        etd_pol: '',
        eta_pod: '',
        st_expire: '',
        ata_fpd: '',
        obl_no: '',
        remarks: '',
        total_days_detention: '',
        discount_type: '',
        discount_input: '',
        previous_bill: '',
        total_amount: '',
        final_amount: '',
        nos_units: '',
        grand_total: '',
        grand_total_this_invoice_unit: '',
        payed: '',
        yard_suppose_date: '',
        bl_free_days: '',
        exchange_rate: '',
        final_amount_tarrif: '',
        comm: '',
        status2: '',
    });

    const history = useHistory();

    useEffect(() => {
        getBilloflanding();
        getIgm();
        getClient();
        getPort();
        getDetentionTraffies();
        getCurrency();
        getDetentionInvoicesByid();
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
    const [forignCurrency, setForignCurrency] = useState([]);
    const [forignCurrencyselect, setForignCurrencyselect] = useState('');
    const [localCurrency, setLocalCurrency] = useState([]);
    const [localCurrencyselect, setLocalCurrencyselect] = useState('');
    const [detentionTraffies, setDetentionTraffies] = useState([]);
    const [detentionTraffiesselect, setDetentionTraffiesselect] = useState('');

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
    const getCurrency = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/currencies/show/all`)
            .then((res) => {
                setForignCurrency(res.data.data);
                setLocalCurrency(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getDetentionTraffies = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/detentiontraffies/show/all`)
            .then((res) => {
                setDetentionTraffies(res.data.data);
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

    const changeForignCurrency = (event) => {
        setForignCurrencyselect(event.target.value);
    };
    const changeLocalCurrency = (event) => {
        setLocalCurrencyselect(event.target.value);
    };
    const changeDetentionTraffies = (event) => {
        setDetentionTraffiesselect(event.target.value);
    };

    const getDetentionInvoicesByid = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/detentioninvoice/show/all`)
            .then((res) => {
                const data = res.data.data.filter((ress) => ress.id === parseInt(id));
                setValues({
                    date: data[0].date,
                    detention_no: data[0].detention_no,
                    etd_pol: data[0].etd_pol,
                    eta_pod: data[0].eta_pod,
                    st_expire: data[0].st_expire,
                    ata_fpd: data[0].ata_fpd,
                    obl_no: data[0].obl_no,
                    remarks: data[0].remarks,
                    total_days_detention: data[0].total_days_detention,
                    discount_type: data[0].discount_type,
                    discount_input: data[0].discount_input,
                    previous_bill: data[0].previous_bill,
                    total_amount: data[0].total_amount,
                    final_amount: data[0].final_amount,
                    nos_units: data[0].nos_units,
                    grand_total: data[0].grand_total,
                    grand_total_this_invoice_unit: data[0].grand_total_this_invoice_unit,
                    payed: data[0].payed,
                    yard_suppose_date: data[0].yard_suppose_date,
                    bl_free_days: data[0].bl_free_days,
                    exchange_rate: data[0].exchange_rate,
                    final_amount_tarrif: data[0].final_amount_tarrif,
                    comm: data[0].comm,
                    status2: data[0].status2,
                });
                setBilloflandingselect(data[0].bill_of_landing_id);
                setClientshipperselect(data[0].client_id_shipper);
                setClientconsigneeselect(data[0].client_id_consignee);
                setClientselect(data[0].client_id);
                setPort_loadingselect(data[0].port_id_loading);
                setPort_dischargeselect(data[0].port_id_discharge);
                setIgmselect(data[0].igm_india_voyage_id);
                setForignCurrencyselect(data[0].forign_currency_id);
                setLocalCurrencyselect(data[0].local_currency_id);
                setDetentionTraffiesselect(data[0].tariff_id);
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
            !values.detention_no ||
            !values.etd_pol ||
            !values.eta_pod ||
            !values.st_expire ||
            !values.ata_fpd ||
            !values.obl_no ||
            !values.remarks ||
            !values.total_days_detention ||
            !values.discount_type ||
            !values.discount_input ||
            !values.previous_bill ||
            !values.total_amount ||
            !values.final_amount ||
            !values.nos_units ||
            !values.grand_total ||
            !values.grand_total_this_invoice_unit ||
            !values.payed ||
            !values.yard_suppose_date ||
            !values.bl_free_days ||
            !values.exchange_rate ||
            !values.final_amount_tarrif ||
            !values.comm ||
            !values.status2 ||
            !billoflandingselect ||
            !clientshipperselect ||
            !clientconsigneeselect ||
            !clientselect ||
            !port_loadingselect ||
            !port_dischargeselect ||
            !igmselect ||
            !forignCurrencyselect ||
            !localCurrencyselect ||
            !detentionTraffiesselect ||
            !activeselect
        ) {
            return false;
        }

        return true;
    }

    const onEdit = (event) => {
        let detentionInvoicesobj = {
            date: values.date,
            detention_no: values.detention_no,
            etd_pol: values.etd_pol,
            eta_pod: values.eta_pod,
            st_expire: values.st_expire,
            ata_fpd: values.ata_fpd,
            obl_no: values.obl_no,
            remarks: values.remarks,
            total_days_detention: values.total_days_detention,
            discount_type: values.discount_type,
            discount_input: values.discount_input,
            previous_bill: values.previous_bill,
            total_amount: values.total_amount,
            final_amount: values.final_amount,
            nos_units: values.nos_units,
            grand_total: values.grand_total,
            grand_total_this_invoice_unit: values.grand_total_this_invoice_unit,
            payed: values.payed,
            yard_suppose_date: values.yard_suppose_date,
            bl_free_days: values.bl_free_days,
            exchange_rate: values.exchange_rate,
            final_amount_tarrif: values.final_amount_tarrif,
            comm: values.comm,
            status2: values.status2,
            billoflandingselect: billoflandingselect,
            clientshipperselect: clientshipperselect,
            clientselect: clientselect,
            clientconsigneeselect: clientconsigneeselect,
            port_loadingselect: port_loadingselect,
            port_dischargeselect: port_dischargeselect,
            igmselect: igmselect,
            forignCurrencyselect: forignCurrencyselect,
            localCurrencyselect: localCurrencyselect,
            detentionTraffiesselect: detentionTraffiesselect,
            activeselect: activeselect,
            id: id,
        };
        console.log(detentionInvoicesobj, 'detentionInvoices obj');
        if (isFormValidate) {
            event.preventDefault();
            const editRes = editDetentionInvoiceApiCall(detentionInvoicesobj).then((editRes) => {
                console.log(editRes);
                if (editRes.status === 200) {
                    showAllDetentionInvoiceApi();
                    history.push('/detentionInvoices');
                    setAlertSucces(false);
                } else {
                    setAlertFaild(false);
                }
            });
        }
    };

    const onBack = () => {
        history.push('/detentionInvoices');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <Row>
                        <h3 className="mb-1 mt-0">Edit DetentionInvoices</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Detention Invoices', path: '/detentionInvoices' },
                                { label: 'Edit Detention Invoices', path: '/detentionInvoices-add', active: true },
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
                                    name="detention_no"
                                    label="Detention No"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.detention_no}
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
                                <InputLabel id="demo-simple-select-label">Forign Currency</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={forignCurrencyselect}
                                    onChange={changeForignCurrency}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {forignCurrency.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.currency_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Detention Traffies</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={detentionTraffiesselect}
                                    onChange={changeDetentionTraffies}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {detentionTraffies.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.id}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Local Currency</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={localCurrencyselect}
                                    onChange={changeLocalCurrency}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {localCurrency.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.currency_name}
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
                                    name="total_days_detention"
                                    label="Total Days Detention"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.total_days_detention}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="discount_type"
                                    label="Discount Type"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.discount_type}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="discount_input"
                                    label="Discount Input"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.discount_input}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="previous_bill"
                                    label="Previous Bill"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.previous_bill}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="total_amount"
                                    label="Total Amount"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.total_amount}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="final_amount"
                                    label="Final Amount"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.final_amount}
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
                                    name="grand_total"
                                    label="Grand Total"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.grand_total}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="grand_total_this_invoice_unit"
                                    label="Grand Total This Invoice Unit"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.grand_total_this_invoice_unit}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="payed"
                                    label="Payed"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.payed}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="yard_suppose_date"
                                    label="Yard Suppose Date"
                                    type="date"
                                    required
                                    onChange={handleChange}
                                    value={values.yard_suppose_date}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="bl_free_days"
                                    label="BL Free Days"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.bl_free_days}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="exchange_rate"
                                    label="Exchange Rate"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.exchange_rate}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="final_amount_tarrif"
                                    label="Final Amount Tarrif"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.final_amount_tarrif}
                                />
                            </Col>

                            <Col lg={4}>
                                <AvField
                                    name="comm"
                                    label="COMM"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.comm}
                                />
                            </Col>

                            <Col lg={4}>
                                <AvField
                                    name="status2"
                                    label="Status 2"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.status2}
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

export default EditDetentionInvoices;
