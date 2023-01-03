import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Table } from 'reactstrap';
import axios from 'axios';
import { Trash, Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';


const TimezoneTable = (props) => {
    const history = useHistory()

    const [timexone, setTimezone] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [postCount, setPostCount] = useState(1)

    useEffect(() => {
        getTimezone()
    }, [])

    const getTimezone = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/timezones/show/all`)
            .then(res => {
                console.log(res.data)
                setTimezone(res.data.data)
                setPostCount(() => {
                    if (res.data.data.length < 8) {
                        return 1
                    }

                    return Math.ceil(res.data.data.length / 8)
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const goEdit = (id) => {
        history.push(`edit-timezone/${id}`)
    }

    const indexOfLastdata = currentPage * postPerPage
    const indexOfFirstdata = indexOfLastdata - postPerPage
    const currentData = timexone.slice(indexOfFirstdata, indexOfLastdata)

    const handlePaginationChange = (
        event,
        value
    ) => {
        setCurrentPage(value);
    };

    return (
        <>
            <Card>
                <CardBody>
                    <Table className="mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Timezone data name</th>
                                <th>Timezone data value</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <th scope="row">{record.id}</th>
                                        <td>{record.timezone_data_name}</td>
                                        <td>{record.timezone_data_value}</td>
                                        <td><Edit onClick={() => goEdit(record.id)} /></td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <Pagination count={postCount} page={currentPage} onChange={handlePaginationChange} variant="outlined" />
        </>
    );
}

const Timezonelist = (props) => {
    return (
        <React.Fragment>
            <Row className="page-title">

                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Timezone', path: '/timezone' }]}
                        title={'Timezone List'}
                    />
                </Col>
            </Row>

            <Row>
                <Col xl={12}>
                    <TimezoneTable />
                </Col>
            </Row>
        </React.Fragment>
    );
}
export default Timezonelist;