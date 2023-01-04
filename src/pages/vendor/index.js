import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Table, Button } from "reactstrap";
import axios from "axios";
import { Edit } from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import { Grid, TextField } from '@mui/material';
import Badge from '@mui/material/Badge';

const VendorsTable = (props) => {

    const history = useHistory()

    const [vendors, setVendors] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [postCount, setPostCount] = useState(1)

    const [values, setValues] = React.useState('');

    const handleSearchChange = (event) => {
        setValues(event.target.value);
    };

    useEffect(() => {
        getVendors()
    }, [values])

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
        if(values !== ''){
            axios.get(`${process.env.REACT_APP_BASE_URL}/vendors/search/query?query=${values}`)
            .then((res) => {
                setVendors(res.data);
                setPostCount(() => {
                    if (res.data.length < 8) {
                        return 1;
                    }

                    return Math.ceil(res.data.length / 8);
                });
            })
            .catch((error) => {
                console.log(error);
            });
        }else{
            axios.get(`${process.env.REACT_APP_BASE_URL}/vendors/show/all`)
            .then(res => {
                setVendors(res.data.data)
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
    }

    const editVendors = (id) => {
        history.push(`edit-vendors/${id}`)
    }

    return (
        <>
            <Card>
                <CardBody style={{ width: '100%', overflow: 'auto', display: 'grid' }}>
                    <Grid md={6} sx={{ textAlign: 'right' }}>
                        <TextField
                            id="standard-basic"
                            label="Search"
                            variant="outlined"
                            value={values}
                            onChange={handleSearchChange}
                            sx={{ width: '30%' }}
                        />
                    </Grid>
                </CardBody>
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
                                        <th>
                                            {record.is_active == 1 ? (
                                                <>
                                                    <Badge badgeContent={'Active'} color="success" sx={{ ml: 3 }}></Badge>
                                                </>
                                            ) : (
                                                <Badge color="error" badgeContent={'Inactive'} sx={{ ml: 3 }}></Badge>
                                            )}
                                        </th>
                                        <td><Edit color="blue" size={20} onClick={() => editVendors(record.id)} /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <Pagination style={{ float: 'right' }} count={postCount} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
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
                    <Row>
                        <h3 className="mb-1 mt-0">Vendors</h3>
                    </Row>
                    <Row>
                        <PageTitle breadCrumbItems={[{ label: 'vendors', path: '/vendors' }]} />
                    </Row>
                </Col>
                <Col>
                    <Button color="info" className="float-right" onClick={() => addVendorsForm()}>
                        + Create Vendor
                    </Button>
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