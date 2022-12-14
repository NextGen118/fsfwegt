import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Table, Button } from "reactstrap";
import axios from "axios";
import { Edit } from "react-feather";
import { useHistory } from "react-router-dom";
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';

const BilloflandingsTable = (props) => {

    const history = useHistory()

    const [billoflandings, setBilloflandings] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [postCount, setPostCount] = useState(1)

    useEffect(() => {
        getBilloflandings()
    }, [])

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage
    const indexOfFirstdata = indexOfLastdata - postPerPage
    const currentData = billoflandings.slice(indexOfFirstdata, indexOfLastdata)

    //pagination part onchange
    const handlePaginationChange = (
        event,
        value
    ) => {
        setCurrentPage(value);
    };

    const getBilloflandings = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/billoflandingswitches/show/all`)
            .then(res => {
                setBilloflandings(res.data.data)
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

    const editBilloflandings = (id) => {
        history.push(`edit-billoflandingswitches/${id}`)
    }

    return (
        <>
            <Card>
                <CardBody style={{ width: "100%", overflow: "auto", display: "flex" }}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Numberof Bills</th>
                                <th>Bill of lading Number</th>
                                <th>Country</th>
                                <th>Port</th>
                                <th>Client</th>
                                <th>Voyage Number</th>
                                <th>Ocean Freight</th>
                                <th>Detention Days</th>
                                <th>Detention Description</th>
                                <th>Ship on Board Date</th>
                                <th>Traffic Mode</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <td>{record.date}</td>
                                        <td>{record.no_of_bls}</td>
                                        <td>{record.bill_of_landing_number}</td>
                                        <td>{record.country_name}</td>
                                        <td>{record.port_name}</td>
                                        <td>{record.client_name}</td>
                                        <td>{record.voyage_number}</td>
                                        <td>{record.ocean_freight}</td>
                                        <td>{record.detention_free_days}</td>
                                        <td>{record.detention_description}</td>
                                        <td>{record.ship_on_board_date}</td>
                                        <td>{record.trafficmode_type}</td>
                                        <td><Edit onClick={() => editBilloflandings(record.id)} /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <Pagination count={postCount} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
        </>
    );
}

const Billoflandings_switchesList = (props) => {

    const history = useHistory()

    const addBilloflandingsForm = () => {
        history.push("/add-billoflandingswitches");
    }

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Bill of lading switches', path: '/billoflandingswitches' }]}
                        title={'Bill of lading switches List'}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button color="info" className="float-right" onClick={() => addBilloflandingsForm()}>Add</Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                    <BilloflandingsTable />
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default Billoflandings_switchesList;