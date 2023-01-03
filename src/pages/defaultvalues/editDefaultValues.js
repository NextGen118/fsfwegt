import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Modal, Backdrop, Fade, Box } from "@material-ui/core";

const EditDefaultvalues = forwardRef((props, ref) => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    }

    useImperativeHandle(ref, () => ({
        handleOpen() {
            setOpen(true);
        }
    }));

    const [values, setValues] = useState({ category: '', c_value: '' });

    const history = useHistory()

    useEffect(() => {
        getDefaultvaluesByid()
    }, [props.id])

    const getDefaultvaluesByid = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/defaultvalues/show/all`)
            .then(res => {
                console.log(res.data)
                const data = res.data.data.filter(ress => ress.id === parseInt(props.id))
                setValues({
                    category: data[0].category,
                    c_value: data[0].c_value
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
        axios.post(`${process.env.REACT_APP_BASE_URL}/defaultvalues/store?category=${values.category}&c_value=${values.c_value}&id=${props.id}`)
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
                                            <AvField name="category" label="Category" type="text" required onChange={handleChange} value={values.category} />
                                            <AvField name="c_value" label="C Value" type="text" required onChange={handleChange} value={values.c_value} />

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

export default EditDefaultvalues;