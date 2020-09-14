import React, { useState, useContext, Fragment, useEffect } from 'react';
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
    const [countries, setCountries] = useState([]);

    let history = useHistory();

    useEffect(() => {
        const fetchCountries = async () => {
            axios.get("https://restcountries.eu/rest/v2/all").then(response => {
                setCountries(response.data);
            }).catch(error => {
                console.log(`An error occurred. ${error}`)
            });
        }

        fetchCountries();
    }, []);

    const onSubmit = e => {
        e.preventDefault();

        if (!name || !department || !designation || !age || !city || !country) {
            alert("All Fields are required.");
        }
        else if (age < 18) {
            alert("Age must be 18 and above.")
        } else {
            axios.post(TEXTS.BASE_URL + 'Employee/CreateEmployee', {
                name, department, designation, age: parseInt(age),
                city, country, gender
            }).then(response => {
                setRefreshProvider(true);
                history.push("/EmployeeList");
            }).catch(error => {
                console.log(error);
                alert(`An error occurred. ${error}`);
            });
        }
    }

    return (
        <Fragment>
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="10" lg="9" xl="7">
                            <Card className="mx-3">
                                <CardBody className="p-3">
                                    <Form onSubmit={onSubmit}>
                                        <h3>Register Employee</h3>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="Name" id="Name" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="Department" id="Department" placeholder="Department" value={department}
                                                onChange={e => setDepartment(e.target.value)} required />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="Designation" id="Designation" placeholder="Designation" value={designation}
                                                onChange={e => setDesignation(e.target.value)} required />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="number" min="18" max="70" name="Age" id="Age" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} required />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="Gender" id="Gender" placeholder="Gender" value={gender}
                                                onChange={e => setGender(e.target.value)} required />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <select className="custom-select" data-live-search="true" onChange={e => setCountry(e.target.value)} required>
                                                <option key={0} value="">----Select----</option>
                                                {
                                                    countries.map(country => (
                                                        <option key={country.alpha3Code} value={country.name}>{country.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="City" id="City" placeholder="City" value={city} onChange={e => setCity(e.target.value)} required />
                                        </InputGroup>
                                        <CardFooter className="p-0">
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
