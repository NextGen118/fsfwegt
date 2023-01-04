import React, { useEffect, useState, useRef } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Trash, Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import Addport from './AddPort';
import EditPort from './EditPort';
import Pagination from '@mui/material/Pagination';
import { Grid, TextField } from '@mui/material';

const Porttable = ({ isRefresh }) => {
    const history = useHistory()

    const [port, setPort] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [postCount, setPostCount] = useState(1)

    const [values, setValues] = React.useState('');

    const handleSearchChange = (event) => {
        setValues(event.target.value);
        console.log('search', values);
    };

    useEffect(() => {
        getPorts()
    }, [isRefresh])

    const getPorts = () => {
        if (values !== '') {
            axios
                .get(`${process.env.REACT_APP_BASE_URL}/ports/search/query?query=${values}`)
                .then((res) => {
                    setPort(res.data);
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
                .get(`${process.env.REACT_APP_BASE_URL}/ports/show/all`)
                .then((res) => {
                    console.log(res.data.data);
                    setPort(res.data.data);
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

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage
    const indexOfFirstdata = indexOfLastdata - postPerPage
    const currentData = port.slice(indexOfFirstdata, indexOfLastdata)

    //pagination part onchange
    const handlePaginationChange = (
        event,
        value
    ) => {
        setCurrentPage(value);
    };


    const goEdit = (id) => {
        history.push(`edit-ports/${id}`)
    }

    const [id, seiId] = useState('')
    const updateRef = useRef();
    const handleUpdateForm = (event, id) => {
        seiId(id)
        event.preventDefault();
        console.log('check');
        if (updateRef.current !== undefined) {
            updateRef.current.handleOpen();
        }
    };

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
                    <Table className="mb-0">
                        <thead>
                            <tr>
                                <th>Port code</th>
                                <th>port name</th>
                                <th>Sub code</th>
                                <th>Country name</th>
                                <th>Capital city name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <td>{record.port_code}</td>
                                        <td>{record.port_name}</td>
                                        <td>{record.sub_code}</td>
                                        <td>{record.country_name}</td>
                                        <td>{record.capital_city_name}</td>
                                        <td>
                                            <Edit
                                                color="blue"
                                                size={20}
                                                onClick={(e) => handleUpdateForm(e, record.id)}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <Pagination style={{ float: 'right' }} count={postCount} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
            <EditPort ref={updateRef} id={id} refresh={getPorts} />
        </>
    );
}

const Portlist = (props) => {

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
                        <h3 className="mb-1 mt-0">Ports</h3>
                    </Row>
                    <Row>
                        <PageTitle breadCrumbItems={[{ label: 'Ports', path: '/ports' }]} />
                    </Row>
                </Col>
                <Col>
                    <Button color="info" className="float-right" onClick={(e) => handleAddUserForm(e)}>
                        + Create Port
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col xl={12}>
                    <Porttable isRefresh={refresh} />
                </Col>
            </Row>

            <Addport ref={childref} refresh={() => setRefresh(true)} />
        </React.Fragment>
    );
}
export default Portlist;