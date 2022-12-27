import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const EditBookingConfirmations = (props) => {
    const { id } = useParams();
    const [values, setValues] = useState({
        date: '',
        booking_confirmation_number: '',
        port_net_ref: '',
        place_of_delivery: '',
        place_of_receipt: '',
        description: '',
        eta: '',
        closing_date: '',
        etd: '',
        eta_pod: '',
        voyage_number: '',
        measurement: '',
        type_of_shipment: '',
        release_reference: '',
        gross_weight: '',
        quantity_of_unit: '',
        release_expire: '',
        remarks: '',
        status_1: '',
    });

    const history = useHistory();

    useEffect(() => {
        getTypeofunit();
        getPort();
        getClient();
        getIgm();
        getVendor();
        getBookingConfirmationsByid();
    }, [props.id]);

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
            .get(`http://127.0.0.1:8000/api/ports/show/all`)
            .then((res) => {
                setPort_loading(res.data.data);
                setPort_discharge(res.data.data);
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
                setClient(res.data.data);
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
                setVendoryard(res.data.data);
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

    const getTypeofunit = () => {
        axios
            .get(`http://127.0.0.1:8000/api/typeofunits/show/all`)
            .then((res) => {
                setTypeofunit(res.data.data);
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

    const getBookingConfirmationsByid = () => {
        axios
            .get(`http://127.0.0.1:8000/api/bookingconfirmations/show/all`)
            .then((res) => {
                const data = res.data.data.filter((ress) => ress.id === parseInt(id));
                setValues({
                    date: data[0].date,
                    booking_confirmation_number: data[0].booking_confirmation_number,
                    port_net_ref: data[0].port_net_ref,
                    place_of_delivery: data[0].place_of_delivery,
                    place_of_receipt: data[0].place_of_receipt,
                    description: data[0].description,
                    eta: data[0].eta,
                    closing_date: data[0].closing_date,
                    etd: data[0].etd,
                    eta_pod: data[0].eta_pod,
                    voyage_number: data[0].voyage_number,
                    measurement: data[0].measurement,
                    type_of_shipment: data[0].type_of_shipment,
                    release_reference: data[0].release_reference,
                    gross_weight: data[0].gross_weight,
                    quantity_of_unit: data[0].quantity_of_unit,
                    release_expire: data[0].release_expire,
                    remarks: data[0].remarks,
                    status_1: data[0].status_1,
                });
                setClientshipperselect(data[0].client_id_shipper);
                setClientselect(data[0].client_id);
                setPort_loadingselect(data[0].port_id_loading);
                setPort_dischargeselect(data[0].port_id_discharge);
                setIgmselect(data[0].igm_india_voyage_id);
                setVendorselect(data[0].vendor_id_yard);
                setVendoryardselect(data[0].vendor_id_yard);
                setTypeofselect(data[0].type_of_unit_id);
                setActiveselect(data[0].status_2);
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
                `http://127.0.0.1:8000/api/bookingconfirmations/store?date=${values.date}&booking_confirmation_number=${values.booking_confirmation_number}&client_id_shipper=${clientshipperselect}&client_id=${clientselect}&port_id_loading=${port_loadingselect}&port_id_discharge=${port_dischargeselect}&igm_india_voyage_id=${igmselect}&type_of_unit_id=${typeofselect}&vendor_id_yard=${vendoryardselect}&vendor_id=${vendorselect}&port_net_ref=${values.port_net_ref}&place_of_delivery=${values.place_of_delivery}&place_of_receipt=${values.place_of_receipt}&description=${values.description}&eta=${values.eta}&closing_date=${values.closing_date}&etd=${values.etd}&eta_pod=${values.eta_pod}&voyage_number=${values.voyage_number}&measurement=${values.measurement}&type_of_shipment=${values.type_of_shipment}&release_reference=${values.release_reference}&gross_weight=${values.gross_weight}&quantity_of_unit=${values.quantity_of_unit}&release_expire=${values.release_expire}&remarks=${values.remarks}&status_1=${values.status_1}&status_2=${activeselect}&id=${id}`
            )
            .then((res) => {
                history.push('/bookingConfirmations');
                console.log('successfully1');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onBack = () => {
        history.push('/bookingConfirmations');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <Row>
                        <h3 className="mb-1 mt-0">Edit Booking Confirmations</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Booking Confirmations', path: '/bookingConfirmations' },
                                { label: 'Edit Booking Confirmations', path: '/bookingConfirmations-add', active: true },
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
                                    name="booking_confirmation_number"
                                    label="Booking Confirmation No"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.booking_confirmation_number}
                                />
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
                                <InputLabel id="demo-simple-select-label">Vendor</InputLabel>
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
                                <InputLabel id="demo-simple-select-label">Type Of Unit</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={typeofselect}
                                    onChange={changeType}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {typeofunit.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.type_of_unit}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>

                            <Col lg={4}>
                                <AvField
                                    name="port_net_ref"
                                    label="Port Net Ref"
                                    type="text"
                                    required
                                    onChange={handleChange} value={values.port_net_ref}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="place_of_delivery"
                                    label="place_of_delivery"
                                    type="text"
                                    required
                                    onChange={handleChange} value={values.place_of_delivery}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="place_of_receipt"
                                    label="place_of_receipt"
                                    type="text"
                                    required
                                    onChange={handleChange} value={values.place_of_receipt}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="description"
                                    label="description"
                                    type="text"
                                    required
                                    onChange={handleChange} value={values.description}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField name="eta" label="ETA" type="date" required onChange={handleChange} value={values.eta}/>
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="closing_date"
                                    label="closing_date"
                                    type="date"
                                    required
                                    onChange={handleChange} value={values.closing_date}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField name="etd" label="ETD" type="date" required onChange={handleChange} value={values.etd}/>
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="eta_pod"
                                    label="ETA (POD)"
                                    type="date"
                                    required
                                    onChange={handleChange} value={values.eta_pod}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="voyage_number"
                                    label="voyage_number"
                                    type="text"
                                    required
                                    onChange={handleChange} value={values.voyage_number}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="measurement"
                                    label="measurement"
                                    type="text"
                                    required
                                    onChange={handleChange} value={values.measurement}
                                />
                            </Col>

                            <Col lg={4}>
                                <AvField
                                    name="type_of_shipment"
                                    label="Shipment Type"
                                    type="text"
                                    required
                                    onChange={handleChange} value={values.type_of_shipment}
                                />
                            </Col>

                            <Col lg={4}>
                                <AvField
                                    name="release_reference"
                                    label="release_reference"
                                    type="text"
                                    required
                                    onChange={handleChange} value={values.release_reference}
                                />
                            </Col>

                            <Col lg={4}>
                                <AvField
                                    name="gross_weight"
                                    label="gross_weight"
                                    type="text"
                                    required
                                    onChange={handleChange} value={values.gross_weight}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="quantity_of_unit"
                                    label="quantity_of_unit"
                                    type="number"
                                    required
                                    onChange={handleChange} value={values.quantity_of_unit}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="release_expire"
                                    label="release_expire"
                                    type="date"
                                    required
                                    onChange={handleChange} value={values.release_expire}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField name="remarks" label="remarks" type="text" required onChange={handleChange} value={values.remarks}/>
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="status_1"
                                    label="status_1"
                                    type="text"
                                    required
                                    onChange={handleChange} value={values.status_1}
                                />
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Status 2</InputLabel>
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

export default EditBookingConfirmations;
