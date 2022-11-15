import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Row, Col, Card, CardBody, Table } from 'reactstrap';
import axios from 'axios';
import { Trash, Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';


const TypeofunitTable = (props) => {
    const history = useHistory()

    const [typeofunit, setTypeofunit] = useState([])

    useEffect(() => {
        getTypeofunit()
    }, [])

    const getTypeofunit = () => {
        axios.get(`http://127.0.0.1:8000/api/typeofunits/show/all`)
            .then(res => {
                console.log(res.data)
                setTypeofunit(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const goEdit = (id) => {
        history.push(`edit-typeofunit/${id}`)
    }

    return (
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
                        {typeofunit.map((record) => {
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