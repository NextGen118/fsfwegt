import React,{useEffect,useState} from "react";
import { Row,Col,Card,CardBody,Table } from "reactstrap";
import axios from "axios";
import {Edit} from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';

const CurrenciesTable = (props)=>{

    const history = useHistory()

    const [currencies, setCurrencies] = useState([])

    useEffect(()=>{
        getCurrencies()
    },[])

    const getCurrencies = () => {
        axios.get(`http://127.0.0.1:8000/api/currencies/show/all`)
            .then(res=>{
                console.log(res.data)
                setCurrencies(res.data)
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    const editCurrencies = (id) =>{
        history.push(`edit-currencies/${id}`)
    }

    return (
        <Card>
            <CardBody>
                <Table className="mb-o">
                    <thead>
                        <tr>
                            <th>Country Name</th>
                            <th>Currency Code</th>
                            <th>Currency Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currencies.map((record) => {
                            return(
                                <tr key={record.id}>
                                    <th scope="row">{record.country_name}</th>
                                    <td>{record.currency_code}</td>
                                    <td>{record.currency_name}</td>
                                    <td><Edit onClick={()=>editCurrencies(record.id)}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
}

const CurrenciesList = (props) => {
    return(
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle 
                        breadCrumbItems = {[{label:'currencies', path: '/currencies'}]}
                        title = {'Currencies List'}
                    />
                </Col>
            </Row>
            <Row>
                <Col xl={12}>
                  <CurrenciesTable/>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default CurrenciesList;