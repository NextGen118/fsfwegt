import React,{useEffect,useState} from "react";
import { Row,Col,Card,CardBody,Table,Button } from "reactstrap";
import axios from "axios";
import {Edit} from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';

const ClientsTable = (props)=>{

    const history = useHistory()

    const [clients, setClients] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(8)

    useEffect(()=>{
        getClients()
    },[])

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage
    const indexOfFirstdata = indexOfLastdata - postPerPage
    const currentData = clients.slice(indexOfFirstdata, indexOfLastdata)

    //pagination part onchange
    const handlePaginationChange = (
        event,
        value
    ) => {
        setCurrentPage(value);
    };

    const getClients = () => {
        axios.get(`http://127.0.0.1:8000/api/clients/show/all`)
            .then(res=>{
                setClients(res.data.data)
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    const editClients = (id) =>{
        console.log(id);
        history.push(`edit-clients/${id}`)
    }

    return (
        <>
        <Card>
            <CardBody style={{ width: "100%", overflow: "auto", display: "flex" }}>
                <Table>
                    <thead>
                        <tr>
                            {/* <th>#</th> */}
                            <th>Client Name</th>
                            <th>Contact Name</th>
                            <th>Client Code</th>
                            <th>Sub Code</th>
                            <th>Email</th>
                            <th>Telephone Number</th>
                            <th>Phone Number</th>
                            <th>Fax</th>
                            <th>Address</th>
                            <th>Country</th>
                            <th>Port</th>
                            <th>Remarks</th>
                            <th>Active</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((record) => {
                            return(
                                <tr key={record.id}>
                                    {/* <th scope="row">{record.id}</th> */}
                                    <td>{record.client_name}</td>
                                    <td>{record.contact_name}</td>
                                    <td>{record.client_code}</td>
                                    <td>{record.sub_code}</td>
                                    <td>{record.email}</td>
                                    <td>{record.telephone_number}</td>
                                    <td>{record.mobile_number}</td>
                                    <td>{record.fax}</td>                          
                                    <td>{record.address}</td>
                                    <td>{record.country_name}</td>
                                    <td>{record.port_name}</td>
                                    <td>{record.remarks}</td>
                                    <td>{record.is_active}</td>
                                    <td><Edit onClick={()=>editClients(record.id)}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
        <Pagination count={postPerPage} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
        </>
    );
}

const ClientsList = (props) => {

    const history = useHistory()
    
    const addClientForm = () =>{
        history.push("/add-clients");
    }

    return(
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <PageTitle 
                        breadCrumbItems = {[{label:'clients', path: '/clients'}]}
                        title = {'Clients List'}
                    />
                </Col>
            </Row>
            <Row>
            <Col>
                <Button color="info" onClick={()=>addClientForm()}>Add</Button>
            </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                  <ClientsTable/>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default ClientsList;