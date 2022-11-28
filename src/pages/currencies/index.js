import React,{useEffect,useState,useRef} from "react";
import { Row,Col,Card,CardBody,Table,Button  } from "reactstrap";
import axios from "axios";
import {Edit} from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';
import AddCurrencies from "./addCurrencies";
import EditCurrencies from "./editCurrencies";
import Pagination from '@mui/material/Pagination';

const CurrenciesTable = (props)=>{

    const history = useHistory()

    const [currencies, setCurrencies] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)

    useEffect(()=>{
        getCurrencies()
    },[])

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
        axios.get(`http://127.0.0.1:8000/api/currencies/show/all`)
            .then(res=>{
                setCurrencies(res.data.data)
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
        <Pagination count={postPerPage} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
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
                    <Button color="info" onClick={(e)=>handleAddUserForm(e)}>Add</Button>
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