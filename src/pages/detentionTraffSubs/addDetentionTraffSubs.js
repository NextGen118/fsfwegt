import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Grid } from '@mui/material';

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
            .get(`http://127.0.0.1:8000/api/detentiontraffies/show/all`)
            .then((res) => {
                setDetentiontraffies(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const changeDetentiontraffies = (event) => {
        setDetentiontraffiesselect(event.target.value);
        console.log(event.target.value, ' select');
    };

    const onSubmit = () => {
        axios
            .post(
                `http://127.0.0.1:8000/api/detentiontraffsubs/store?tariff_name=${values.tariff_name}&slab_days=${values.slab_days}&slab_rate=${values.slab_rate}&detention_traffic_id=${detentiontraffiesselect}`
            )

            .then((res) => {
                console.log('successfully');

                history.push('/detentionTraffSubs');
            })
            .catch((error) => {
                console.log(error);
            });
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
                    <AvForm>
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
                                <InputLabel id="demo-simple-select-label">Detention Traff</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={detentiontraffiesselect}
                                    onChange={changeDetentiontraffies}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {detentiontraffies.map((con) => (
                                        <MenuItem value={con.id} key={con.id}>
                                            {con.id}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>
                        </Row>
                    </AvForm>
                    <Grid md={12} sx={{ textAlign: 'right' }}>
                        <Button color="primary" type="submit" style={{ marginLeft: 15 }} onClick={onSubmit}>
                            Submit
                        </Button>
                        <Button color="danger" type="submit" style={{ marginLeft: 15 }} onClick={onBack}>
                            Back
                        </Button>
                    </Grid>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default AddDetentionTraffSubs;
