import React from 'react';
import { Row, Col, Card, CardBody, Table } from 'reactstrap';

import PageTitle from '../../components/PageTitle';

const records = [
    { id: 1, firstName: 'Anchor', lastName: '1000', username: '1' },
    { id: 2, firstName: 'Marino Audio', lastName: '250', username: '56' },
    { id: 3, firstName: 'Water pump', lastName: '22562', username: '12' },
    { id: 4, firstName: 'Remote control', lastName: '1225', username: '8' },
    { id: 5, firstName: 'Shower pump', lastName: '12586', username: '6' },
];

const EquipmentListTable = () => {
    return (
        <Card>
            <CardBody>
                <Table className="mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Equipment Name</th>
                            <th>Price</th>
                            <th>Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{record.id}</th>
                                    <td>{record.firstName}</td>
                                    <td>{record.lastName}</td>
                                    <td>{record.username}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

const EquipmentList = () => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Equipments', path: '/equipments' }]}
                        title={'Equipment List'}
                    />
                </Col>
            </Row>

            <Row>
                <Col xl={12}>
                    <EquipmentListTable />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default EquipmentList;
