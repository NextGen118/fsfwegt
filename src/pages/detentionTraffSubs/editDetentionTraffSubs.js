import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const EditDetentionTraffSubs = (props) => {
    const { id } = useParams();
    const [values, setValues] = useState({
        tariff_name: '',
        slab_days: '',
        slab_rate: '',
    });

    const history = useHistory();

    useEffect(() => {
        getDetentiontraffies();
        getDetentionTraffSubsByid();
    }, [props.id]);

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

    const getDetentionTraffSubsByid = () => {
        axios
            .get(`http://127.0.0.1:8000/api/detentiontraffsubs/show/all`)
            .then((res) => {
                const data = res.data.data.filter((ress) => ress.id === parseInt(id));
                setValues({
                    tariff_name: data[0].tariff_name,
                    slab_days: data[0].slab_days,
                    slab_rate: data[0].slab_rate,
                });
                setDetentiontraffiesselect(data[0].detention_traffic_id);
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
                `http://127.0.0.1:8000/api/detentiontraffsubs/store?tariff_name=${values.tariff_name}&slab_days=${values.slab_days}&slab_rate=${values.slab_rate}&detention_traffic_id=${detentiontraffiesselect}&id=${id}`
            )
            .then((res) => {
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
            <Row className="page-title">
                <Col md={12}>
                    <Row>
                        <h3 className="mb-1 mt-0">Edit Detention Traff Subs</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Detention Traff Subs', path: '/detentionTraffSubs' },
                                { label: 'Edit Detention Traff Subs', path: '/detentionTraffSubs-add', active: true },
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
                                    value={values.tariff_name}
                                />
                            </Col>
                            <Col lg={6}>
                                <AvField
                                    name="slab_days"
                                    label="Slab Days"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.slab_days}
                                />
                            </Col>
                            <Col lg={6}>
                                <AvField
                                    name="slab_rate"
                                    label="Slab Rate"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.slab_rate}
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
                    <Button color="primary" type="submit" onClick={() => submitEdit()}>
                        Edit
                    </Button>
                    &nbsp;
                    <Button color="danger" type="submit" onClick={onBack}>
                        Back
                    </Button>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default EditDetentionTraffSubs;
