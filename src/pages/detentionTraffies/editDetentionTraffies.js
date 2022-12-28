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
            .get(`http://127.0.0.1:8000/api/clients/show/all`)
            .then((res) => {
                setClientAgent(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getCurrency = () => {
        axios
            .get(`http://127.0.0.1:8000/api/currencies/show/all`)
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
            .get(`http://127.0.0.1:8000/api/detentiontraffies/show/all`)
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

    const submitEdit = () => {
        axios
            .post(
                `http://127.0.0.1:8000/api/detentiontraffies/store?free_days=${values.free_days}&comm=${values.comm}&client_id_agent=${clientAgentselect}&currency_id=${currencyselect}&id=${id}`
            )
            .then((res) => {
                history.push('/detentionTraffies');
            })
            .catch((error) => {
                console.log(error);
            });
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
                    <AvForm>
                        <Row>
                            <Col lg={6}>
                                <AvField
                                    name="free_days"
                                    label="Free Days"
                                    type="text"
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
                    </AvForm>
                    <Grid md={12} sx={{ textAlign: 'right' }}>
                        <Button color="primary" type="submit" onClick={() => submitEdit()}>
                            Edit
                        </Button>
                        &nbsp;
                        <Button color="danger" type="submit" onClick={onBack}>
                            Back
                        </Button>
                    </Grid>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default EditDetentionTraffies;
