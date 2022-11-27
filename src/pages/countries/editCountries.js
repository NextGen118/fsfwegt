import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditCountries = (props) => {

    const { id } = useParams()
    const [values, setValues] = useState({ countryname: '', capitalcityname: '' });

    const history = useHistory()

    useEffect(() => {
        getCountriesByid()
    }, [])

    const getCountriesByid = () => {
        axios.get(`http://127.0.0.1:8000/api/countries/show/all`)
            .then(res => {
                console.log(res.data)
                const data = res.data.data.filter(ress => ress.id === parseInt(id))
                console.log(data, 'edit data')
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
        axios.post(`http://127.0.0.1:8000/api/countries/store?country_name=${values.countryname} &capital_city_name=${values.capitalcityname}&id=${id}`)
            .then(res => {
                history.push('/countries')
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
                            { label: 'Countries', path: '/countries' },
                            { label: 'Edit Countries', path: '/edit-countries/:id', active: true },
                        ]}
                        title={'Edit Countries'}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            <AvForm>
                                <AvField name="countryname" label="City Name" type="text" required onChange={handleChange} value={values.countryname} />
                                <AvField name="capitalcityname" label="Capital City Name" type="text" required onChange={handleChange} value={values.capitalcityname} />

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

export default EditCountries;