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
import {
    editDetentionInvoiceContainersApiCall,
    showAllDetentionInvoiceContainersApi,
} from '../../axios/detentionInvoiceContainers/detentionInvoiceContainers';
import SuccessMsg from '../../components/AlertMsg';

const EditDetentionNoticeContainers = (props) => {
    const { id } = useParams();
    const [values, setValues] = useState({
        seal_no: '',
        marks: '',
        payed: '',
        other_recovery: '',
        remarks: '',
    });

    const history = useHistory();

    useEffect(() => {
        getTypeofunit();
        getArrivalNotice();
        getEquipment();
        getDetentionNoticeContainersByid();
    }, [props.id]);

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

    const getDetentionNoticeContainersByid = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/detentioninvoicecontainers/show/all`)
            .then((res) => {
                const data = res.data.data.filter((ress) => ress.id === parseInt(id));
                setValues({
                    seal_no: data[0].seal_no,
                    marks: data[0].marks,
                    payed: data[0].payed,
                    other_recovery: data[0].other_recovery,
                    remarks: data[0].remarks,
                });
                setArrivalNoticeselect(data[0].arrival_notice_id);
                setEquipmentselect(data[0].equipment_id);
                setTypeofselect(data[0].type_of_unit_id);
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

    const onEdit = (event) => {
        let detentionInvoiceContainersobj = {
            seal_no: values.seal_no,
            marks: values.marks,
            payed: values.payed,
            other_recovery: values.other_recovery,
            remarks: values.remarks,
            arrivalNoticeselect: arrivalNoticeselect,
            equipmentselect: equipmentselect,
            typeofselect: typeofselect,
            activeselect: activeselect,
            id: id,
        };
        console.log(detentionInvoiceContainersobj, 'detentionInvoiceContainers obj');
        if (isFormValidate) {
            event.preventDefault();
            const editRes = editDetentionInvoiceContainersApiCall(detentionInvoiceContainersobj).then((editRes) => {
                console.log(editRes);
                if (editRes.status === 200) {
                    showAllDetentionInvoiceContainersApi();
                    history.push('/detentionInvoiceContainers');
                    setAlertSucces(false);
                } else {
                    setAlertFaild(false);
                }
            });
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
                        <h3 className="mb-1 mt-0">Edit Detention Invoice Containers</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Detention Invoice Containers', path: '/detentionInvoiceContainers' },
                                {
                                    label: 'Edit Detention Invoice Containers',
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
                    <AvForm onSubmit={onEdit}>
                        <Row>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Arrival Notice No</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={arrivalNoticeselect}
                                    onChange={changeArrivalNotice}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {arrivalNotice.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.arrival_notice_no}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Equipment NO</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={equipmentselect}
                                    onChange={changeEquipment}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {equipment.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.equipment_number}
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
                                    name="seal_no"
                                    label="Seal No"
                                    type="text"
                                    required
                                    value={values.seal_no}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="marks"
                                    label="Marks"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.marks}
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
                                    name="other_recovery"
                                    label="Other Recovery"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.other_recovery}
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
                            <Button color="danger" style={{ marginLeft: 15 }} type="submit" onClick={onBack}>
                                Back
                            </Button>
                            <Button color="primary" style={{ marginLeft: 15 }} type="submit">
                                Edit
                            </Button>
                        </Grid>
                    </AvForm>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default EditDetentionNoticeContainers;
