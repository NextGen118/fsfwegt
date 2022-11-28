import React,{useEffect,useState,useRef} from "react";
import { Row,Col,Card,CardBody,Table,Button } from "reactstrap";
import axios from "axios";
import {Edit} from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import AddCountries from "./addCountries";
import EditCountries from "./editCountries";

const CountriesTable = (props)=>{

    const history = useHistory()

    const [countries, setCountries] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(8)

    useEffect(()=>{
        getCountries()
    },[])

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
        axios.get(`http://127.0.0.1:8000/api/countries/show/all`)
            .then(res=>{
                setCountries(res.data.data)
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    const [id, setId] = useState('');
    const updateRef = useRef();
    const editCountries = (event,id) =>{
        setId(id);
        event.preventDefault();
        if (updateRef.current !== undefined) {
            updateRef.current.handleOpen();
        }
    }

    return (
        <>
        <Card>
            <CardBody>
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
                            return(
                                <tr key={record.id}>
                                    <td>{record.country_name}</td>
                                    <td>{record.capital_city_name}</td>
                                    <td><Edit onClick={(e)=>editCountries(e,record.id)}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
        <Pagination count={postPerPage} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
        <EditCountries ref={updateRef} id={id} refresh={getCountries}/>
        </>
    );
}

const CountriesList = (props) => {

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
                        breadCrumbItems = {[{label:'countries', path: '/countries'}]}
                        title = {'Countries List'}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Button color="info" onClick={(e)=>handleAddUserForm(e)}>Add</Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                  <CountriesTable/>
                </Col>
            </Row>
            <AddCountries ref={childref}/>
        </React.Fragment>
    )
}

export default CountriesList;