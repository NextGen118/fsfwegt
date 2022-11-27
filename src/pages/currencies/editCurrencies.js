import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Button} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const EditCurrencies = (props) => {

    const { id } = useParams()
    const [values, setValues] = useState({countryid: '', currencycode: '',currencyname: '' });

    const history = useHistory()

    useEffect(() => {
        getCurrencyByid()
        getCountry()
    }, [props.id])

    const [country,setCountry] = useState([])
    const [countryselect, setCountryselect] = useState('')

    const getCountry = () => {
        axios.get(`http://127.0.0.1:8000/api/countries/show/all`)
            .then(res=>{
                setCountry(res.data)
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    const changeCountry = (event) => {
        setCountryselect(event.target.value);
        console.log(event.target.value, "country select")
    }

    const getCurrencyByid = () => {
        axios.get(`http://127.0.0.1:8000/api/currencies/show/all`)
            .then(res => {
                console.log(res.data)
                const data = res.data.filter(ress => ress.id === parseInt(id))
                console.log(data, 'edit data')
                setValues({
                    countryid: data[0].country_id,
                    currencycode: data[0].currency_code,
                    currencyname: data[0].currency_name
                })
                console.log(data[0].country_id);
                setCountryselect(data[0].country_id)
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
        axios.post(`http://127.0.0.1:8000/api/currencies/store?currency_code=${values.currencycode}&currency_name=${values.currencyname}&country_id=${countryselect}&id=${id}`)
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
                                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={countryselect}
                                    onChange={changeCountry}
                                    sx={{ width: 150, mb: 5 }}                               
                                >
                                    {country.map((con) => (
                                        <MenuItem value={con.id} key={con.id}>{con.country_name}</MenuItem>
                                    ))}
                                </Select>
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