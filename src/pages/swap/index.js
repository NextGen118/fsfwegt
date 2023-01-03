import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Card, CardBody, Table, Button } from "reactstrap";
import axios from "axios";
import { Edit } from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import EditSwaps from "./editSwap";
import AddSwaps from "./addSwap";


const SwapsTable = ({ isRefresh }) => {

    const history = useHistory()

    const [swaps, setSwaps] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [postCount, setPostCount] = useState(1)


    useEffect(() => {
        getSwaps()
    }, [isRefresh])

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage
    const indexOfFirstdata = indexOfLastdata - postPerPage
    const currentData = swaps.slice(indexOfFirstdata, indexOfLastdata)

    //pagination part onchange
    const handlePaginationChange = (
        event,
        value
    ) => {
        setCurrentPage(value);
    };

    const getSwaps = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/swaps/show/all`)
            .then(res => {
                setSwaps(res.data.data)
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
    const editSwaps = (event, id) => {
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
                                <th>Client</th>
                                <th>Equipment Id</th>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <td>{record.client_name}</td>
                                        <td>{record.equipment_number}</td>
                                        <td>{record.date}</td>
                                        <td>{record.description}</td>
                                        <td><Edit onClick={(e) => editSwaps(e, record.id)} /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <Pagination count={postCount} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
            <EditSwaps ref={updateRef} id={id} refresh={getSwaps} />

        </>
    );
}

const SwapsList = (props) => {
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
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[{ label: 'swaps', path: '/swaps' }]}
                        title={'Swaps List'}
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
                    <SwapsTable isRefresh={refresh}/>
                </Col>
            </Row>
            <AddSwaps ref={childref} refresh={() => setRefresh(true)}/>
        </React.Fragment>
    )
}

export default SwapsList;