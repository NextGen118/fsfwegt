import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Grid } from '@mui/material';
import {
    createDetentionTraffiesApiCall,
    showAllDetentionTraffiesApi,
} from '../../axios/detentionTraffies/detentionTraffies';
import SuccessMsg from '../../components/AlertMsg';

const AddDetentionTraffies = (props) => {
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
        getClientAgent();
        getCurrency();
    }, []);

    const [clientAgent, setClientAgent] = useState([]);
    const [clientAgentselect, setClientAgentselect] = useState('');

    const [currency, setCurrency] = useState([]);
    const [currencyselect, setCurrencyselect] = useState('');

    const getClientAgent = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/clients/show/all`)
            .then((res) => {
                setClientAgent(res.data.data);
                setClientAgentselect(res.data.data[0]?.id);
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
                setCurrencyselect(res.data.data[0]?.id);
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

    const onAdd = (event) => {
        let detentionTraffiesobj = {
            free_days: values.free_days,
            comm: values.comm,
            clientAgentselect: clientAgentselect,
            currencyselect: currencyselect,
        };
        console.log(detentionTraffiesobj, 'detentionTraffies obj');
        if (isFormValidate) {
            event.preventDefault();
            const createRes = createDetentionTraffiesApiCall(detentionTraffiesobj).then((createRes) => {
                console.log(createRes);
                if (createRes.status === 200) {
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
            <Row className="page-title ">
                <Col md={12}>
                    <Row>
                        <h3 className="mb-1 mt-0">Add Detention Traffies</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Detention Traffies', path: '/detentionTraffies' },
                                { label: 'Add Detention Traffies', path: '/detentionTraffies-add', active: true },
                            ]}
                        />
                    </Row>
                </Col>
            </Row>

            <Card>
                <CardBody>
                    <AvForm onSubmit={onAdd}>
                        <Row>
                            <Col lg={6}>
                                <AvField
                                    name="free_days"
                                    label="Free Days"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={6}>
                                <AvField name="comm" label="COMM" type="number" required onChange={handleChange} />
                            </Col>

                            <Col lg={6}>
                                <AvField
                                    type="select"
                                    value={clientAgentselect}
                                    required
                                    onChange={changeClientAgent}
                                    label="Client Agent *"
                                    name="selectclientAgent">
                                    {clientAgent.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.client_name}
                                        </option>
                                    ))}
                                </AvField>
                            </Col>
                            <Col lg={6}>
                                <AvField
                                    type="select"
                                    value={currencyselect}
                                    required
                                    onChange={changeCurrency}
                                    label="Currency *"
                                    name="selectcurrency">
                                    {currency.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.currency_name}
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
};

export default AddDetentionTraffies;
