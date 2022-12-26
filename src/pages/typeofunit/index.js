import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Table } from 'reactstrap';
import axios from 'axios';
import { Trash, Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';


const TypeofunitTable = (props) => {
    const history = useHistory()

    const [typeofunit, setTypeofunit] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [postCount, setPostCount] = useState(1)

    useEffect(() => {
        getTypeofunit()
    }, [])

    const getTypeofunit = () => {
        axios.get(`http://127.0.0.1:8000/api/typeofunits/show/all`)
            .then(res => {
                console.log(res.data)
                setTypeofunit(res.data.data)
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
        history.push(`edit-typeofunit/${id}`)
    }

    const indexOfLastdata = currentPage * postPerPage
    const indexOfFirstdata = indexOfLastdata - postPerPage
    const currentData = typeofunit.slice(indexOfFirstdata, indexOfLastdata)

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
                                <th>Type Of Uniit</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((record) => {
                                return (
                                    <tr key={record.id}>
                                        <th scope="row">{record.id}</th>
                                        <td>{record.type_of_unit}</td>
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

const TypeofunitList = (props) => {
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
                    <TypeofunitTable />
                </Col>
            </Row>
        </React.Fragment>
    );
}
export default TypeofunitList;