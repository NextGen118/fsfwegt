import React,{useEffect,useState} from "react";
import { Row,Col,Card,CardBody,Table } from "reactstrap";
import axios from "axios";
import {Edit} from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';

const SwaphistoriesTable = (props)=>{

    const history = useHistory()

    const [swaphistories, setSwaphistories] = useState([])

    useEffect(()=>{
        getSwaphistories()
    },[])

    const getSwaphistories = () => {
        axios.get(`http://127.0.0.1:8000/api/swaphistories/show/all`)
            .then(res=>{
                console.log(res.data)
                setSwaphistories(res.data)
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    const editSwaphistories = (id) =>{
        history.push(`edit-swaphistories/${id}`)
    }

    return (
        <Card>
            <CardBody>
                <Table className="mb-o">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Status</th>
                            <th>Equipment Id</th>
                            <th>Client Id Agent</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {swaphistories.map((record) => {
                            return(
                                <tr key={record.id}>
                                    <th scope="row">{record.id}</th>
                                    <td>{record.status}</td>
                                    <td>{record.equipment_id}</td>
                                    <td>{record.client_id_agent}</td>
                                    <td><Edit onClick={()=>editSwaphistories(record.id)}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
}

const SwaphistoriesList = (props) => {
    return(
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle 
                        breadCrumbItems = {[{label:'swaphistories', path: '/swaphistories'}]}
                        title = {'SwapHistories List'}
                    />
                </Col>
            </Row>
            <Row>
                <Col xl={12}>
                  <SwaphistoriesTable/>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default SwaphistoriesList;