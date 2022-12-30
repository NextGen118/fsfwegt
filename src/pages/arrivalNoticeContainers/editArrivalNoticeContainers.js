import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { FormGroup, Grid, FormControl, TextField, MenuItem, InputLabel, Select } from '@mui/material';
import {
    editArrivalNoticeContainersApiCall,
    showAllArrivalNoticeContainersApi,
} from '../../axios/arrivalNoticeContainers/ArrivalNoticeContainers';
import SuccessMsg from '../../components/AlertMsg';

const EditArrivalNoticeContainers = (props) => {
    const { id } = useParams();
    const [values, setValues] = useState({
        marks: '',
        seal_no: '',
    });

    const history = useHistory();

    useEffect(() => {
        getTypeofunit();
        getArrivalNotice();
        getEquipment();
        getArrivalNoticeContainersByid();
    }, [props.id]);

    const [arrivalNotice, setArrivalNotice] = useState([]);
    const [arrivalNoticeselect, setArrivalNoticeselect] = useState('');
    const [equipment, setEquipment] = useState([]);
    const [equipmentselect, setEquipmentselect] = useState('');
    const [typeofunit, setTypeofunit] = useState([]);
    const [typeofselect, setTypeofselect] = useState('');

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

    const getArrivalNoticeContainersByid = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/arrivalnoticecontainers/show/all`)
            .then((res) => {
                const data = res.data.data.filter((ress) => ress.id === parseInt(id));
                setValues({
                    seal_no: data[0].seal_no,
                    marks: data[0].marks,
                });
                setArrivalNoticeselect(data[0].arrival_notice_id);
                setEquipmentselect(data[0].equipment_id);
                setTypeofselect(data[0].type_of_unit_id);
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
        SuccessMsg('ArrivalNoticeContainers', true, 'error');
        setTimeout(() => {
            SuccessMsg('ArrivalNoticeContainers', false, 'error');
        }, 500);
    });

    function isFormValidate() {
        if (!values.seal_no || !values.marks || !typeofselect || !arrivalNoticeselect || !equipmentselect) {
            return false;
        }

        return true;
    }

    const onEdit = (event) => {
        let arrivalNoticeContainersobj = {
            seal_no: values.seal_no,
            marks: values.marks,
            typeofselect: typeofselect,
            equipmentselect: equipmentselect,
            arrivalNoticeselect: arrivalNoticeselect,
            id: id,
        };
        console.log(arrivalNoticeContainersobj, 'arrivalNoticeContainers obj');
        if (isFormValidate) {
            event.preventDefault();
            const editRes = editArrivalNoticeContainersApiCall(arrivalNoticeContainersobj).then((editRes) => {
                console.log(editRes);
                if (editRes.status === 200) {
                    showAllArrivalNoticeContainersApi();
                    history.push('/arrivalNoticeContainers');
                    setAlertSucces(false);
                } else {
                    setAlertFaild(false);
                }
            });
        }
    };

    const onBack = () => {
        history.push('/arrivalNoticeContainers');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <Row>
                        <h3 className="mb-1 mt-0">Edit Arrival Noticie Containers</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Arrival Noticie Containers', path: '/arrivalNoticieContainers' },
                                {
                                    label: 'Edit Arrival Noticie Containers',
                                    path: '/arrivalNoticieContainers-add',
                                    active: true,
                                },
                            ]}
                        />
                    </Row>
                </Col>
            </Row>
            <Card>
                <CardBody>
                    <FormGroup onSubmit={onEdit}>
                        <form>
                            <Row>
                                <Col lg={4}>
                                    <TextField
                                        name="seal_no"
                                        label="Seal No"
                                        type="text"
                                        required
                                        onChange={handleChange}
                                        fullWidth
                                        value={values.seal_no}
                                    />
                                </Col>
                                <Col lg={4}>
                                    <TextField
                                        name="marks"
                                        label="Marks"
                                        type="text"
                                        required
                                        onChange={handleChange}
                                        fullWidth
                                        value={values.marks}
                                    />
                                </Col>
                                <Col lg={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Arrival Notice No *</InputLabel>
                                        <Select
                                            required
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={arrivalNoticeselect}
                                            onChange={changeArrivalNotice}
                                            sx={{ width: '100%', mb: 2 }}
                                            label="Arrival Notice NO *">
                                            {arrivalNotice.map((rec) => (
                                                <MenuItem value={rec.id} key={rec.id}>
                                                    {rec.arrival_notice_no}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Col>

                                <Col lg={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Equipment NO *</InputLabel>
                                        <Select
                                            required
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={equipmentselect}
                                            onChange={changeEquipment}
                                            sx={{ width: '100%', mb: 2 }}
                                            label="Equipment NO *">
                                            {equipment.map((rec) => (
                                                <MenuItem value={rec.id} key={rec.id}>
                                                    {rec.equipment_number}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Col>

                                <Col lg={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Type Of Unit</InputLabel>
                                        <Select
                                            required
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={typeofselect}
                                            onChange={changeType}
                                            sx={{ width: '100%', mb: 2 }}
                                            label="Type Of Unit *">
                                            {typeofunit.map((rec) => (
                                                <MenuItem value={rec.id} key={rec.id}>
                                                    {rec.type_of_unit}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
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
                        </form>
                    </FormGroup>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default EditArrivalNoticeContainers;
