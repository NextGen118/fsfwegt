import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput, Input } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Modal, Backdrop, Fade, Box } from '@material-ui/core';


const Addport = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        handleOpen() {
            setOpen(true);
        },
    }));

    const [values, setValues] = useState({});

    const handleChange = (evt) => {

        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value
        });
    }
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);

    };

    useEffect(() => {
        getCountry()
    }, [])

    const [country, setCountry] = useState([])
    const [countryselect, setCountryselect] = useState('')

    const getCountry = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/countries/show/all`)
            .then(res => {
                setCountry(res.data.data);
                setCountryselect(res.data.data[0]?.id);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const changeCountry = (event) => {
        setCountryselect(event.target.value);
        console.log(event.target.value, "country select")
    };

    const onSubmit = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/ports/store?port_code=${values.port_code}&port_name=${values.port_name}&sub_code=${values.sub_code}&country_id=${countryselect}`)
            .then(res => {
                console.log(res, "port res")

                console.log("successfully")
                props.refresh()
                handleClose()

            })
            .catch((error) => {
                console.log(error);
            });

    }

    return (
        <>
            {console.log(country, "country")}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
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
                                            <AvField name="port_code" label="Port Code" type="text" required onChange={handleChange} />
                                            <AvField name="port_name" label="Port Name" type="text" required onChange={handleChange} />
                                            <AvField name="sub_code" label="Sub Code" type="text" required onChange={handleChange} />

                                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={countryselect}
                                                onChange={changeCountry}
                                                sx={{ width: '100%', height: 40,mb: 2 }}

                                            >

                                                {country.map((con) => (

                                                    <MenuItem value={con.id} key={con.id}>{con.country_name}</MenuItem>

                                                ))}

                                            </Select>

                                            <br />
                                            <Button color="primary" type="submit" onClick={onSubmit} style={{ marginRight: '2%' }}>
                                                Submit
                                            </Button>
                                            <Button color="danger" onClick={handleClose}>
                                                Close
                                            </Button>
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

export default Addport;