import React,{useEffect,useState} from "react";
import { Row,Col,Card,CardBody,Table } from "reactstrap";
import axios from "axios";
import {Edit} from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';

const SwapsTable = (props)=>{

    const history = useHistory()

    const [swaps, setSwaps] = useState([])

    useEffect(()=>{
        getSwaps()
    },[])

    const getSwaps = () => {
        axios.get(`http://127.0.0.1:8000/api/swaps/show/all`)
            .then(res=>{
                console.log(res.data)
                setSwaps(res.data)
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    const editSwaps = (id) =>{
        history.push(`edit-swaps/${id}`)
    }

    return (
        <Card>
            <CardBody>
                <Table className="mb-o">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Equipment Id</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {swaps.map((record) => {
                            return(
                                <tr key={record.id}>
                                    <th scope="row">{record.id}</th>
                                    <td>{record.date}</td>
                                    <td>{record.equipment_id}</td>
                                    <td>{record.description}</td>
                                    <td><Edit onClick={()=>editSwaps(record.id)}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
}

const SwapsList = (props) => {
    return(
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle 
                        breadCrumbItems = {[{label:'swaps', path: '/swaps'}]}
                        title = {'Swaps List'}
                    />
                </Col>
            </Row>
            <Row>
                <Col xl={12}>
                  <SwapsTable/>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default SwapsList;