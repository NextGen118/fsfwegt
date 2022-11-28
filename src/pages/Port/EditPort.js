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

const EditPort = forwardRef((props, ref) => {
    console.log(props.id, "iddd")
    useImperativeHandle(ref, () => ({
        handleOpen() {
            setOpen(true);
        },
    }));
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);

    };

    //const { id } = useParams()
    const [values, setValues] = useState({ propertiesname: '', description: '' });

    const [country, setCountry] = useState([])
    const [countryselect, setCountryselect] = useState('')

    const history = useHistory()

    useEffect(() => {
        getPropertiesByid()
        getCountry()
        console.log(props.id, "idd")
    }, [props.id])


    const getPropertiesByid = () => {
        axios.get(`http://127.0.0.1:8000/api/ports/show/all`)
            .then(res => {
                console.log(res.data)
                const data = res.data.data.filter(ress => ress.id === parseInt(props.id))
                setValues({
                    port_code: data[0].port_code,
                    port_name: data[0].port_name,
                    sub_code: data[0].sub_code,
                    country_id: data[0].country_id,
                })
                setCountryselect(data[0].country_id)
            })
            .catch((error) => {
                console.log(error);
            });
    }



    const getCountry = () => {
        axios.get(`http://127.0.0.1:8000/api/countries/show/all`)
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
    };

    const handleChange = (evt) => {

        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value
        });
    }

    const submitEdit = () => {
        axios.post(`http://127.0.0.1:8000/api/ports/store?port_code=${values.port_code}&port_name=${values.port_name}&sub_code=${values.sub_code}&country_id=${countryselect}&id=${props.id}`)
            .then(res => {
                props.refresh()
                handleClose()
                console.log("success to edit")
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
                                    <h3 style={{ marginLeft: 15 }}>Edit Port</h3 >
                                    <CardBody>

                                        <AvForm>
                                            <AvField name="port_code" label="Port Code" type="text" required onChange={handleChange} value={values.port_code} />
                                            <AvField name="port_name" label="Port Name" type="text" required onChange={handleChange} value={values.port_name} />
                                            <AvField name="sub_code" label="Sub Code" type="text" required onChange={handleChange} value={values.sub_code} />

                                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={countryselect}
                                                onChange={changeCountry}
                                                sx={{ width: 150, mb: 5 }}

                                            >

                                                {country.map((con) => (

                                                    <MenuItem value={con.id} key={con.id}>{con.country_name}</MenuItem>

                                                ))}

                                            </Select>

                                            <br />
                                            <Button color="primary" type="submit" onClick={submitEdit} style={{ marginRight: '2%' }}>
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

export default EditPort;