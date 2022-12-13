import React,{useEffect,useState,useRef} from "react";
import { Row,Col,Card,CardBody,Table,Button } from "reactstrap";
import axios from "axios";
import {Edit} from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';
import AddRoles from "./addRoles";
import EditRoles from "./editRoles";
import Pagination from '@mui/material/Pagination';

const RolesTable = (props)=>{

    const history = useHistory()

    const [roles, setRoles] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)

    useEffect(()=>{
        getRoles()
    },[])

     //getCurrent data  //pagination part
     const indexOfLastdata = currentPage * postPerPage
     const indexOfFirstdata = indexOfLastdata - postPerPage
     const currentData = roles.slice(indexOfFirstdata, indexOfLastdata)
 
     //pagination part onchange
     const handlePaginationChange = (
         event,
         value
     ) => {
         setCurrentPage(value);
     };

    const getRoles = () => {
        axios.get(`http://127.0.0.1:8000/api/roles/show/all`)
            .then(res=>{
                console.log(res.data.data)
                setRoles(res.data.data)
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    const [id, setId] = useState('');
    const updateRef = useRef();
    const editRoles = (event,id) =>{
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
                            <th>Roles Name</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((record) => {
                            return(
                                <tr key={record.id}>
                                    <td>{record.role_name}</td>
                                    <td>{record.description}</td>
                                    <td><Edit style={{ cursor:'pointer'}} onClick={(e)=>editRoles(e,record.id)}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
        <Pagination count={postPerPage} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
        <EditRoles ref={updateRef} id={id} refresh={getRoles}/>
        </>
    );
}

const RolesList = (props) => {

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
                        breadCrumbItems = {[{label:'roles', path: '/roles'}]}
                        title = {'Roles List'}
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
                  <RolesTable/>
                </Col>
            </Row>
            <AddRoles ref={childref}/>
        </React.Fragment>
    )
}

export default RolesList;