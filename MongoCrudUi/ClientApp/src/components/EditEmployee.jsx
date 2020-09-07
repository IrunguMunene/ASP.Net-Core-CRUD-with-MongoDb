import React, { Fragment, useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import { useHistory } from 'react-router-dom';
import {
    Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, Row
} from 'reactstrap';
import axios from 'axios';
import { TEXTS } from '../Constants';

export const EditEmployee = route => {
    let history = useHistory();
    const { employees, dispatch } = useContext(GlobalContext);
    const [selectedUser, setSeletedUser] = useState({
        id: "",
        name: "",
        department: "",
        designation: "",
        age: 0,
        city: "",
        country: "",
        gender: ""
    });

    const currentUserId = route.match.params.id;

    useEffect(() => {
        const selectedUser = employees.find(emp => emp.id === currentUserId);
        setSeletedUser(selectedUser);
    }, []);

    const onSubmit = e => {
        e.preventDefault();

        if (!selectedUser.id) {
            history.push("/EmployeeList");
            return;
        }

        axios.put(TEXTS.BASE_URL + 'UpdateEmployee', {
            id: selectedUser.id,
            Name: selectedUser.name,
            Department: selectedUser.department,
            Designation: selectedUser.designation,
            Age: parseInt(selectedUser.age),
            City: selectedUser.city,
            Country: selectedUser.country,
            Gender: selectedUser.gender
        }).then(response => {
            dispatch({ type: "EDIT_EMPLOYEE", payload: selectedUser });
            history.push("/EmployeeList");
        }).catch(error => {
            console.log(error);
        });
    };

    const handleOnChange = (userKey, value) =>
        setSeletedUser({ ...selectedUser, [userKey]: value });

    return (
        <Fragment>
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="12" lg="10" xl="8">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <Form onSubmit={onSubmit}>
                                        <h3>Update Employee</h3>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="Name" id="Name" placeholder="Name" value={selectedUser.name}
                                                onChange={e => handleOnChange("name", e.target.value)} />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="Department" id="Department" placeholder="Department" value={selectedUser.department}
                                                onChange={e => handleOnChange("department", e.target.value)} />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="Designation" id="Designation" placeholder="Designation" value={selectedUser.designation}
                                                onChange={e => handleOnChange("designation", e.target.value)} />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="number" name="Age" id="Age" placeholder="Age" value={selectedUser.age}
                                                onChange={e => handleOnChange("age", e.target.value)} />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="City" id="City" placeholder="City" value={selectedUser.city}
                                                onChange={e => handleOnChange("city", e.target.value)} />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="Country" id="Country" placeholder="Country" value={selectedUser.country}
                                                onChange={e => handleOnChange("country", e.target.value)} />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="Gender" id="Gender" placeholder="Gender" value={selectedUser.gender}
                                                onChange={e => handleOnChange("gender", e.target.value)} />
                                        </InputGroup>
                                        <CardFooter className="p-4">
                                            <Row>
                                                <Col xs="12" sm="6">
                                                    <Button type="submit" className="btn btn-info mb-1" block><span>Save</span></Button>
                                                </Col>
                                                <Col xs="12" sm="6">
                                                    <Button type="submit" className="btn btn-info mb-1" block onClick={() => { history.push("/EmployeeList") }}><span>Cancel</span></Button>
                                                </Col>
                                            </Row>
                                        </CardFooter>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    );
}