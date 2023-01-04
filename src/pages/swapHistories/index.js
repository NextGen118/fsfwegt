import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Card, CardBody, Table, Button } from "reactstrap";
import axios from "axios";
import { Edit } from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import AddSwaphistories from "./addSwaphistories";
import EditSwaphistories from "./editSwaphistories";
import { Grid, TextField } from '@mui/material';
import Badge from '@mui/material/Badge';

const SwaphistoriesTable = ({ isRefresh }) => {

    const history = useHistory()

    const [swaphistories, setSwaphistories] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [postCount, setPostCount] = useState(1)

    const [values, setValues] = React.useState('');

    const handleSearchChange = (event) => {
        setValues(event.target.value);
    };

    useEffect(() => {
        getSwaphistories()
    }, [isRefresh])

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage
    const indexOfFirstdata = indexOfLastdata - postPerPage
    const currentData = swaphistories.slice(indexOfFirstdata, indexOfLastdata)

    //pagination part onchange
    const handlePaginationChange = (
        event,
        value
    ) => {
        setCurrentPage(value);
    };

    const getSwaphistories = () => {
        if (values !== '') {
            axios
                .get(`${process.env.REACT_APP_BASE_URL}/swaphistories/search/query?query=${values}`)
                .then((res) => {
                    setSwaphistories(res.data);
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
                .get(`${process.env.REACT_APP_BASE_URL}/swaphistories/show/all`)
                .then((res) => {
                    setSwaphistories(res.data.data);
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
    const editSwaphistories = (event, id) => {
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
                <CardBody style={{ width: '100%', overflow: 'auto', display: 'flex' }}>
                    <Table className="mb-o">
                        <thead>
                            <tr>
                                <th>Swap</th>
                                <th>Client</th>
                                <th>Equipment</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <td>{record.swap_id}</td>
                                        <td>{record.client_name}</td>
                                        <td>{record.equipment_id}</td>
                                        <th>
                                            {record.status == 1 ? (
                                                <>
                                                    <Badge badgeContent={'Active'} color="success" sx={{ ml: 3 }}></Badge>
                                                </>
                                            ) : (
                                                <Badge color="error" badgeContent={'Inactive'} sx={{ ml: 3 }}></Badge>
                                            )}
                                        </th>
                                        <td><Edit color="blue" onClick={(e) => editSwaphistories(e, record.id)} /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <Pagination style={{ float: 'right' }} count={postCount} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
            <EditSwaphistories ref={updateRef} id={id} refresh={getSwaphistories} />
        </>
    );
}

const SwaphistoriesList = (props) => {
    const [refresh, setRefresh] = useState(false);

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
                        <h3 className="mb-1 mt-0">Swap Histories</h3>
                    </Row>
                    <Row>
                        <PageTitle breadCrumbItems={[{ label: 'Swap Histories', path: '/swaphistories' }]} />
                    </Row>
                </Col>
                <Col>
                    <Button color="info" className="float-right" onClick={(e) => handleAddUserForm(e)}>
                        + Create SwapHistory
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col xl={12}>
                    <SwaphistoriesTable isRefresh={refresh}/>
                </Col>
            </Row>
            <AddSwaphistories ref={childref} refresh={() => setRefresh(true)}/>
        </React.Fragment>
    )
}

export default SwaphistoriesList;