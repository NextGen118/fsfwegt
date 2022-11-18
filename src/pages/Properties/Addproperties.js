import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput, Input } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Modal, Backdrop, Fade, Box } from '@material-ui/core';


const Addproperties = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        handleOpen() {
            setOpen(true);
        },
    }));

    const [values, setValues] = useState({});
    let history = useHistory()

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
    const onSubmit = () => {
        axios.post(`http://127.0.0.1:8000/api/properties/store?property_name=${values.propertiesname}&description=${values.description}`)
            .then(res => {
                console.log("successfully")
                handleClose()

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
                                            <AvField name="propertiesname" label="Propeeties Name" type="text" required onChange={handleChange} />
                                            <AvField name="description" label="Description" type="text" required onChange={handleChange} />

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

export default Addproperties;