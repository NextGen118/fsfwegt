import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const AddArrivalNoticeContainers = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        handleOpen() {
            setOpen(true);
        },
    }));

    const [values, setValues] = useState({});
    let history = useHistory();

    const handleChange = (evt) => {
        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value,
        });
    };
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
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

    const getArrivalNotice = () => {
        axios
            .get(`http://127.0.0.1:8000/api/arivalnotices/show/all`)
            .then((res) => {
                setArrivalNotice(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getEquipment = () => {
        axios
            .get(`http://127.0.0.1:8000/api/equipments/show/all`)
            .then((res) => {
                setEquipment(res.data.data);
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

    const onSubmit = () => {
        axios
            .post(
                `http://127.0.0.1:8000/api/arrivalnoticecontainers/store?arrival_notice_id=${arrivalNoticeselect}&equipment_id=${equipmentselect}&type_of_unit_id=${typeofselect}&seal_no=${values.seal_no}&marks=${values.marks}`
            )

            .then((res) => {
                history.push('/arrivalNoticeContainers');
                console.log('successfully1');
            })
            .catch((error) => {
                console.log(error);
                console.log('error');
            });
    };

    const onBack = () => {
        history.push('/arrivalNoticeContainers');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <Row>
                        <h3 className="mb-1 mt-0">Add Arrival Noticie Containers</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Arrival Noticie Containers', path: '/arrivalNoticieContainers' },
                                {
                                    label: 'Add Arrival Noticie Containers',
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
                    <AvForm>
                        <Row>
                            <Col lg={4}>
                                <InputLabel id="demo-simple-select-label">Arrival Notice No</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={arrivalNoticeselect}
                                    onChange={changeArrivalNotice}
                                    sx={{ width: 360, height: 36, mb: 2 }}>
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
                                    sx={{ width: 360, height: 36, mb: 2 }}>
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
                                    sx={{ width: 360, height: 36, mb: 2 }}>
                                    {typeofunit.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.type_of_unit}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>

                            <Col lg={4}>
                                <AvField name="seal_no" label="Seal No" type="text" required onChange={handleChange} />
                            </Col>
                            <Col lg={4}>
                                <AvField name="marks" label="Marks" type="text" required onChange={handleChange} />
                            </Col>
                        </Row>
                    </AvForm>
                    <Button color="primary" type="submit" style={{ marginLeft: 15 }} onClick={onSubmit}>
                        Submit
                    </Button>
                    <Button color="danger" type="submit" style={{ marginLeft: 15 }} onClick={onBack}>
                        Back
                    </Button>
                </CardBody>
            </Card>
        </React.Fragment>
    );
});

export default AddArrivalNoticeContainers;