import React,{useEffect,useState} from "react";
import { Row,Col,Card,CardBody,Table } from "reactstrap";
import axios from "axios";
import {Edit} from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';

const CountriesTable = (props)=>{

    const history = useHistory()

    const [countries, setCountries] = useState([])

    useEffect(()=>{
        getCountries()
    },[])

    const getCountries = () => {
        axios.get(`http://127.0.0.1:8000/api/countries/show/all`)
            .then(res=>{
                console.log(res.data.data)
                setCountries(res.data.data)
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    const editCountries = (id) =>{
        history.push(`edit-countries/${id}`)
    }

    return (
        <Card>
            <CardBody>
                <Table className="mb-o">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Country Name</th>
                            <th>Capital City Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countries.map((record) => {
                            return(
                                <tr key={record.id}>
                                    <th scope="row">{record.id}</th>
                                    <td>{record.country_name}</td>
                                    <td>{record.capital_city_name}</td>
                                    <td><Edit onClick={()=>editCountries(record.id)}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
}

const countriesList = (props) => {
    return(
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle 
                        breadCrumbItems = {[{label:'countries', path: '/countries'}]}
                        title = {'Countries List'}
                    />
                </Col>
            </Row>
            <Row>
                <Col xl={12}>
                  <CountriesTable/>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default countriesList;