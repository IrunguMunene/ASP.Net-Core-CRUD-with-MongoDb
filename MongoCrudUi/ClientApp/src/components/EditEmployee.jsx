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
    const [countries, setCountries] = useState([]);

    const currentUserId = route.match.params.id

    useEffect(() => {
        const fetchEmployeeById = async () => {
            axios.get(TEXTS.BASE_URL + 'Employee/GetById', { params: { id: currentUserId } }).then(response => {
               setSeletedUser(response.data);
            }).catch(error => {
                console.log(error);
            });
        }

        const fetchCountries = async () => {
            axios.get("https://restcountries.eu/rest/v2/all").then(response => {
                setCountries(response.data);
            }).catch(error => {
                console.log(`An error occurred. ${error}`)
            });
        }

        fetchCountries();

        if (employees.length === 0) {
            fetchEmployeeById();
        } else {
            setSeletedUser(employees.find(emp => emp.id === currentUserId));
        }
    }, []);

    const onSubmit = e => {
        e.preventDefault();

        if (!selectedUser.id) {
            history.push("/EmployeeList");
            return;
        }

        if (!selectedUser.name || !selectedUser.department || !selectedUser.designation ||
            !selectedUser.age || !selectedUser.city || !selectedUser.country || !selectedUser.gender) {
            alert("All fields are mandatory.");
            return;
        }

        if (selectedUser.age < 18) {
            alert("Age must be 18 and above.")
        }

        axios.put(TEXTS.BASE_URL + 'Employee/UpdateEmployee', {
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
                        <Col md="10" lg="9" xl="7">
                            <Card className="mx-3">
                                <CardBody className="p-3">
                                    <Form onSubmit={onSubmit}>
                                        <h3>Update Employee</h3>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="Name" id="Name" placeholder="Name" value={selectedUser.name}
                                                onChange={e => handleOnChange("name", e.target.value)} required />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="Department" id="Department" placeholder="Department" value={selectedUser.department}
                                                onChange={e => handleOnChange("department", e.target.value)} required />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="Designation" id="Designation" placeholder="Designation" value={selectedUser.designation}
                                                onChange={e => handleOnChange("designation", e.target.value)} required />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="number" type="number" min="18" max="70" name="Age" id="Age" placeholder="Age" value={selectedUser.age}
                                                onChange={e => handleOnChange("age", e.target.value)} required />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="Gender" id="Gender" placeholder="Gender" value={selectedUser.gender}
                                                onChange={e => handleOnChange("gender", e.target.value)} required />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <select className="custom-select" data-live-search="true" onChange={e => handleOnChange("country", e.target.value)}
                                                value={selectedUser.country} required>
                                                <option key={0} value="">----Select----</option>
                                                {
                                                    countries.map(country => (
                                                        <option key={country.alpha3Code} value={country.name}>{country.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="City" id="City" placeholder="City" value={selectedUser.city}
                                                onChange={e => handleOnChange("city", e.target.value)} required />
                                        </InputGroup>
                                        <CardFooter className="p-0">
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