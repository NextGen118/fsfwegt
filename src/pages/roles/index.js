import React,{useEffect,useState} from "react";
import { Row,Col,Card,CardBody,Table } from "reactstrap";
import axios from "axios";
import {Edit} from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';

const RolesTable = (props)=>{

    const history = useHistory()

    const [roles, setRoles] = useState([])

    useEffect(()=>{
        getRoles()
    },[])

    const getRoles = () => {
        axios.get(`http://127.0.0.1:8000/api/roles/show/all`)
            .then(res=>{
                console.log(res.data)
                setRoles(res.data)
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    const editRoles = (id) =>{
        history.push(`edit-roles/${id}`)
    }

    return (
        <Card>
            <CardBody>
                <Table className="mb-o">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Roles Name</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((record) => {
                            return(
                                <tr key={record.id}>
                                    <th scope="row">{record.id}</th>
                                    <td>{record.role_name}</td>
                                    <td>{record.description}</td>
                                    <td><Edit onClick={()=>editRoles(record.id)}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
}

const RolesList = (props) => {
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
                <Col xl={12}>
                  <RolesTable/>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default RolesList;