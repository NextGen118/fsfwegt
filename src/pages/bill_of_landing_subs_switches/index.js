import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Table, Button } from "reactstrap";
import axios from "axios";
import { Edit } from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';

const BilloflandingsubsTable = (props) => {

    const history = useHistory()

    const [billoflandingsubs, setBilloflandingsubs] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [postCount, setPostCount] = useState(1)

    useEffect(() => {
        getBilloflandingsubs()
    }, [])

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage
    const indexOfFirstdata = indexOfLastdata - postPerPage
    const currentData = billoflandingsubs.slice(indexOfFirstdata, indexOfLastdata)

    //pagination part onchange
    const handlePaginationChange = (
        event,
        value
    ) => {
        setCurrentPage(value);
    };

    const getBilloflandingsubs = () => {
        axios.get(`http://127.0.0.1:8000/api/billoflandingsubswitches/show/all`)
            .then(res => {
                setBilloflandingsubs(res.data.data)
                setPostCount(() => {
                    if (res.data.data.length < 8) {
                        return 1
                    }

                    return Math.ceil(res.data.data.length / 8)
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const editBilloflandingsubs = (id) => {
        history.push(`edit-billoflandingsubswitches/${id}`)
    }

    return (
        <>
            <Card>
                <CardBody style={{ width: "100%", overflow: "auto", display: "flex" }}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Bill of lading Number</th>
                                <th>Equipment</th>
                                <th>Package Quantity</th>
                                <th>Bill Confirmation ID</th>
                                <th>Client agent</th>
                                <th>Vendor</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <td>{record.bill_of_landing_number}</td>
                                        <td>{record.equipment_number}</td>
                                        <td>{record.package_quantity}</td>
                                        <td>{record.bill_confirmation_id}</td>
                                        <td>{record.client_name}</td>
                                        <td>{record.vendor_name}</td>
                                        <td>{record.date}</td>
                                        <td><Edit onClick={() => editBilloflandingsubs(record.id)} /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <Pagination count={postCount} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
        </>
    );
}

const BilloflandingsubswitchesList = (props) => {

    const history = useHistory()

    const addBilloflandingsubsForm = () => {
        history.push("/add-billoflandingsubswitches");
    }

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Bill of lading sub switches', path: '/billoflandingsubswitches' }]}
                        title={'Bill of lading sub switches List'}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button color="info" className="float-right" onClick={() => addBilloflandingsubsForm()}>Add</Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                    <BilloflandingsubsTable />
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default BilloflandingsubswitchesList;