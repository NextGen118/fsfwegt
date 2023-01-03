import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Modal, Backdrop, Fade, Box } from "@material-ui/core";


const EditCountries = forwardRef((props, ref) => {

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    }

    useImperativeHandle(ref, () => ({
        handleOpen() {
            setOpen(true);
        }
    }));

    const [values, setValues] = useState({ countryname: '', capitalcityname: '' });

    const history = useHistory()

    useEffect(() => {
        getCountriesByid()
    }, [props.id])

    const getCountriesByid = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/countries/show/all`)
            .then(res => {
                const data = res.data.data.filter(ress => ress.id === parseInt(props.id))
                setValues({
                    countryname: data[0].country_name,
                    capitalcityname: data[0].capital_city_name
                })
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
        axios.post(`${process.env.REACT_APP_BASE_URL}/countries/store?country_name=${values.countryname} &capital_city_name=${values.capitalcityname}&id=${props.id}`)
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
                                            <AvField name="countryname" label="Country Name" type="text" required onChange={handleChange} value={values.countryname} />
                                            <AvField name="capitalcityname" label="Capital City Name" type="text" required onChange={handleChange} value={values.capitalcityname} />

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

export default EditCountries;