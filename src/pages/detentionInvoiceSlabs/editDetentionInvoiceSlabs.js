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
    editDetentionInvoiceSlabsApiCall,
    showAllDetentionInvoiceSlabsApi,
} from '../../axios/detentionInvoiceSlabs/detentionInvoiceSlabs';
import SuccessMsg from '../../components/AlertMsg';

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

    const getDetentionInvoiceSlabsByid = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/detentioninvoiceslabs/show/all`)
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
        if (!values.slab_no || !values.amount || !detentionInvoiceselect) {
            return false;
        }

        return true;
    }

    const onEdit = (event) => {
        let detentionInvoiceSlabsobj = {
            slab_no: values.slab_no,
            amount: values.amount,
            detentionInvoiceselect: detentionInvoiceselect,
            id: id,
        };
        console.log(detentionInvoiceSlabsobj, 'detentionInvoiceSlabs obj');
        if (isFormValidate) {
            event.preventDefault();
            const editRes = editDetentionInvoiceSlabsApiCall(detentionInvoiceSlabsobj).then((editRes) => {
                console.log(editRes);
                if (editRes.status === 200) {
                    showAllDetentionInvoiceSlabsApi();
                    history.push('/detentionInvoiceSlabs');
                    setAlertSucces(false);
                } else {
                    setAlertFaild(false);
                }
            });
        }
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
                    <AvForm onSubmit={onEdit}>
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
                        <Grid md={12} sx={{ textAlign: 'right' }}>
                            <Button color="danger" style={{ marginLeft: 15 }} type="submit" onClick={onBack}>
                                Back
                            </Button>
                            <Button color="primary" style={{ marginLeft: 15 }} type="submit">
                                Edit
                            </Button>
                        </Grid>
                    </AvForm>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default EditDetentionInvoiceSlabs;
