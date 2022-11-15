import React,{useEffect,useState} from "react";
import { Row,Col,Card,CardBody,Table } from "reactstrap";
import axios from "axios";
import {Edit} from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';

const AccesspointsTable = (props)=>{

    const history = useHistory()

    const [accesspoints, setAccesspoints] = useState([])

    useEffect(()=>{
        getAccesspoints()
    },[])

    const getAccesspoints = () => {
        axios.get(`http://127.0.0.1:8000/api/accesspoints/show/all`)
            .then(res=>{
                console.log(res.data)
                setAccesspoints(res.data)
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    const editAccesspoints = (id) =>{
        history.push(`edit-accesspoints/${id}`)
    }

    return (
        <Card>
            <CardBody>
                <Table className="mb-o">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Display Name</th>
                            <th>Value</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accesspoints.map((record) => {
                            return(
                                <tr key={record.id}>
                                    <th scope="row">{record.id}</th>
                                    <td>{record.display_name}</td>
                                    <td>{record.value}</td>
                                    <td><Edit onClick={()=>editAccesspoints(record.id)}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
}

const AccesspointsList = (props) => {
    return(
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle 
                        breadCrumbItems = {[{label:'accesspoints', path: '/accesspoints'}]}
                        title = {'Accesspoints List'}
                    />
                </Col>
            </Row>
            <Row>
                <Col xl={12}>
                  <AccesspointsTable/>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default AccesspointsList;