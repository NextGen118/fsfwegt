import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Table, Button } from "reactstrap";
import axios from "axios";
import { Edit } from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import { Grid, TextField } from '@mui/material';
import Badge from '@mui/material/Badge';

const ClientsTable = (props) => {

    const history = useHistory()

    const [clients, setClients] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [postCount, setPostCount] = useState(1)

    const [values, setValues] = React.useState('');

    const handleSearchChange = (event) => {
        setValues(event.target.value);
    };

    useEffect(() => {
        getClients()
    }, [values])

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
        if(values !== ''){
            axios.get(`${process.env.REACT_APP_BASE_URL}/clients/search/query?query=${values}`)
            .then((res) => {
                setClients(res.data);
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
            axios.get(`${process.env.REACT_APP_BASE_URL}/clients/show/all`)
            .then(res => {
                setClients(res.data.data)
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

    const editClients = (id) => {
        history.push(`edit-clients/${id}`)
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
                                return (
                                    <tr key={record.id}>
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
                                        <th>
                                            {record.is_active == 1 ? (
                                                <>
                                                    <Badge badgeContent={'Active'} color="success" sx={{ ml: 3 }}></Badge>
                                                </>
                                            ) : (
                                                <Badge color="error" badgeContent={'Inactive'} sx={{ ml: 3 }}></Badge>
                                            )}
                                        </th>
                                        <td><Edit color="blue" size={20} onClick={() => editClients(record.id)} /></td>
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

const ClientsList = (props) => {

    const history = useHistory()

    const addClientForm = () => {
        history.push("/add-clients");
    }

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <Row>
                        <h3 className="mb-1 mt-0">Clients</h3>
                    </Row>
                    <Row>
                        <PageTitle breadCrumbItems={[{ label: 'clients', path: '/clients' }]} />
                    </Row>
                </Col>
                <Col>
                    <Button color="info" className="float-right" onClick={() => addClientForm()}>
                        + Create Client
                    </Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                    <ClientsTable />
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default ClientsList;