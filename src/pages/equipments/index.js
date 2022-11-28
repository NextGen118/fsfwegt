import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { Trash, Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';



const EquipmentListTable = () => {
    const history = useHistory()

    const [equipments, setEquipments] = useState([])


    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(8)

    useEffect(() => {
        getEquipments()
    }, [])

    const getEquipments = () => {
        axios.get(`http://127.0.0.1:8000/api/equipments/show/all`)
            .then(res => {
                console.log(res.data)
                setEquipments(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const indexOfLastdata = currentPage * postPerPage
    const indexOfFirstdata = indexOfLastdata - postPerPage
    const currentData = equipments.slice(indexOfFirstdata, indexOfLastdata)

    //pagination part onchange
    const handlePaginationChange = (
        event,
        value
    ) => {
        setCurrentPage(value);
    };

    return (
        <>
            <Card>
                <CardBody>
                    <Table className="mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Equipment Number</th>
                                <th>Grade</th>
                                <th>Status</th>
                                <th>Owner Code</th>
                                <th>Owner Name</th>
                                <th>Type of unit</th>
                                <th>Vendor code</th>
                                <th>Vendor Name</th>
                                <th>Client Code</th>
                                <th>Client Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{record.id}</th>
                                        <td>{record.equipment_number}</td>
                                        <td>{record.grade}</td>
                                        <td>{record.status}</td>
                                        <td>{record.owner_code}</td>
                                        <td>{record.owner_name}</td>
                                        <td>{record.type_of_unit}</td>
                                        <td>{record.vendor_code}</td>
                                        <td>{record.vendor_name}</td>
                                        <td>{record.client_code}</td>
                                        <td>{record.client_name}</td>
                                        <td><Edit color='blue' /></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </CardBody>

            </Card>
            <Pagination count={postPerPage} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
        </>
    );
};

const EquipmentList = () => {
    let history = useHistory()
    const handleAddUserForm = () => {
        history.push('/add-equipments')
    }

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Equipments', path: '/equipments' }]}
                        title={'Equipment List'}
                    />
                </Col>
            </Row>
            <Col md={12}>
                <Button onClick={(e) => handleAddUserForm(e)}>Add</Button>
            </Col>

            <Row>
                <Col xl={12}>
                    <EquipmentListTable />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default EquipmentList;
