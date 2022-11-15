import React,{useEffect,useState} from "react";
import { Row,Col,Card,CardBody,Table } from "reactstrap";
import axios from "axios";
import {Edit} from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';

const EquipmentSaleDetailsTable = (props)=>{

    const history = useHistory()

    const [equipmentSaleDetails, setEquipmentSaleDetails] = useState([])

    useEffect(()=>{
        getEquipmentSaleDetails()
    },[])

    const getEquipmentSaleDetails = () => {
        axios.get(`http://127.0.0.1:8000/api/equipmentsaledetails/show/all`)
            .then(res=>{
                console.log(res.data)
                setEquipmentSaleDetails(res.data)
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    const editEquipmentSaleDetails = (id) =>{
        history.push(`edit-equipmentsaledetails/${id}`)
    }

    return (
        <Card>
            <CardBody>
                <Table className="mb-o">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Equipment Sale Id</th>
                            <th>Equipment Id</th>
                            <th>Amount</th>
                            <th>Destination</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipmentSaleDetails.map((record) => {
                            return(
                                <tr key={record.id}>
                                    <th scope="row">{record.id}</th>
                                    <td>{record.equipment_sale_id}</td>
                                    <td>{record.equipment_id}</td>
                                    <td>{record.amount}</td>
                                    <td>{record.destination}</td>
                                    <td><Edit onClick={()=>editEquipmentSaleDetails(record.id)}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
}

const EquipmentSaleDetailsList = (props) => {
    return(
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle 
                        breadCrumbItems = {[{label:'EquipmentSaleDetails', path: '/requipmentsaledetails'}]}
                        title = {'Equipment Sale Details List'}
                    />
                </Col>
            </Row>
            <Row>
                <Col xl={12}>
                  <EquipmentSaleDetailsTable/>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default EquipmentSaleDetailsList;