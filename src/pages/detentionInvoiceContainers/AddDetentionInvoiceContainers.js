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
import {
    createDetentionInvoiceContainersApiCall,
    showAllDetentionInvoiceContainersApi,
} from '../../axios/detentionInvoiceContainers/detentionInvoiceContainers';
import SuccessMsg from '../../components/AlertMsg';

const AddDetentionNoticeContainers = forwardRef((props, ref) => {
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
        getArrivalNotice();
        getEquipment();
    }, []);

    const [arrivalNotice, setArrivalNotice] = useState([]);
    const [arrivalNoticeselect, setArrivalNoticeselect] = useState('');
    const [equipment, setEquipment] = useState([]);
    const [equipmentselect, setEquipmentselect] = useState('');
    const [typeofunit, setTypeofunit] = useState([]);
    const [typeofselect, setTypeofselect] = useState('');
    const [activeselect, setActiveselect] = useState('');
    const changeActive = (event) => {
        setActiveselect(event.target.value);
    };

    const getArrivalNotice = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/arivalnotices/show/all`)
            .then((res) => {
                setArrivalNotice(res.data.data);
                setArrivalNoticeselect(res.data.data[0]?.id);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getEquipment = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/equipments/show/all`)
            .then((res) => {
                setEquipment(res.data.data);
                setEquipmentselect(res.data.data[0]?.id);
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

    const changeArrivalNotice = (event) => {
        setArrivalNoticeselect(event.target.value);
    };
    const changeEquipment = (event) => {
        setEquipmentselect(event.target.value);
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
            !values.seal_no ||
            !values.marks ||
            !values.payed ||
            !values.other_recovery ||
            !values.remarks ||
            !arrivalNoticeselect ||
            !equipmentselect ||
            !typeofselect ||
            !activeselect
        ) {
            return false;
        }

        return true;
    }

    const onAdd = (event) => {
        let detentionInvoiceContainersobj = {
            seal_no: values.seal_no,
            marks: values.marks,
            payed: values.payed,
            other_recovery: values.other_recovery,
            remarks: values.remarks,
            arrivalNoticeselect: arrivalNoticeselect,
            equipmentselect: equipmentselect,
            typeofselect: typeofselect,
            activeselect: 1,
        };
        console.log(detentionInvoiceContainersobj, 'detentionInvoiceContainers obj');
        if (isFormValidate) {
            event.preventDefault();
            const createRes = createDetentionInvoiceContainersApiCall(detentionInvoiceContainersobj).then(
                (createRes) => {
                    console.log(createRes);
                    if (createRes.status === 200) {
                        showAllDetentionInvoiceContainersApi();
                        history.push('/detentionInvoiceContainers');
                        setAlertSucces(false);
                    } else {
                        setAlertFaild(false);
                    }
                }
            );
        }
    };

    const onBack = () => {
        history.push('/detentionInvoiceContainers');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <Row>
                        <h3 className="mb-1 mt-0">Add Detention Invoice Containers</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Detention Invoice Containers', path: '/detentionInvoiceContainers' },
                                {
                                    label: 'Add Detention Invoice Containers',
                                    path: '/detentionInvoiceContainers-add',
                                    active: true,
                                },
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
                                <AvField
                                    type="select"
                                    value={arrivalNoticeselect}
                                    required
                                    onChange={changeArrivalNotice}
                                    label="Arrival Notice No  *"
                                    name="selectarrivalNotice">
                                    {arrivalNotice.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.arrival_notice_no}
                                        </option>
                                    ))}
                                </AvField>
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    type="select"
                                    value={equipmentselect}
                                    required
                                    onChange={changeEquipment}
                                    label="Equipment NO *"
                                    name="selectequipment">
                                    {equipment.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.equipment_number}
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
                                <AvField name="seal_no" label="Seal No" type="text" required onChange={handleChange} />
                            </Col>
                            <Col lg={4}>
                                <AvField name="marks" label="Marks" type="text" required onChange={handleChange} />
                            </Col>
                            <Col lg={4}>
                                <AvField name="payed" label="Payed" type="number" required onChange={handleChange} />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="other_recovery"
                                    label="Other Recovery"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField name="remarks" label="Remarks" type="text" required onChange={handleChange} />
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

export default AddDetentionNoticeContainers;
