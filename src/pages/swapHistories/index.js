import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Card, CardBody, Table, Button } from "reactstrap";
import axios from "axios";
import { Edit } from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import AddSwaphistories from "./addSwaphistories";
import EditSwaphistories from "./editSwaphistories";

const SwaphistoriesTable = (props) => {

    const history = useHistory()

    const [swaphistories, setSwaphistories] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [postCount, setPostCount] = useState(1)

    useEffect(() => {
        getSwaphistories()
    }, [])

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
        axios.get(`http://127.0.0.1:8000/api/swaphistories/show/all`)
            .then(res => {
                setSwaphistories(res.data.data)
                setPostCount(() => {
                    if (res.data.data.length < 8) {
                        return 1
                    }

                    return Math.ceil(res.data.data.length / 8)
                })
            })
            .catch((error) => {
                console.log(error);
            })
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
                <CardBody>
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
                                        <td>{record.status}</td>
                                        <td><Edit onClick={(e) => editSwaphistories(e, record.id)} /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <Pagination count={postCount} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
            <EditSwaphistories ref={updateRef} id={id} refresh={getSwaphistories} />
        </>
    );
}

const SwaphistoriesList = (props) => {

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
                        breadCrumbItems={[{ label: 'swaphistories', path: '/swaphistories' }]}
                        title={'SwapHistories List'}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Button color="info" className="float-right" onClick={(e) => handleAddUserForm(e)}>Add</Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                    <SwaphistoriesTable />
                </Col>
            </Row>
            <AddSwaphistories ref={childref} />
        </React.Fragment>
    )
}

export default SwaphistoriesList;