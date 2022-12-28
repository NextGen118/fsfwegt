import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Grid } from '@mui/material';

const AddDetentionInvoiceSlabs = forwardRef((props, ref) => {
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
        getDetentionInvoice();
    }, []);

    const [detentionInvoice, setDetentionInvoice] = useState([]);
    const [detentionInvoiceselect, setDetentionInvoiceselect] = useState('');

    const getDetentionInvoice = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/detentioninvoice/show/all`)
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

    const onSubmit = () => {
        axios
            .post(
                `${process.env.REACT_APP_BASE_URL}/detentioninvoiceslabs/store?detention_invoice_id=${detentionInvoiceselect}&slab_no=${values.slab_no}&amount=${values.amount}`
            )

            .then((res) => {
                history.push('/detentionInvoiceSlabs');
                console.log('successfully1');
            })
            .catch((error) => {
                console.log(error);
                console.log('error');
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
                        <h3 className="mb-1 mt-0">Add Detention Invoice No</h3>
                    </Row>
                    <Row>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Detention Invoice Slabs', path: '/detentionInvoiceSlabs' },
                                {
                                    label: 'Add Detention Invoice Slabs',
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
                                <InputLabel id="demo-simple-select-label">Detention Invoice Slabs</InputLabel>
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
                                <AvField name="slab_no" label="Slab No" type="text" required onChange={handleChange} />
                            </Col>
                            <Col lg={6}>
                                <AvField name="amount" label="Amount" type="number" required onChange={handleChange} />
                            </Col>
                        </Row>
                    </AvForm>
                    <Grid md={12} sx={{ textAlign: 'right' }}>
                        <Button color="danger" type="submit" style={{ marginLeft: 15 }} onClick={onBack}>
                            Back
                        </Button>
                        <Button color="primary" type="submit" style={{ marginLeft: 15 }} onClick={onSubmit}>
                            Submit
                        </Button>
                    </Grid>
                </CardBody>
            </Card>
        </React.Fragment>
    );
});

export default AddDetentionInvoiceSlabs;
