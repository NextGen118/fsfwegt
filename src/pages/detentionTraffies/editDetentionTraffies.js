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
    editDetentionTraffiesApiCall,
    showAllDetentionTraffiesApi,
} from '../../axios/detentionTraffies/detentionTraffies';
import SuccessMsg from '../../components/AlertMsg';

const EditDetentionTraffies = (props) => {
    const { id } = useParams();
    const [values, setValues] = useState({
        free_days: '',
        comm: '',
    });

    const history = useHistory();

    useEffect(() => {
        getClientAgent();
        getCurrency();
        getDetentionTraffiesByid();
    }, [props.id]);

    const [clientAgent, setClientAgent] = useState([]);
    const [clientAgentselect, setClientAgentselect] = useState('');

    const [currency, setCurrency] = useState([]);
    const [currencyselect, setCurrencyselect] = useState('');

    const getClientAgent = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/clients/show/all`)
            .then((res) => {
                setClientAgent(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getCurrency = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/currencies/show/all`)
            .then((res) => {
                setCurrency(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const changeClientAgent = (event) => {
        setClientAgentselect(event.target.value);
        console.log(event.target.value, ' select');
    };
    const changeCurrency = (event) => {
        setCurrencyselect(event.target.value);
        console.log(event.target.value, ' select');
    };

    const getDetentionTraffiesByid = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/detentiontraffies/show/all`)
            .then((res) => {
                const data = res.data.data.filter((ress) => ress.id === parseInt(id));
                setValues({
                    free_days: data[0].free_days,
                    comm: data[0].comm,
                });
                setClientAgentselect(data[0].client_id_agent);
                setCurrencyselect(data[0].currency_id);
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
        if (!values.free_days || !values.comm || !clientAgentselect || !currencyselect) {
            return false;
        }

        return true;
    }

    const onEdit = (event) => {
        let detentionTraffiesobj = {
            free_days: values.free_days,
            comm: values.comm,
            clientAgentselect: clientAgentselect,
            currencyselect: currencyselect,
            id: id,
        };
        console.log(detentionTraffiesobj, 'detentionTraffies obj');
        if (isFormValidate) {
            event.preventDefault();
            const editRes = editDetentionTraffiesApiCall(detentionTraffiesobj).then((editRes) => {
                console.log(editRes);
                if (editRes.status === 200) {
                    showAllDetentionTraffiesApi();
                    history.push('/detentionTraffies');
                    setAlertSucces(false);
                } else {
                    setAlertFaild(false);
                }
            });
        }
    };
    const onBack = () => {
        history.push('/detentionTraffies');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <Row>
                        <h3 className="mb-1 mt-0">Edit Detention Traffies</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Detention Traffies', path: '/detentionTraffies' },
                                { label: 'Edit Detention Traffies', path: '/detentionTraffies-add', active: true },
                            ]}
                        />
                    </Row>
                </Col>
            </Row>
            <Card>
                <CardBody>
                    <AvForm onSubmit={onEdit}>
                        <Row>
                            <Col lg={6}>
                                <AvField
                                    name="free_days"
                                    label="Free Days"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.free_days}
                                />
                            </Col>
                            <Col lg={6}>
                                <AvField
                                    name="comm"
                                    label="COMM"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.comm}
                                />
                            </Col>

                            <Col lg={6}>
                                <InputLabel id="demo-simple-select-label">Client Agent</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={clientAgentselect}
                                    onChange={changeClientAgent}
                                    sx={{ width: '100%', mb: 2, height: 40 }}>
                                    {clientAgent.map((con) => (
                                        <MenuItem value={con.id} key={con.id}>
                                            {con.client_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>
                            <Col lg={6}>
                                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={currencyselect}
                                    onChange={changeCurrency}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {currency.map((cur) => (
                                        <MenuItem value={cur.id} key={cur.id}>
                                            {cur.currency_name}
                                        </MenuItem>
                                    ))}
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

export default EditDetentionTraffies;
