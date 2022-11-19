import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput, Input } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Modal, Backdrop, Fade, Box } from '@material-ui/core';

const EditProperties = forwardRef((props, ref) => {
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

    const history = useHistory()

    useEffect(() => {
        getPropertiesByid()
        console.log(props.id, "idd")
    }, [props.id])


    const getPropertiesByid = () => {
        axios.get(`http://127.0.0.1:8000/api/properties/show/{id}?id=${props.id}`)
            .then(res => {
                console.log(res.data)
                setValues({
                    propertiesname: res.data[0].property_name,
                    description: res.data[0].description
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
        axios.post(`http://127.0.0.1:8000/api/properties/store?property_name=${values.propertiesname} &description=${values.description}&id=${props.id}`)
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
                                    <CardBody>

                                        <AvForm>
                                            <AvField name="propertiesname" label="Propeeties Name" type="text" required onChange={handleChange} value={values.propertiesname} />
                                            <AvField name="description" label="Description" type="text" required onChange={handleChange} value={values.description} />

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

export default EditProperties;