import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from "availity-reactstrap-validation";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Modal, Backdrop, Fade, Box } from "@material-ui/core";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const AddSwaps = forwardRef((props, ref) => {

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
        getClient()
        getEquipment()
    }, [])

    const [client, setClient] = useState([])
    const [clientselect, setClientselect] = useState('')

    const [equipment, setEquipment] = useState([])
    const [equipmentselect, setEquipmentselect] = useState('')

    const getClient = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/clients/show/all`)
            .then(res => {
                setClient(res.data.data);
                setClientselect(res.data.data[0]?.id);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getEquipment = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/equipments/show/all`)
            .then(res => {
                setEquipment(res.data.data);
                setEquipmentselect(res.data.data[0]?.id);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const changeEquipment = (event) => {
        setEquipmentselect(event.target.value);
    }

    const changeClient = (event) => {
        setClientselect(event.target.value);
    }

    const onSubmit = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/swaps/store?date=${values.date}&equipment_id=${equipmentselect}&description=${values.description}&client_id_agent=${clientselect}`)
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
                                            <InputLabel id="demo-simple-select-label">Client</InputLabel><Select abelId="demo-simple-select-label" id="demo-simple-select" value={clientselect} onChange={changeClient} sx={{ width: 540, height: 36, mb: 2 }}>{client.map((con) => (<MenuItem value={con.id} key={con.id}>{con.client_name}</MenuItem>))}</Select>
                                            <InputLabel id="demo-simple-select-label">Equipment</InputLabel><Select abelId="demo-simple-select-label" id="demo-simple-select" value={equipmentselect} onChange={changeEquipment} sx={{ width: 540, height: 36, mb: 2 }}>{equipment.map((equ) => (<MenuItem value={equ.id} key={equ.id}>{equ.equipment_number}</MenuItem>))}</Select>
                                            <AvField name="date" label="Date" type="date" required onChange={handleChange} />
                                            <AvField name="description" label="Description" type="text" required onChange={handleChange} />

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
    )
})

export default AddSwaps;