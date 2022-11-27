import React,{useState,useEffect} from "react";
import {Row,Col,Card,CardBody,Button} from 'reactstrap';
import { AvForm,AvField } from "availity-reactstrap-validation";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const AddCurrencies = (props) =>{

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
        getCountry()
    }, [])

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

    const onSubmit = () =>{
        axios.post(`http://127.0.0.1:8000/api/currencies/store?currency_code=${values.currencycode}&currency_name=${values.currencyname}&country_id=${countryselect}`)
            .then(res=>{
                console.log("success")
                history.push('/currencies')
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    return(
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle breadCrumbItems={[
                        {label: 'Currencies',path:'/currencies'},
                        {label: 'Add Currency',path:'/add-currencies',active:true}
                    ]}
                    title={'Add Currency'}
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
                                
                                <AvField name="currencycode" label="Currency Code" type="text" required onChange={handleChange}/>
                                <AvField name="currencyname" label="Currency Name" type="text" required onChange={handleChange}/>
                                <Button color="primary" type="submit" onClick={onSubmit}>Submit</Button>
                            </AvForm>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default AddCurrencies;