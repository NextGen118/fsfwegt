import React,{useEffect,useState} from "react";
import { Row,Col,Card,CardBody,Table } from "reactstrap";
import axios from "axios";
import {Edit} from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';

const DefaultvaluesTable = (props)=>{

    const history = useHistory()

    const [defaultvalues, setDefaultvalues] = useState([])

    useEffect(()=>{
        getDefaultvalues()
    },[])

    const getDefaultvalues = () => {
        axios.get(`http://127.0.0.1:8000/api/defaultvalues/show/all`)
            .then(res=>{
                console.log(res.data)
                setDefaultvalues(res.data)
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    const editDefaultvalues = (id) =>{
        history.push(`edit-defaultvalues/${id}`)
    }

    return (
        <Card>
            <CardBody>
                <Table className="mb-o">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Category</th>
                            <th>C Value</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {defaultvalues.map((record) => {
                            return(
                                <tr key={record.id}>
                                    <th scope="row">{record.id}</th>
                                    <td>{record.category}</td>
                                    <td>{record.c_value}</td>
                                    <td><Edit onClick={()=>editDefaultvalues(record.id)}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
}

const DefaultvaluesList = (props) => {
    return(
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle 
                        breadCrumbItems = {[{label:'default values', path: '/defaultvalues'}]}
                        title = {'Default values List'}
                    />
                </Col>
            </Row>
            <Row>
                <Col xl={12}>
                  <DefaultvaluesTable/>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default DefaultvaluesList;