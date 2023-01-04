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
    const [postPerPage, setPostPerPage] = useState(10)
    const [postCount, setPostCount] = useState(1)


    useEffect(() => {
        getEquipments()
    }, [])

    const getEquipments = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/equipments/show/all`)
            .then(res => {
                console.log(res.data)
                setEquipments(res.data.data);
                setPostCount(() => {
                    if (res.data.data.length < 8) {
                        return 1
                    }

                    return Math.ceil(res.data.data.length / 8)
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const indexOfLastdata = currentPage * postPerPage
    const indexOfFirstdata = indexOfLastdata - postPerPage
    const currentData = equipments.slice(indexOfFirstdata, indexOfLastdata)
    //console.log(equipments.length, 'lengh')



    //pagination part onchange
    const handlePaginationChange = (
        event,
        value
    ) => {
        setCurrentPage(value);
    };
    const handleUpdateForm = (id) => {
        history.push(`/edit-equipments/${id}`)
    }

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
                                        <td><Edit style={{ cursor: 'pointer' }} onClick={(e) => handleUpdateForm(record.id)} /></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </CardBody>

            </Card>
            <Pagination count={postCount} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
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
            <Row>
                <Col md={12}>
                    <Button color='info' onClick={(e) => handleAddUserForm(e)} style={{ float: 'right', marginBottom: 10 }}>Add</Button>
                </Col>
            </Row>

            <Row>
                <Col xl={12}>
                    <EquipmentListTable />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default EquipmentList;
