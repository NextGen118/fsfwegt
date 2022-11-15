import React from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput, Input } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../components/PageTitle';

const AddEquipment = () => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Equipments', path: '/equipments' },
                            { label: 'Add Equipment', path: '/add-equipments', active: true },
                        ]}
                        title={'Add Equipment'}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            {/* <p className="sub-header">
                                Provide valuable, actionable feedback to your users with HTML5 form validation–available
                                in all our supported browsers.
                            </p> */}
                            <AvForm>
                                <AvField name="firstname" label="Equipment Name" type="text" required />
                                <AvField name="lastname" label="Price" type="text" required />

                                <FormGroup>
                                    <Label for="exampleSelect">Select Unit</Label>
                                    <Input type="select" name="select" id="exampleSelect">
                                        <option>Unit 1</option>
                                        <option>Unit 2</option>
                                        <option>Unit 3</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <AvInput
                                        tag={CustomInput}
                                        type="checkbox"
                                        name="customCheckbox"
                                        label="Recycle"
                                        required
                                    />
                                </FormGroup>

                                <Button color="primary" type="submit">
                                    Submit
                                </Button>
                            </AvForm>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default AddEquipment;
