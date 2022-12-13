import React,{useEffect,useState,useRef} from "react";
import { Row,Col,Card,CardBody,Table,Button } from "reactstrap";
import axios from "axios";
import {Edit} from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import AddEquipmentSaleDetails from "./addEquipmentSaleDetails";
import EditEquipmentSaleDetails from "./editEquipmentSaleDetails";

const EquipmentSaleDetailsTable = (props)=>{

    const history = useHistory()

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)

    const [equipmentSaleDetails, setEquipmentSaleDetails] = useState([])

    useEffect(()=>{
        getEquipmentSaleDetails()
    },[])

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage
    const indexOfFirstdata = indexOfLastdata - postPerPage
    const currentData = equipmentSaleDetails.slice(indexOfFirstdata, indexOfLastdata)

    //pagination part onchange
    const handlePaginationChange = (
        event,
        value
    ) => {
        setCurrentPage(value);
    };

    const getEquipmentSaleDetails = () => {
        axios.get(`http://127.0.0.1:8000/api/equipmentsaledetails/show/all`)
            .then(res=>{
                setEquipmentSaleDetails(res.data.data)
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    const [id, setId] = useState('');
    const updateRef = useRef();
    const editEquipmentSaleDetails = (event,id) =>{
        setId(id);
        event.preventDefault();
        if (updateRef.current !== undefined) {
            updateRef.current.handleOpen();
        }
    }

    return (
        <>
        <Card>
            <CardBody>
                <Table className="mb-o">
                    <thead>
                        <tr>
                            <th>Equipment Id</th>
                            <th>Equipment Sale Id</th>
                            <th>Amount</th>
                            <th>Destination</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((record) => {
                            return(
                                <tr key={record.id}>
                                    <td>{record.equipment_id}</td>
                                    <td>{record.equipment_sale_id}</td>
                                    <td>{record.amount}</td>
                                    <td>{record.destination}</td>
                                    <td><Edit onClick={(e)=>editEquipmentSaleDetails(e,record.id)}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
        <Pagination count={postPerPage} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
        <EditEquipmentSaleDetails ref={updateRef} id={id} refresh={getEquipmentSaleDetails}/>
        </>
    );
}

const EquipmentSaleDetailsList = (props) => {
    const childref = useRef();
    const handleAddUserForm = (event) => {
        event.preventDefault();
        console.log('check');
        if (childref.current !== undefined) {
            childref.current.handleOpen();
        }
    };

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
                <Col md={12}>
                    <Button color="info" className="float-right" onClick={(e)=>handleAddUserForm(e)}>Add</Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                  <EquipmentSaleDetailsTable/>
                </Col>
            </Row>
            <AddEquipmentSaleDetails ref={childref}/>
        </React.Fragment>
    )
}

export default EquipmentSaleDetailsList;