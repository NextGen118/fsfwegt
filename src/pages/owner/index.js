import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { Trash, Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Alert from '@mui/material/Alert';
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';

const OwnerListTable = () => {
    const history = useHistory();

    const [owner, setOwner] = useState([]);
    const [filter, setFilter] = useState([]);

    const [port, setPort] = useState([]);
    const [country, setCountry] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(8);
    const [postCount, setPostCount] = useState(1);

    const [values, setValues] = React.useState('');

    const handleSearchChange = (event) => {
        setValues(event.target.value);
        console.log('search', values);
    };

    const [activate, setActivate] = useState([
        { Key: 1, Value: 'Activate' },
        { Key: 2, Value: 'De Active' },
    ]);
    const editOwner = (id) => {
        history.push(`/owner-edit/${id}`);
    };

    const getPort = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/ports/show/all`)
            .then((res) => {
                setPort(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getCountry = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/countries/show/all`)
            .then((res) => {
                setCountry(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const [countryselect, setCountryselect] = useState('');
    const changeCountry = (event) => {
        setCountryselect(event.target.value);
        //filterSelect(event.target.value, null)
    };

    const [portselect, setPortselect] = useState('');
    const changePort = (event) => {
        setPortselect(event.target.value);
        console.log(event.target.value, 'country select');
        //filterSelect(null, event.target.value)
    };

    //const [activeselect, setActiveselect] = useState('')

    // const changeActive = (event) => {
    //     setActiveselect(event.target.value);
    //     console.log(event.target.value, " select")
    // };

    // const filterSelect = (country, port) => {
    //     setFilter(owner.filter((res) => res.country_id === country || res.port_id === port))
    // }

    const getOwner = () => {
        console.log(filter, 'data filter');
        console.log(process.env, 'env');
        if (values !== '') {
            axios
                .get(`${process.env.REACT_APP_BASE_URL}/owners/search/query?query=${values}`)
                .then((res) => {
                    console.log(res.data);
                    setOwner(res.data);
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
                .get(`${process.env.REACT_APP_BASE_URL}/owners/show/all`)
                .then((res) => {
                    console.log(res.data.data);
                    setOwner(res.data.data);
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
    };

    const indexOfLastdata = currentPage * postPerPage;
    const indexOfFirstdata = indexOfLastdata - postPerPage;
    const currentData = owner.slice(indexOfFirstdata, indexOfLastdata);

    // if (filter.length !== 0) {
    //     currentData = filter.slice(indexOfFirstdata, indexOfLastdata)
    // } else {
    //     currentData = owner.slice(indexOfFirstdata, indexOfLastdata)
    // }

    //pagination part onchange
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        getCountry();
        getPort();
        getOwner();
    }, [values]);

    return (
        <>
            <Grid container mb={12} sx={{ backgroundColor: 'white', height: '100px', padding: '10px' }}>
                {/* <Grid md={2}>
                    Country <br />
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={countryselect}
                        onChange={changeCountry}
                        sx={{ width: 150, height: 45 }}
                        input={<OutlinedInput label="Country" sx={{ color: 'black' }} />}


                    >

                        {country.map((con) => (

                            <MenuItem value={con.id} key={con.id}>{con.country_name}</MenuItem>

                        ))}

                    </Select>

                </Grid>
                <Grid md={2}>
                    Port <br />
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={portselect}
                        onChange={changePort}
                        sx={{ width: 150, height: 45 }}

                    >
                        {port.map((con) => (
                            <MenuItem value={con.id} key={con.id}>{con.port_name}</MenuItem>

                        ))}

                    </Select>
                </Grid> */}

                <Grid md={12} sx={{ textAlign: 'right' }}>
                    <TextField
                        id="standard-basic"
                        label="Search"
                        variant="standard"
                        value={values}
                        onChange={handleSearchChange}
                    />
                </Grid>
            </Grid>

            <Card>
                <CardBody>
                    <Table className="mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Owner Code</th>
                                <th>Owner Name</th>
                                <th>Sub Code</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Address</th>
                                <th>Country Name</th>
                                <th>Port Name</th>
                                <th>Is Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{record.id}</th>
                                        <td>{record.owner_code}</td>
                                        <td>{record.owner_name}</td>
                                        <td>{record.sub_code}</td>
                                        <td>{record.email}</td>
                                        <td>{record.mobile_number}</td>
                                        <td>{record.address}</td>
                                        <td>{record.country_name}</td>
                                        <td>{record.port_name}</td>
                                        <th>
                                            {record.is_active == 1 ? (
                                                <>
                                                    <Badge
                                                        badgeContent={'Active'}
                                                        color="success"
                                                        sx={{ ml: 3 }}></Badge>
                                                </>
                                            ) : (
                                                <Badge color="error" badgeContent={'Deactive'} sx={{ ml: 3 }}></Badge>
                                            )}
                                        </th>
                                        <td>
                                            <Edit color="blue" size={20} onClick={(e) => editOwner(record.id)} />
                                        </td>{' '}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <Pagination
                count={postCount}
                page={currentPage}
                onChange={handlePaginationChange}
                variant="outlined"
                style={{ float: 'right' }}
            />
        </>
    );
};

const OwnerList = () => {
    let history = useHistory();
    const handleAddUserForm = () => {
        history.push('/owner-add');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle breadCrumbItems={[{ label: 'Owner', path: '/owner' }]} title={'owner List'} />
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Button
                        color="info"
                        onClick={(e) => handleAddUserForm(e)}
                        style={{ float: 'right', marginBottom: 10 }}>
                        Add
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col xl={12}>
                    <OwnerListTable />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default OwnerList;
