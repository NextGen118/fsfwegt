import React, { useEffect, useState ,forwardRef,useImperativeHandle} from 'react';
import { Row, Col, Card, CardBody, Button} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Modal,Backdrop,Fade,Box } from "@material-ui/core";

const EditRoles = forwardRef((props,ref)=> {

    const [open,setOpen] = React.useState(false);
    const handleClose = () =>{
        setOpen(false);
    }

    useImperativeHandle(ref,()=>({
        handleOpen(){
            setOpen(true);
        }
    }));

    const [values, setValues] = useState({ rolename: '', description: '' });
    const history = useHistory()

    useEffect(() => {
        getRoleByid()
    }, [props.id])

    const getRoleByid = () => {
        axios.get(`http://127.0.0.1:8000/api/roles/show/all`)
            .then(res => {
                console.log(res.data.data)
                const data = res.data.data.filter(ress => ress.id === parseInt(props.id))
                console.log(data, 'edit data')
                setValues({
                    rolename: data[0].role_name,
                    description: data[0].description
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
        axios.post(`http://127.0.0.1:8000/api/roles/store?role_name=${values.rolename} &description=${values.description}&id=${props.id}`)
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
                                        <AvField name="rolename" label="Role Name" type="text" required onChange={handleChange} value={values.rolename} />
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

export default EditRoles;