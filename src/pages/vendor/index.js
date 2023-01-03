import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Table, Button } from "reactstrap";
import axios from "axios";
import { Edit } from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';

const VendorsTable = (props) => {

    const history = useHistory()

    const [vendors, setVendors] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)

    useEffect(() => {
        getVendors()
    }, [])

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage
    const indexOfFirstdata = indexOfLastdata - postPerPage
    const currentData = vendors.slice(indexOfFirstdata, indexOfLastdata)

    //pagination part onchange
    const handlePaginationChange = (
        event,
        value
    ) => {
        setCurrentPage(value);
    };

    const getVendors = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/vendors/show/all`)
            .then(res => {
                setVendors(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const editVendors = (id) => {
        history.push(`edit-vendors/${id}`)
    }

    return (
        <>
            <Card>
                <CardBody style={{ width: "100%", overflow: "auto", display: "flex" }}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Vendor code</th>
                                <th>Vendor Name</th>
                                <th>Contact Name</th>
                                <th>Country</th>
                                <th>Port</th>
                                <th>Telephone Number</th>
                                <th>Phone Number</th>
                                <th>Fax</th>
                                <th>Address</th>
                                <th>Remarks</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <td>{record.vendor_code}</td>
                                        <td>{record.vendor_name}</td>
                                        <td>{record.contact_name}</td>
                                        <td>{record.country_name}</td>
                                        <td>{record.port_name}</td>
                                        <td>{record.telephone_number}</td>
                                        <td>{record.mobile_number}</td>
                                        <td>{record.fax}</td>
                                        <td>{record.address}</td>
                                        <td>{record.remarks}</td>
                                        <td>{record.is_active}</td>
                                        <td><Edit onClick={() => editVendors(record.id)} /></td>
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

const VendorsList = (props) => {

    const history = useHistory()

    const addVendorsForm = () => {
        history.push("/add-vendors");
    }

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Vendors', path: '/vendors' }]}
                        title={'Vendors List'}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button color="info" className="float-right" onClick={() => addVendorsForm()}>Add</Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                    <VendorsTable />
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default VendorsList;