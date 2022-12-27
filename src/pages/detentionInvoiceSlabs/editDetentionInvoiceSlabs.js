import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const EditDetentionInvoiceSlabs = (props) => {
    const { id } = useParams();
    const [values, setValues] = useState({
        slab_no: '',
        amount: '',
    });

    const history = useHistory();

    useEffect(() => {
        getDetentionInvoice();
        getDetentionInvoiceSlabsByid();
    }, [props.id]);

    const [detentionInvoice, setDetentionInvoice] = useState([]);
    const [detentionInvoiceselect, setDetentionInvoiceselect] = useState('');

    const getDetentionInvoice = () => {
        axios
            .get(`http://127.0.0.1:8000/api/detentioninvoice/show/all`)
            .then((res) => {
                setDetentionInvoice(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const changeDetentionInvoice = (event) => {
        setDetentionInvoiceselect(event.target.value);
    };

    const getDetentionInvoiceSlabsByid = () => {
        axios
            .get(`http://127.0.0.1:8000/api/detentioninvoiceslabs/show/all`)
            .then((res) => {
                const data = res.data.data.filter((ress) => ress.id === parseInt(id));
                setValues({
                    slab_no: data[0].slab_no,
                    amount: data[0].amount,
                });
                setDetentionInvoiceselect(data[0].detention_invoice_id);
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
                `http://127.0.0.1:8000/api/detentioninvoiceslabs/store?detention_invoice_id=${detentionInvoiceselect}&slab_no=${values.slab_no}&amount=${values.amount}&id=${id}`
            )
            .then((res) => {
                history.push('/detentionInvoiceSlabs');
                console.log('successfully1');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onBack = () => {
        history.push('/detentionInvoiceSlabs');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <Row>
                        <h3 className="mb-1 mt-0">Edit Detention Invoice Slabs</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Detention Invoice Slabs', path: '/detentionInvoiceSlabs' },
                                {
                                    label: 'Edit Detention Invoice Slabs',
                                    path: '/detentionInvoiceSlabs-add',
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
                            <Col lg={6}>
                                <InputLabel id="demo-simple-select-label">Detention Invoice No</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={detentionInvoiceselect}
                                    onChange={changeDetentionInvoice}
                                    sx={{ width: '100%', height: 40, mb: 2 }}>
                                    {detentionInvoice.map((rec) => (
                                        <MenuItem value={rec.id} key={rec.id}>
                                            {rec.detention_no}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Col>

                            <Col lg={6}>
                                <AvField
                                    name="slab_no"
                                    label="Slab No"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.slab_no}
                                />
                            </Col>
                            <Col lg={6}>
                                <AvField
                                    name="amount"
                                    label="Amount"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.amount}
                                />
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

export default EditDetentionInvoiceSlabs;
