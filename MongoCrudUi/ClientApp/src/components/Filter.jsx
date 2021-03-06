﻿import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import axios from 'axios';
import { TEXTS } from '../Constants';

const controlMarginStyle = {
    margin: "5px",
};

export const Filter = () => {
    const { dispatch, setRefreshProvider, filterByField, employeeCount, setEmployeeCount,
        averageAge, setAverageAge, oldestEmployee, setOldestEmployee, searchEmployeeName,
            setFilterByField, filterValue, setFilterValue } = useContext(GlobalContext);
    const [filterByDistinctValues, setFilterByDistinctValues] = useState([]);

    const onFilterByFieldSelectionChanged = value => {
        setFilterByField(value);
    }

    const onFilterValueSelectionChanged = value => {
        if (value) {
            setFilterValue(value);
        }
    }

    const onClick = () => {
        setFilterByField("");
        setRefreshProvider(true);
    }

    useEffect(() => {
        const fetchFilterByUniqueValues = async () => {
            axios.get(TEXTS.BASE_URL + 'Employee/GetDistinctValues', {
                params: {
                    fieldName: filterByField
                }
            }).then(response => {
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
            setFilterValue("");
            setRefreshProvider(true);
        }
    }, [filterByField]);

    useEffect(() => {
        const fetchEmployeesByFilter = async () => {
            if (searchEmployeeName) {
                axios.get(TEXTS.BASE_URL + 'Employee/SearchByMultipleFields',
                    {
                        params: {
                            fieldName: filterByField,
                            fieldValue: filterValue,
                            employeeName: searchEmployeeName
                        }
                    }
                ).then(response => {
                        dispatch({ type: "RETRIEVE", payload: response.data });
                }).catch(error => {
                    console.log(error);
                });
            } else {
                axios.get(TEXTS.BASE_URL + 'Employee/GetFilteredEmployees', {
                    params: {
                        fieldName: filterByField, fieldValue: filterValue
                    }
                }).then(response => {
                    setEmployeeCount(response.data.totalEmployees);
                    setAverageAge(response.data.averageAge.toFixed(2));
                    setOldestEmployee(response.data.oldestEmployee);
                    dispatch({ type: "RETRIEVE", payload: response.data.employees });
                }).catch(error => {
                    console.log(error);
                });
            }
        }

        if (filterValue) {
            fetchEmployeesByFilter();
        }
    }, [filterValue]);

    return (
        <div>
            <div className="row">
                <form className="form-inline well">
                    <label className="control-label" style={controlMarginStyle}>Show Employee(s) whose</label>
                    <div className="form-group">
                        <select className="form-control form-control-sm custom-select" onChange={e => onFilterByFieldSelectionChanged(e.target.value)} value={filterByField}>
                            <option key={0} value="">---Select---</option>
                            <option key={1} value="Gender">Gender</option>
                            <option key={2} value="Department">Department</option>
                            <option key={3} value="Designation">Designation</option>
                            <option key={4} value="City">City</option>
                            <option key={5} value="Country">Country</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="control-label" style={controlMarginStyle}>is</label>
                        <select className="form-control form-control-sm custom-select" onChange={e => onFilterValueSelectionChanged(e.target.value)} value={filterValue}>
                            <option key={0} value="">---Select---</option>
                            {
                                filterByDistinctValues.map((value, index) => (
                                    <option key={index} value={value}>{value}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-outline-info text-dark my-2 my-sm-0" style={controlMarginStyle} type="button"
                            onClick={onClick}>Clear Filter
                        </button>
                    </div>
                </form>
            </div>
            <div className="row">
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
        </div>
    );
}