import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from "availity-reactstrap-validation";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Modal, Backdrop, Fade, Box } from "@material-ui/core";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const AddAccesspoints = forwardRef((props, ref) => {

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    }

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

    useEffect(() => {
        getAccessmodel()
    }, [])

    const [accessmodel, setAccessmodel] = useState([])
    const [accessmodelselect, setAccessmodelselect] = useState('')

    const getAccessmodel = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/accessmodels/show/all`)
            .then(res => {
                setAccessmodel(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const changeAccessmodel = (event) => {
        setAccessmodelselect(event.target.value);
    }

    const onSubmit = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/accesspoints/store?display_name=${values.display_name}&value=${values.value}&access_model_id=${accessmodelselect}`)
            .then(res => {
                handleClose();
                window.location.reload(false);
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
                                            <InputLabel id="demo-simple-select-label">Accessmodel</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={accessmodelselect}
                                                onChange={changeAccessmodel}
                                                sx={{ width: 540, height: 36, mb: 2 }}

                                            >
                                                {accessmodel.map((acc) => (
                                                    <MenuItem value={acc.id} key={acc.id}>{acc.name}</MenuItem>
                                                ))}
                                            </Select>
                                            <AvField name="display_name" label="Display Name" type="text" required onChange={handleChange} />
                                            <AvField name="value" label="Value" type="text" required onChange={handleChange} />

                                            <Button color="primary" type="submit" onClick={onSubmit} style={{ marginRight: '2%' }}>Submit</Button>
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

export default AddAccesspoints;