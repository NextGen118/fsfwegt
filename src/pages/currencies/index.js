import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Card, CardBody, Table, Button } from "reactstrap";
import axios from "axios";
import { Edit } from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';
import AddCurrencies from "./addCurrencies";
import EditCurrencies from "./editCurrencies";
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { Grid, TextField } from '@mui/material';

const CurrenciesTable = ({ isRefresh }) => {

    const history = useHistory()

    const [currencies, setCurrencies] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [postCount, setPostCount] = useState(1)

    const [values, setValues] = React.useState('');

    const handleSearchChange = (event) => {
        setValues(event.target.value);
        console.log('search', values);
    };

    useEffect(() => {
        getCurrencies()
    }, [isRefresh])

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage
    const indexOfFirstdata = indexOfLastdata - postPerPage
    const currentData = currencies.slice(indexOfFirstdata, indexOfLastdata)

    //pagination part onchange
    const handlePaginationChange = (
        event,
        value
    ) => {
        setCurrentPage(value);
    };

    const getCurrencies = () => {
        if (values !== '') {
            axios
                .get(`${process.env.REACT_APP_BASE_URL}/currencies/search/query?query=${values}`)
                .then((res) => {
                    setCurrencies(res.data);
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
                .get(`${process.env.REACT_APP_BASE_URL}/currencies/show/all`)
                .then((res) => {
                    setCurrencies(res.data.data);
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
    const editCurrencies = (event, id) => {
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
                                <th>Country Name</th>
                                <th>Currency Code</th>
                                <th>Currency Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <th scope="row">{record.country_name}</th>
                                        <td>{record.currency_code}</td>
                                        <td>{record.currency_name}</td>
                                        <td><Edit color="blue" onClick={(e) => editCurrencies(e, record.id)} /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <Pagination style={{ float: 'right' }} count={postCount} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
            <EditCurrencies ref={updateRef} id={id} refresh={getCurrencies} />
        </>
    );
}

const CurrenciesList = (props) => {
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
                        <h3 className="mb-1 mt-0">Currencies</h3>
                    </Row>
                    <Row>
                        <PageTitle breadCrumbItems={[{ label: 'Currencies', path: '/currencies' }]} />
                    </Row>
                </Col>
                <Col>
                    <Button color="info" className="float-right" onClick={(e) => handleAddUserForm(e)}>
                        + Create Currency
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col xl={12}>
                    <CurrenciesTable isRefresh={refresh} />
                </Col>
            </Row>
            <AddCurrencies ref={childref} refresh={() => setRefresh(true)} />
        </React.Fragment>
    )
}

export default CurrenciesList;