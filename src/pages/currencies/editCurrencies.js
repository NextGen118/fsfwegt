import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditCurrencies = (props) => {

    const { id } = useParams()
    const [values, setValues] = useState({countryid: '', currencycode: '',currencyname: '' });

    const history = useHistory()

    useEffect(() => {
        getCurrencyByid()
    }, [])

    // const getCurrencyByid1 = () => {
    //     axios.get(`http://127.0.0.1:8000/api/currencies/show/{countryid}?countryid=${id}`)
    //         .then(res => {
    //             console.log(res.data)
    //             setValues({
    //                 countryid: res.data[0].country_id,
    //                 currencycode: res.data[0].currency_code,
    //                 currencyname: res.data[0].currency_name
    //             })
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }

    const getCurrencyByid = () => {
        axios.get(`http://127.0.0.1:8000/api/currencies/show/all`)
            .then(res => {
                console.log(res.data)
                const data = res.data.filter(ress => ress.id === parseInt(id))
                console.log(data, 'edit data')
                setValues({
                    countryid: res.data[0].country_id,
                    currencycode: res.data[0].currency_code,
                    currencyname: res.data[0].currency_name
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
        axios.post(`http://127.0.0.1:8000/api/currencies/store?currency_code=${values.currencycode}&currency_name=${values.currencyname}&country_id=${values.countryid}&id=${id}`)
            .then(res => {
                history.push('/currencies')
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
                            { label: 'Currencies', path: '/currencies' },
                            { label: 'Edit Currency', path: '/edit-currencies/:id', active: true },
                        ]}
                        title={'Edit Currency'}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            <AvForm>
                                <AvField name="countryid" label="Country ID" type="number" required onChange={handleChange} value={values.countryid} />
                                <AvField name="currencycode" label="Currency Code" type="text" required onChange={handleChange} value={values.currencycode} />
                                <AvField name="currencyname" label="Currency Name" type="text" required onChange={handleChange} value={values.currencyname} />

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

export default EditCurrencies;