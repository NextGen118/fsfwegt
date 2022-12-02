import React,{useState,useEffect,forwardRef,useImperativeHandle} from "react";
import {Row,Col,Card,CardBody,Button} from 'reactstrap';
import { AvForm,AvField } from "availity-reactstrap-validation";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Modal,Backdrop,Fade,Box } from "@material-ui/core";

const AddEquipmentSaleDetails = forwardRef((props,ref) =>{

    const [open,setOpen] = React.useState(false);
    const handleClose=()=>{
        setOpen(false);
    }

    useImperativeHandle(ref,()=>({
        handleOpen(){
            setOpen(true);
        },
    }));

    const [values,setValues] = useState({});
    let history = useHistory()

    const handleChange = (evt) => {
        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value
        });
    }

    useEffect(() => {
        getEquipment()
        getEquipmentsale()
    }, [])

    const [equipment,setEquipment] = useState([])
    const [equipmentselect, setEquipmentselect] = useState('')

    const [equipmentsale,setEquipmentsale] = useState([])
    const [equipmentsaleselect, setEquipmentsaleselect] = useState('')

    const getEquipment = () => {
        axios.get(`http://127.0.0.1:8000/api/equipments/show/all`)
            .then(res=>{
                setEquipment(res.data.data)
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    const getEquipmentsale = () => {
        axios.get(`http://127.0.0.1:8000/api/equipmentsales/show/all`)
            .then(res=>{
                setEquipmentsale(res.data.data)
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    const changeEquipment = (event) => {
        setEquipmentselect(event.target.value);
    }

    const changeEquipmentsale = (event) => {
        setEquipmentsaleselect(event.target.value);
    }

    const onSubmit = () =>{
        axios.post(`http://127.0.0.1:8000/api/equipmentsaledetails/store?equipment_sale_id=${equipmentsaleselect}&equipment_id=${equipmentselect}&amount=${values.amount}&destination=${values.destination}`)
            .then(res=>{
                handleClose();
                window.location.reload(false);
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    return(
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{timeout:500}}
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
                                            <InputLabel id="demo-simple-select-label">Equipment</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={equipmentselect}
                                                onChange={changeEquipment}
                                                sx={{ width: 540, height:36 , mb: 2}}

                                            >
                                                {equipment.map((equ) => (
                                                    <MenuItem value={equ.id} key={equ.id}>{equ.equipment_number}</MenuItem>
                                                ))}
                                            </Select>  
             
                                            <InputLabel id="demo-simple-select-label">Equipment Sale</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={equipmentsaleselect}
                                                onChange={changeEquipmentsale}
                                                sx={{ width: 540, height:36 , mb: 2}}

                                            >
                                                {equipmentsale.map((esale) => (
                                                    <MenuItem value={esale.id} key={esale.id}>{esale.description}</MenuItem>
                                                ))}
                                            </Select>  

                                            <AvField name="amount" label="Amount" type="text" required onChange={handleChange}/>
                                            <AvField name="destination" label="Destination" type="text" required onChange={handleChange}/>
                                           
                                            <Button color="primary" type="submit" onClick={onSubmit} style={{marginRight:'2%'}}>Submit</Button>
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

export default AddEquipmentSaleDetails;