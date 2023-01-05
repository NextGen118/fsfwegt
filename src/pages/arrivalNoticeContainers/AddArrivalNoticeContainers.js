import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import PageTitle from '../../components/PageTitle';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
    createArrivalNoticeContainersApiCall,
    showAllArrivalNoticeContainersApi,
} from '../../axios/arrivalNoticeContainers/ArrivalNoticeContainers';
import SuccessMsg from '../../components/AlertMsg';
import { Grid } from '@mui/material';

const AddArrivalNoticeContainers = forwardRef((props, ref) => {
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

    const onAdd = (event) => {
        let arrivalNoticeContainersobj = {
            seal_no: values.seal_no,
            marks: values.marks,
            typeofselect: typeofselect,
            equipmentselect: equipmentselect,
            arrivalNoticeselect: arrivalNoticeselect,
        };
        console.log(arrivalNoticeContainersobj, 'arrivalNoticeContainers obj');
        if (isFormValidate) {
            event.preventDefault();
            const createRes = createArrivalNoticeContainersApiCall(arrivalNoticeContainersobj).then((createRes) => {
                console.log(createRes);
                if (createRes.status === 200) {
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
                    <AvForm onSubmit={onAdd}>
                        <Row>
                            <Col lg={4}>
                                <AvField
                                    name="seal_no"
                                    label="Seal No"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    fullWidth
                                    sx={{ width: '100%', mb: 2 }}
                                />
                            </Col>
                            <Col lg={4}>
                                <AvField
                                    name="marks"
                                    label="Marks"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    fullWidth
                                    sx={{ width: '100%', mb: 2 }}
                                />
                            </Col>
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

export default AddArrivalNoticeContainers;
