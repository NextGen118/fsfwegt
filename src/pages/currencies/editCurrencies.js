import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Modal, Backdrop, Fade, Box } from "@material-ui/core";

const EditCurrencies = forwardRef((props, ref) => {

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    }

    useImperativeHandle(ref, () => ({
        handleOpen() {
            setOpen(true);
        }
    }));

    const [values, setValues] = useState({ countryid: '', currencycode: '', currencyname: '' });

    const history = useHistory()

    useEffect(() => {
        getCurrencyByid()
        getCountry()
    }, [props.id])

    const [country, setCountry] = useState([])
    const [countryselect, setCountryselect] = useState('')

    const getCountry = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/countries/show/all`)
            .then(res => {
                setCountry(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const changeCountry = (event) => {
        setCountryselect(event.target.value);
        console.log(event.target.value, "country select")
    }

    const getCurrencyByid = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/currencies/show/all`)
            .then(res => {
                const data = res.data.data.filter(ress => ress.id === parseInt(props.id))
                console.log(data, 'edit data')
                setValues({
                    countryid: data[0].country_id,
                    currencycode: data[0].currency_code,
                    currencyname: data[0].currency_name
                })
                setCountryselect(data[0].country_id)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleChange = (evt) => {
        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value
        });
    }

    const submitEdit = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/currencies/store?currency_code=${values.currencycode}&currency_name=${values.currencyname}&country_id=${countryselect}&id=${props.id}`)
            .then(res => {
                props.refresh();
                handleClose();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={open}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        bgcolor: 'background.paper',
                        boxShadow: 10,
                        pt: 3,
                    }}>
                        <Row>
                            <Col>
                                <Card>
                                    <CardBody>
                                        <AvForm>
                                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={countryselect}
                                                onChange={changeCountry}
                                                sx={{ width: 540, height: 36, mb: 2 }}
                                            >
                                                {country.map((con) => (
                                                    <MenuItem value={con.id} key={con.id}>{con.country_name}</MenuItem>
                                                ))}
                                            </Select>
                                            <AvField name="currencycode" label="Currency Code" type="text" required onChange={handleChange} value={values.currencycode} />
                                            <AvField name="currencyname" label="Currency Name" type="text" required onChange={handleChange} value={values.currencyname} />
                                            <Button color="primary" type="submit" onClick={submitEdit} style={{ marginRight: '2%' }}>Edit</Button>
                                            <Button color="danger" onClick={handleClose}>Close</Button>
                                        </AvForm>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
})

export default EditCurrencies;