import React,{useEffect,useState,useRef} from "react";
import { Row,Col,Card,CardBody,Table,Button  } from "reactstrap";
import axios from "axios";
import {Edit} from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';
import AddCurrencies from "./addCurrencies";
import EditCurrencies from "./editCurrencies";
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';

const CurrenciesTable = (props)=>{

    const history = useHistory()

    const [filter, setFilter] = useState([])
    const [country, setCountry] = useState([])

    const [currencies, setCurrencies] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [postCount, setPostCount] = useState(1)

    const getCountry = () => {
        axios.get(`http://127.0.0.1:8000/api/countries/show/all`)
            .then(res => {
                setCountry(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(()=>{
        getCurrencies()
        getCountry()
    },[])

    const filterSelect = (country) => {
        setFilter(currencies.filter((res) => res.country_id === country))
    }

    const [countryselect, setCountryselect] = useState('')
    const changeCountry = (event) => {
        setCountryselect(event.target.value);
        filterSelect(event.target.value, null)
    };

    //getCurrent data  //pagination part
    let currentData = []
    const indexOfLastdata = currentPage * postPerPage
    const indexOfFirstdata = indexOfLastdata - postPerPage

    if (filter.length !== 0) {
        currentData = filter.slice(indexOfFirstdata, indexOfLastdata)
    } else {
        currentData = currencies.slice(indexOfFirstdata, indexOfLastdata)
    }

    //pagination part onchange
    const handlePaginationChange = (
        event,
        value
    ) => {
        setCurrentPage(value);
    };

    const getCurrencies = () => {
        axios.get(`http://127.0.0.1:8000/api/currencies/show/all`)
            .then(res=>{
                setCurrencies(res.data.data)
                setPostCount(() => {
                    if (res.data.data.length < 10) {
                        return 1
                    }

                    return Math.ceil(res.data.data.length / 10)
                })
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    const [id, setId] = useState('');
    const updateRef = useRef();
    const editCurrencies = (event,id) =>{
        setId(id);
        event.preventDefault();
        if (updateRef.current !== undefined) {
            updateRef.current.handleOpen();
        }
    }

    return (
        <>
        <Grid container mb={3}>
            <Grid md={2}>Country <br />
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
        </Grid>
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
                            return(
                                <tr key={record.id}>
                                    <th scope="row">{record.country_name}</th>
                                    <td>{record.currency_code}</td>
                                    <td>{record.currency_name}</td>
                                    <td><Edit onClick={(e)=>editCurrencies(e,record.id)}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
        <Pagination count={postCount} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
        <EditCurrencies ref={updateRef} id={id} refresh={getCurrencies}/>
        </>
    );
}

const CurrenciesList = (props) => {

    const childref = useRef();
    const handleAddUserForm = (event) => {
        event.preventDefault();
        console.log('check');
        if (childref.current !== undefined) {
            childref.current.handleOpen();
        }
    };

    return(
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle 
                        breadCrumbItems = {[{label:'currencies', path: '/currencies'}]}
                        title = {'Currencies List'}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Button color="info" className="float-right" onClick={(e)=>handleAddUserForm(e)}>Add</Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                  <CurrenciesTable/>
                </Col>
            </Row>
            <AddCurrencies ref={childref}/>
        </React.Fragment>
    )
}

export default CurrenciesList;