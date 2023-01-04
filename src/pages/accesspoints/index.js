import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Card, CardBody, Table, Button } from "reactstrap";
import axios from "axios";
import { Edit } from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import AddAccesspoints from "./addAccessPoints";
import EditAccesspoints from "./editAccessPoints";
import { Grid, TextField } from '@mui/material';

const AccesspointsTable = ({ isRefresh }) => {

    const history = useHistory()

    const [accesspoints, setAccesspoints] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [postCount, setPostCount] = useState(1)

    const [values, setValues] = React.useState('');

    const handleSearchChange = (event) => {
        setValues(event.target.value);
        console.log('search', values);
    };
    useEffect(() => {
        getAccesspoints()
    }, [])

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage
    const indexOfFirstdata = indexOfLastdata - postPerPage
    const currentData = accesspoints.slice(indexOfFirstdata, indexOfLastdata)

    //pagination part onchange
    const handlePaginationChange = (
        event,
        value
    ) => {
        setCurrentPage(value);
    };

    const getAccesspoints = () => {
            if (values !== '') {
            axios
                .get(`${process.env.REACT_APP_BASE_URL}/accesspoints/search/query?query=${values}`)
                .then((res) => {
                    setAccesspoints(res.data);
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
        } else {
            axios
                .get(`${process.env.REACT_APP_BASE_URL}/accesspoints/show/all`)
                .then((res) => {
                    setAccesspoints(res.data.data);
                    setPostCount(() => {
                        if (res.data.data.length < 8) {
                            return 1;
                        }

                        return Math.ceil(res.data.data.length / 8);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const [id, setId] = useState('');
    const updateRef = useRef();
    const editAccesspoints = (event, id) => {
        setId(id);
        event.preventDefault();
        if (updateRef.current !== undefined) {
            updateRef.current.handleOpen();
        }
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
            </Card>
            <Card>
                <CardBody>
                    <Table className="mb-o">
                        <thead>
                            <tr>
                                <th>Accessmodel Name</th>
                                <th>Display Name</th>
                                <th>Value</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <td>{record.name}</td>
                                        <td>{record.display_name}</td>
                                        <td>{record.value}</td>
                                        <td><Edit color="blue" onClick={(e) => editAccesspoints(e, record.id)} /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <Pagination style={{ float: 'right' }} count={postCount} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
            <EditAccesspoints ref={updateRef} id={id} refresh={getAccesspoints} />
        </>
    );
}

const AccesspointsList = (props) => {
    const [refresh, setRefresh] = useState(false)

    const childref = useRef();
    const handleAddUserForm = (event) => {
        event.preventDefault();
        console.log('check');
        if (childref.current !== undefined) {
            childref.current.handleOpen();
        }
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <Row>
                        <h3 className="mb-1 mt-0">Accesspoints</h3>
                    </Row>
                    <Row>
                        <PageTitle breadCrumbItems={[{ label: 'Accesspoints', path: '/accesspoints' }]} />
                    </Row>
                </Col>
                <Col>
                    <Button color="info" className="float-right" onClick={(e) => handleAddUserForm(e)}>
                        + Create Accesspoint
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col xl={12}>
                    <AccesspointsTable isRefresh={refresh} />
                </Col>
            </Row>
            <AddAccesspoints ref={childref} refresh={() => setRefresh(true)} />
        </React.Fragment>
    )
}

export default AccesspointsList;