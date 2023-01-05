import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Grid } from '@mui/material';
import {
    createDetentionTraffSubsApiCall,
    showAllDetentionTraffSubsApi,
} from '../../axios/detentionTraffSubs/detentionTraffSubs';
import SuccessMsg from '../../components/AlertMsg';

const AddDetentionTraffSubs = (props) => {
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
        getDetentiontraffies();
    }, []);

    const [detentiontraffies, setDetentiontraffies] = useState([]);
    const [detentiontraffiesselect, setDetentiontraffiesselect] = useState('');

    const getDetentiontraffies = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/detentiontraffies/show/all`)
            .then((res) => {
                setDetentiontraffies(res.data.data);
                setDetentiontraffiesselect(res.data.data[0]?.id);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const changeDetentiontraffies = (event) => {
        setDetentiontraffiesselect(event.target.value);
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
        if (!values.tariff_name || !values.slab_days || !values.slab_rate || !detentiontraffiesselect) {
            return false;
        }

        return true;
    }

    const onAdd = (event) => {
        let detentionTraffSubsobj = {
            tariff_name: values.tariff_name,
            slab_days: values.slab_days,
            slab_rate: values.slab_rate,
            detentiontraffiesselect: detentiontraffiesselect,
        };
        console.log(detentionTraffSubsobj, 'detentionTraffSubs obj');
        if (isFormValidate) {
            event.preventDefault();
            const createRes = createDetentionTraffSubsApiCall(detentionTraffSubsobj).then((createRes) => {
                console.log(createRes);
                if (createRes.status === 200) {
                    showAllDetentionTraffSubsApi();
                    history.push('/detentionTraffSubs');
                    setAlertSucces(false);
                } else {
                    setAlertFaild(false);
                }
            });
        }
    };
    const onBack = () => {
        history.push('/detentionTraffSubs');
    };

    return (
        <React.Fragment>
            <Row className="page-title ">
                <Col md={12}>
                    <Row>
                        <h3 className="mb-1 mt-0">Add Detention Traff Subs</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Detention Traff Subs', path: '/detentionTraffSubs' },
                                { label: 'Add Detention Traff Subs', path: '/detentionTraffSubs-add', active: true },
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
                                    name="tariff_name"
                                    label="Tariff Name"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={6}>
                                <AvField
                                    name="slab_days"
                                    label="Slab Days"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={6}>
                                <AvField
                                    name="slab_rate"
                                    label="Slab Rate"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>

                            <Col lg={6}>
                                <AvField
                                    type="select"
                                    value={detentiontraffiesselect}
                                    required
                                    onChange={changeDetentiontraffies}
                                    label="Detention Traff *"
                                    name="selectdetentiontraffies">
                                    {detentiontraffies.map((con) => (
                                        <option value={con.id} key={con.id}>
                                            {' '}
                                            {con.id}
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

export default AddDetentionTraffSubs;
