import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import axios from 'axios';
import { TEXTS } from '../Constants';

const divStyle = {
    display: 'flex',
    alignItems: 'center',
};

export const Filter = () => {
    const { dispatch, setRefreshProvider } = useContext(GlobalContext);
    const [filterByField, setFilterByField] = useState("");
    const [filterByDistinctValues, setFilterByDistinctValues] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const [employeeCount, setEmployeeCount] = useState(0);
    const [averageAge, setAverageAge] = useState(0.0);
    const [oldestEmployee, setOldestEmployee] = useState("");

    const onFilterByFieldSelectionChanged = value => {
        setFilterByField(value);
    }

    const onFilterValueSelectionChanged = value => {
        if (value) {
            setFilterValue(value);
        }
    }

    useEffect(() => {
        const fetchFilterByUniqueValues = async () => {
            axios.get(TEXTS.BASE_URL + 'Employee/GetDistinctValues', { params: { fieldName: filterByField } }).then(response => {
                setFilterByDistinctValues(response.data);
            }).catch(error => {
                console.log(error);
            });
        }
        if (filterByField) {
            fetchFilterByUniqueValues();
        } else {
            setEmployeeCount(0);
            setAverageAge(0.0);
            setOldestEmployee("");
            setFilterByDistinctValues([]);
            setRefreshProvider(true);
        }
    }, [filterByField]);

    useEffect(() => {
        const fetchEmployeesByFilter = async () => {
            axios.get(TEXTS.BASE_URL + 'Employee/GetFilteredEmployees', { params: { fieldName: filterByField, fieldValue: filterValue } }).then(response => {
                setEmployeeCount(response.data.totalEmployees);
                setAverageAge(response.data.averageAge.toFixed(2));
                setOldestEmployee(response.data.oldestEmployee);
                dispatch({ type: "RETRIEVE", payload: response.data.employees });
            }).catch(error => {
                console.log(error);
            });
        }

        if (filterValue) {
            fetchEmployeesByFilter();
        }
    }, [filterValue]);

    return (
        <div>
            <div style={divStyle}>
                <span>
                    Show Employee(s) whose &nbsp;
                    <select onChange={e => onFilterByFieldSelectionChanged(e.target.value)} value={filterByField}>
                        <option key={0} value="">---Select---</option>
                        <option key={1} value="Gender">Gender</option>
                        <option key={2} value="Department">Department</option>
                        <option key={3} value="Designation">Designation</option>
                        <option key={4} value="City">City</option>
                        <option key={5} value="Country">Country</option>
                    </select>
                </span>
                <span>
                    &nbsp; is &nbsp;
                    <select onChange={e => onFilterValueSelectionChanged(e.target.value)} value={filterValue}>
                        <option key={0} value="">---Select---</option>
                        {
                            filterByDistinctValues.map((value, index) => (
                                <option key={index} value={value}>{value}</option>
                            ))
                        }
                    </select>
                </span>
            </div>
            <br />
            {
                employeeCount > 0 ?
                <div>
                    <span>
                        Based on the selected criteria, there are a total of {employeeCount} employee(s), with an average age of {averageAge} years.<br />
                        With the oldest being {oldestEmployee}.
                    </span>
                </div> : null
            }
        </div>
    );
}