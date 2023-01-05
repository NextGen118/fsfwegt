import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Grid } from '@mui/material';
import {
    createBookingConfirmationsApiCall,
    showAllBookingConfirmationsApi,
} from '../../axios/bookingConfirmations/bookingConfirmations';
import SuccessMsg from '../../components/AlertMsg';

const AddBookingConfirmations = forwardRef((props, ref) => {
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
        getTypeofunit();
        getPort();
        getClient();
        getIgm();
        getVendor();
    }, []);

    const [port_loading, setPort_loading] = useState([]);
    const [port_loadingselect, setPort_loadingselect] = useState('');
    const [port_discharge, setPort_discharge] = useState([]);
    const [port_dischargeselect, setPort_dischargeselect] = useState('');

    const [clientshipper, setClientshipper] = useState([]);
    const [clientshipperselect, setClientshipperselect] = useState('');
    const [client, setClient] = useState([]);
    const [clientselect, setClientselect] = useState('');

    const [vendor, setVendor] = useState([]);
    const [vendorselect, setVendorselect] = useState('');
    const [vendoryard, setVendoryard] = useState([]);
    const [vendoryardselect, setVendoryardselect] = useState('');

    const [typeofunit, setTypeofunit] = useState([]);
    const [typeofselect, setTypeofselect] = useState('');

    const [igm, setIgm] = useState([]);
    const [igmselect, setIgmselect] = useState('');

    const [activeselect, setActiveselect] = useState('');
    const changeActive = (event) => {
        setActiveselect(event.target.value);
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

    const getClient = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/clients/show/all`)
            .then((res) => {
                setClientshipper(res.data.data);
                setClient(res.data.data);
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

                setVendoryard(res.data.data);
                setVendoryardselect(res.data.data[0]?.id);
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

    const getTypeofunit = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/typeofunits/show/all`)
            .then((res) => {
                setTypeofunit(res.data.data);
                setTypeofselect(res.data.data[0]?.id);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const changeVendor = (event) => {
        setVendorselect(event.target.value);
    };
    const changeVendoryard = (event) => {
        setVendoryardselect(event.target.value);
    };

    const changePort_loading = (event) => {
        setPort_loadingselect(event.target.value);
    };
    const changePort_discharge = (event) => {
        setPort_dischargeselect(event.target.value);
    };

    const changeClientshipper = (event) => {
        setClientshipperselect(event.target.value);
    };
    const changeClient = (event) => {
        setClientselect(event.target.value);
    };
    const changeIgm = (event) => {
        setIgmselect(event.target.value);
    };
    const changeType = (event) => {
        setTypeofselect(event.target.value);
        console.log(event.target.value, ' select');
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
            !values.booking_confirmation_number ||
            !values.port_net_ref ||
            !values.place_of_delivery ||
            !values.place_of_receipt ||
            !values.description ||
            !values.eta ||
            !values.closing_date ||
            !values.etd ||
            !values.eta_pod ||
            !values.voyage_number ||
            !values.measurement ||
            !values.type_of_shipment ||
            !values.release_reference ||
            !values.gross_weight ||
            !values.quantity_of_unit ||
            !values.release_expire ||
            !values.remarks ||
            !values.status_1 ||
            !port_loadingselect ||
            !port_dischargeselect ||
            !clientselect ||
            !clientshipperselect ||
            !typeofselect ||
            !vendoryardselect ||
            !igmselect ||
            !vendorselect ||
            !activeselect
        ) {
            return false;
        }

        return true;
    }

    const onAdd = (event) => {
        let bookingConfirmationsobj = {
            date: values.date,
            booking_confirmation_number: values.booking_confirmation_number,
            port_net_ref: values.port_net_ref,
            place_of_delivery: values.place_of_delivery,
            place_of_receipt: values.place_of_receipt,
            description: values.description,
            eta: values.eta,
            closing_date: values.closing_date,
            etd: values.etd,
            eta_pod: values.eta_pod,
            voyage_number: values.voyage_number,
            measurement: values.measurement,
            type_of_shipment: values.type_of_shipment,
            release_reference: values.release_reference,
            gross_weight: values.gross_weight,
            quantity_of_unit: values.quantity_of_unit,
            release_expire: values.release_expire,
            remarks: values.remarks,
            status_1: values.status_1,
            port_loadingselect: port_loadingselect,
            port_dischargeselect: port_dischargeselect,
            clientselect: clientselect,
            clientshipperselect: clientshipperselect,
            vendoryardselect: vendoryardselect,
            typeofselect: typeofselect,
            igmselect: igmselect,
            vendorselect: vendorselect,
            activeselect: 1,
        };
        console.log(bookingConfirmationsobj, 'bookingConfirmations obj');
        if (isFormValidate) {
            event.preventDefault();
            const createRes = createBookingConfirmationsApiCall(bookingConfirmationsobj).then((createRes) => {
                console.log(createRes);
                if (createRes.status === 200) {
                    showAllBookingConfirmationsApi();
                    history.push('/bookingConfirmations');
                    setAlertSucces(false);
                } else {
                    setAlertFaild(false);
                }
            });
        }
    };
    const onBack = () => {
        history.push('/bookingConfirmations');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <Row>
                        <h3 className="mb-1 mt-0">Add Booking Confirmations</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Booking Confirmations', path: '/bookingConfirmations' },
                                { label: 'Add Booking Confirmations', path: '/bookingConfirmations-add', active: true },
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
                                    name="booking_confirmation_number"
                                    label="Booking Confirmation No"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
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
                                    value={vendorselect}
                                    required
                                    onChange={changeVendor}
                                    label="Vendor *"
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
                                    value={vendoryardselect}
                                    required
                                    onChange={changeVendor}
                                    label="Vendor Yard *"
                                    name="changeVendoryard">
                                    {vendoryard.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.vendor_name}
                                        </option>
                                    ))}
                                </AvField>
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    type="select"
                                    value={typeofselect}
                                    required
                                    onChange={changeType}
                                    label="Type Of Unit *"
                                    name="selecttypeofunit">
                                    {typeofunit.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.type_of_unit}
                                        </option>
                                    ))}
                                </AvField>
                            </Col>

                            <Col lg={4}>
                                <AvField
                                    name="port_net_ref"
                                    label="Port Net Ref"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="place_of_delivery"
                                    label="place_of_delivery"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="place_of_receipt"
                                    label="place_of_receipt"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="description"
                                    label="description"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField name="eta" label="ETA" type="date" required onChange={handleChange} />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="closing_date"
                                    label="closing_date"
                                    type="date"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField name="etd" label="ETD" type="date" required onChange={handleChange} />
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
                                    name="voyage_number"
                                    label="voyage_number"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="measurement"
                                    label="measurement"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>

                            <Col lg={4}>
                                <AvField
                                    name="type_of_shipment"
                                    label="Shipment Type"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>

                            <Col lg={4}>
                                <AvField
                                    name="release_reference"
                                    label="release_reference"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>

                            <Col lg={4}>
                                <AvField
                                    name="gross_weight"
                                    label="gross_weight"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="quantity_of_unit"
                                    label="quantity_of_unit"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="release_expire"
                                    label="release_expire"
                                    type="date"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField name="remarks" label="remarks" type="text" required onChange={handleChange} />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="status_1"
                                    label="status_1"
                                    type="text"
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

export default AddBookingConfirmations;
