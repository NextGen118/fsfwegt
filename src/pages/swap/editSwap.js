import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Modal, Backdrop, Fade, Box } from "@material-ui/core";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const EditSwaps = forwardRef((props, ref) => {

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    }

    useImperativeHandle(ref, () => ({
        handleOpen() {
            setOpen(true);
        }
    }));

    const { id } = useParams()
    const [values, setValues] = useState({ date: '', equipment_id: '', description: '', client_id_agent: '' });

    const history = useHistory()

    useEffect(() => {
        getSwapByid()
        getClient()
        getEquipment()
    }, [props.id])


    const [client, setClient] = useState([])
    const [clientselect, setClientselect] = useState('')

    const [equipment, setEquipment] = useState([])
    const [equipmentselect, setEquipmentselect] = useState('')

    const getClient = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/clients/show/all`)
            .then(res => {
                setClient(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getEquipment = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/equipments/show/all`)
            .then(res => {
                setEquipment(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getSwapByid = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/swaps/show/all`)
            .then(res => {
                const data = res.data.data.filter(ress => ress.id === parseInt(props.id))
                console.log(data, 'edit data')
                setValues({
                    date: data[0].date,
                    equipment_id: data[0].equipment_id,
                    description: data[0].description,
                    client_id_agent: data[0].client_id_agent,
                })
                setClientselect(data[0].client_id_agent)
                setEquipmentselect(data[0].equipment_id)
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

    const handleChange = (evt) => {
        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value
        });
    }

    const submitEdit = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/swaps/store?date=${values.date}&equipment_id=${equipmentselect}&description=${values.description}&client_id_agent=${clientselect}&id=${props.id}`)
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
                                            <InputLabel id="demo-simple-select-label">Client</InputLabel><Select abelId="demo-simple-select-label" id="demo-simple-select" value={clientselect} onChange={changeClient} sx={{ width: '100%', height: 40, mb: 2 }}>{client.map((con) => (<MenuItem value={con.id} key={con.id}>{con.client_name}</MenuItem>))}</Select>
                                            <InputLabel id="demo-simple-select-label">Equipment</InputLabel><Select abelId="demo-simple-select-label" id="demo-simple-select" value={equipmentselect} onChange={changeEquipment} sx={{ width: '100%', height: 40, mb: 2 }}>{equipment.map((equ) => (<MenuItem value={equ.id} key={equ.id}>{equ.equipment_number}</MenuItem>))}</Select>
                                            <AvField name="date" label="Date" type="date" required onChange={handleChange} value={values.date} />
                                            <AvField name="description" label="Description" type="text" required onChange={handleChange} value={values.description} />

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

export default EditSwaps;