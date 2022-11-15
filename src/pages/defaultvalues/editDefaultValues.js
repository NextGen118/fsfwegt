import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditDefaultvalues = (props) => {

    const { id } = useParams()
    const [values, setValues] = useState({ category: '', c_value: '' });

    const history = useHistory()

    useEffect(() => {
        getDefaultvaluesByid()
    }, [])

    const getDefaultvaluesByid = () => {
        axios.get(`http://127.0.0.1:8000/api/defaultvalues/show/all`)
            .then(res => {
                console.log(res.data)
                const data = res.data.filter(ress => ress.id === parseInt(id))
                console.log(data, 'edit data')
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
        axios.post(`http://127.0.0.1:8000/api/defaultvalues/store?category=${values.category}&c_value=${values.c_value}&id=${id}`)
            .then(res => {
                history.push('/defaultvalues')
                console.log("success to edit")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Default values', path: '/defaultvalues' },
                            { label: 'Edit Default value', path: '/edit-defaultvalues/:id', active: true },
                        ]}
                        title={'Edit Default value'}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            <AvForm>
                                <AvField name="category" label="Category" type="text" required onChange={handleChange} value={values.category} />
                                <AvField name="c_value" label="C Value" type="text" required onChange={handleChange} value={values.c_value} />

                                <Button color="primary" type="submit" onClick={() => submitEdit()}>
                                    Edit
                                </Button>
                            </AvForm>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment >
    );
}

export default EditDefaultvalues;