import React, { useState, useContext, Fragment } from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import { useHistory } from 'react-router-dom';
import {
    Button, Card, CardBody, CardFooter, Col,
    Container, Form, Input, InputGroup, Row
} from 'reactstrap';
import axios from 'axios';
import { TEXTS } from '../Constants';

export const CreateEmployee = () => {
    const { setRefreshProvider } = useContext(GlobalContext);

    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [designation, setDesignation] = useState("");
    const [age, setAge] = useState(0);
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [gender, setGender] = useState("");

    let history = useHistory();

    const onSubmit = e => {
        e.preventDefault();

        if (!name) {
            alert("You must at least enter a name.")
        } else {
            axios.post(TEXTS.BASE_URL + 'CreateEmployee', {
                name, department, designation, age: parseInt(age),
                city, country, gender
            }).then(response => {
                setRefreshProvider(true);
                history.push("/EmployeeList");
            }).catch(error => {
                console.log(error);
            });
        }
    }

    return (
        <Fragment>
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="12" lg="10" xl="8">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <Form onSubmit={onSubmit}>
                                        <h3>Register</h3>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="Name" id="Name" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="Department" id="Department" placeholder="Department" value={department}
                                                onChange={e => setDepartment(e.target.value)} />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="Designation" id="Designation" placeholder="Designation" value={designation}
                                                onChange={e => setDesignation(e.target.value)} />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="number" name="Age" id="Age" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="City" id="City" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="Country" id="Country" placeholder="Country" value={country}
                                                onChange={e => setCountry(e.target.value)} />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="Gender" id="Gender" placeholder="Gender" value={gender}
                                                onChange={e => setGender(e.target.value)} />
                                        </InputGroup>
                                        <CardFooter className="p-4">
                                            <Row>
                                                <Col xs="12" sm="6">
                                                    <Button type="submit" className="btn btn-info mb-1" block><span>Save</span></Button>
                                                </Col>
                                                <Col xs="12" sm="6">
                                                    <Button className="btn btn-info mb-1" block
                                                        onClick={() => { history.push("/EmployeeList") }}>
                                                        <span>Cancel</span>
                                                    </Button>
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
};
