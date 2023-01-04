import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Card, CardBody, Table, Button } from "reactstrap";
import axios from "axios";
import { Edit } from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import AddCountries from "./addCountries";
import EditCountries from "./editCountries";
import { Grid, TextField } from '@mui/material';

const CountriesTable = ({ isRefresh }) => {

    const history = useHistory()

    const [countries, setCountries] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [postCount, setPostCount] = useState(1)

    const [values, setValues] = React.useState('');
    const handleSearchChange = (event) => {
        setValues(event.target.value);
        console.log('search', values);
    };

    useEffect(() => {
        getCountries()
    }, [isRefresh])

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage
    const indexOfFirstdata = indexOfLastdata - postPerPage
    const currentData = countries.slice(indexOfFirstdata, indexOfLastdata)

    //pagination part onchange
    const handlePaginationChange = (
        event,
        value
    ) => {
        setCurrentPage(value);
    };

    const getCountries = () => {
        if (values !== '') {
            axios
                .get(`${process.env.REACT_APP_BASE_URL}/countries/search/query?query=${values}`)
                .then((res) => {
                    setCountries(res.data);
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
                .get(`${process.env.REACT_APP_BASE_URL}/countries/show/all`)
                .then((res) => {
                    console.log(res.data.data);
                    setCountries(res.data.data);
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
    const editCountries = (event, id) => {
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
                                <th>Country Name</th>
                                <th>Capital City Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <td>{record.country_name}</td>
                                        <td>{record.capital_city_name}</td>
                                        <td><Edit color="blue" onClick={(e) => editCountries(e, record.id)} /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <Pagination style={{ float: 'right' }} count={postCount} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
            <EditCountries ref={updateRef} id={id} refresh={getCountries} />
        </>
    );
}

const CountriesList = (props) => {
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
                        <h3 className="mb-1 mt-0">Countries</h3>
                    </Row>
                    <Row>
                        <PageTitle breadCrumbItems={[{ label: 'countries', path: '/countries' }]} />
                    </Row>
                </Col>
                <Col>
                    <Button color="info" className="float-right" onClick={(e) => handleAddUserForm(e)}>
                        + Create Country
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col xl={12}>
                    <CountriesTable isRefresh={refresh}/>
                </Col>
            </Row>
            <AddCountries ref={childref} refresh={() => setRefresh(true)}/>
        </React.Fragment>
    )
}

export default CountriesList;