import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Pagination from '@mui/material/Pagination';
import Badge from '@mui/material/Badge';

const ArrivalNoticeChargesTable = (props) => {
    const history = useHistory();

    const [arrivalNoticeCharges, setArrivalNoticeCharges] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);

    useEffect(() => {
        getArrivalNoticeCharges();
    }, []);

    //getCurrent data  //pagination part
    const indexOfLastdata = currentPage * postPerPage;
    const indexOfFirstdata = indexOfLastdata - postPerPage;
    const currentData = arrivalNoticeCharges.slice(indexOfFirstdata, indexOfLastdata);

    //pagination part onchange
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
    };

    const getArrivalNoticeCharges = () => {
        axios
            .get(`http://127.0.0.1:8000/api/arrivalnoticecharges/show/all`)
            .then((res) => {
                setArrivalNoticeCharges(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const editArrivalNoticeCharges = (id) => {
        history.push(`edit-arrivalNoticeCharges/${id}`);
    };

    return (
        <>
            <Card>
                <CardBody style={{ width: '100%', overflow: 'auto', display: 'flex' }}>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Unit</th>
                                <th>Unit Cost</th>
                                <th>Amount</th>
                                <th>Amount In</th>
                                <th>Unit Charge</th>
                                <th>Tax</th>
                                <th>Profit In</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <td>{record.unit}</td>
                                        <td>{record.unit_cost}</td>
                                        <td>{record.amount}</td>
                                        <td>{record.amount_in}</td>
                                        <td>{record.unit_charge}</td>
                                        <td>{record.tax}</td>
                                        <td>{record.profit_in}</td>

                                        <td>
                                            <Edit
                                                color="blue"
                                                size={20}
                                                onClick={() => editArrivalNoticeCharges(record.id)}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <Pagination count={postPerPage} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
        </>
    );
};

const ArrivalNoticeChargesList = (props) => {
    const history = useHistory();

    const addArrivalNoticeChargesForm = () => {
        history.push('/add-arrivalNoticeCharges');
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <Row>
                        <h3 className="mb-1 mt-0">Arrival Notice Charges</h3>
                    </Row>
                    <Row>
                        <PageTitle breadCrumbItems={[{ label: 'Arrival Notice Charges', path: '/arrivalNoticeCharges' }]} />
                    </Row>
                </Col>
           
                <Col>
                    <Button color="info" className="float-right" onClick={() => addArrivalNoticeChargesForm()}>
                        + Create Arrival Notice Charges
                    </Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xl={12}>
                    <ArrivalNoticeChargesTable />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ArrivalNoticeChargesList;
