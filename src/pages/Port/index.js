import React, { useEffect, useState, useRef } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Trash, Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import Addport from './AddPort';
import EditPort from './EditPort';
import Pagination from '@mui/material/Pagination';


const Porttable = (props) => {
    const history = useHistory()

    const [port, setPort] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(8)



    useEffect(() => {
        getProperties()
    }, [])

    const getProperties = () => {
        axios.get(`http://127.0.0.1:8000/api/ports/show/all`)
            .then(res => {
                console.log(res.data)
                setPort(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
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

    const deleteProperties = (id) => {
        axios.delete(`http://127.0.0.1:8000/properties/show/all?${id}`)
            .then(res => {
                getProperties()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const goEdit = (id) => {
        history.push(`edit-properties/${id}`)
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
                <CardBody>
                    <Table className="mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
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
                                        <th scope="row">{record.id}</th>
                                        <td>{record.port_code}</td>
                                        <td>{record.port_name}</td>
                                        <td>{record.sub_code}</td>
                                        <td>{record.country_name}</td>
                                        <td>{record.capital_city_name}</td>
                                        <td>  {/*<Trash color='red' onClick={() => deleteProperties(record.id)} />*/}<Edit style={{ cursor: 'pointer' }} onClick={(e) => handleUpdateForm(e, record.id)} /></td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <Pagination count={postPerPage} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
            <EditPort ref={updateRef} id={id} refresh={getProperties} />
        </>
    );
}

const Portlist = (props) => {

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

                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Port', path: '/port' }]}
                        title={'Port'}
                    />
                </Col>
            </Row>
            <Col md={12}>
                <Button onClick={(e) => handleAddUserForm(e)}>Add</Button>
            </Col>
            <Row>
                <Col xl={12}>
                    <Porttable />
                </Col>
            </Row>

            <Addport ref={childref} />
        </React.Fragment>
    );
}
export default Portlist;