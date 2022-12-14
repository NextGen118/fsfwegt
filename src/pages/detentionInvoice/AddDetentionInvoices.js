import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Grid } from '@mui/material';
import {
    createDetentionInvoiceApiCall,
    showAllDetentionInvoiceApi,
} from '../../axios/detentionInvoice/detentionInvoice';
import SuccessMsg from '../../components/AlertMsg';

const AddDetentionInvoices = forwardRef((props, ref) => {
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
        getDetentionTraffies();
        getCurrency();
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
    const getCurrency = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/currencies/show/all`)
            .then((res) => {
                setForignCurrency(res.data.data);
                setForignCurrencyselect(res.data.data[0]?.id);

                setLocalCurrency(res.data.data);
                setLocalCurrencyselect(res.data.data[0]?.id);
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
                setDetentionTraffiesselect(res.data.data[0]?.id);
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

    const onAdd = (event) => {
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
            activeselect: 1,
        };
        console.log(detentionInvoicesobj, 'detentionInvoices obj');
        if (isFormValidate) {
            event.preventDefault();
            const createRes = createDetentionInvoiceApiCall(detentionInvoicesobj).then((createRes) => {
                console.log(createRes);
                if (createRes.status === 200) {
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
                        <h3 className="mb-1 mt-0">Add Detention Invoices</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Detention Invoices', path: '/detentionInvoices' },
                                { label: 'Add Detention Invoices', path: '/detentionInvoices-add', active: true },
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
                                    name="detention_no"
                                    label="Detention No"
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
                                    value={forignCurrencyselect}
                                    required
                                    onChange={changeForignCurrency}
                                    label="Forign Currency *"
                                    name="selectforignCurrency">
                                    {forignCurrency.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.currency_name}
                                        </option>
                                    ))}
                                </AvField>
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    type="select"
                                    value={detentionTraffiesselect}
                                    required
                                    onChange={changeDetentionTraffies}
                                    label="Detention Traffies *"
                                    name="selectdetentionTraffies">
                                    {detentionTraffies.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.id}
                                        </option>
                                    ))}
                                </AvField>
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    type="select"
                                    value={localCurrencyselect}
                                    required
                                    onChange={changeLocalCurrency}
                                    label="Local Currency *"
                                    name="selectlocalCurrency">
                                    {localCurrency.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.currency_name}
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
                                <AvField name="remarks" label="Remarks" type="text" required onChange={handleChange} />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="total_days_detention"
                                    label="Total Days Detention"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="discount_type"
                                    label="Discount Type"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="discount_input"
                                    label="Discount Input"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="previous_bill"
                                    label="Previous Bill"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="total_amount"
                                    label="Total Amount"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="final_amount"
                                    label="Final Amount"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
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
                                <AvField
                                    name="grand_total"
                                    label="Grand Total"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="grand_total_this_invoice_unit"
                                    label="Grand Total This Invoice Unit"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField name="payed" label="Payed" type="number" required onChange={handleChange} />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="yard_suppose_date"
                                    label="Yard Suppose Date"
                                    type="date"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="bl_free_days"
                                    label="BL Free Days"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="exchange_rate"
                                    label="Exchange Rate"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="final_amount_tarrif"
                                    label="Final Amount Tarrif"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>

                            <Col lg={4}>
                                <AvField name="comm" label="COMM" type="number" required onChange={handleChange} />
                            </Col>

                            <Col lg={4}>
                                <AvField name="status2" label="Status 2" type="text" required onChange={handleChange} />
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

export default AddDetentionInvoices;
