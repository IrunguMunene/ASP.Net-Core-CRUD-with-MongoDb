import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { TEXTS } from '../Constants';

export const TableRow = ({ employee }) => {

    const { dispatch } = useContext(GlobalContext);

    let history = useHistory();

    const openRecordForEditing = employeeToEdit => {
        history.push({
            pathname: '/EditEmployee/' + employeeToEdit.id
        });
    }

    const deleteEmployee = employeeToDelete => {
        axios.delete(TEXTS.BASE_URL + 'Employee/DeleteEmployee', { params: { id: employeeToDelete.id } }).then(response => {
            dispatch({ type: "REMOVE_EMPLOYEE", payload: employeeToDelete.id });
            history.push("/EmployeeList");
        }).catch(error => {
            console.log(error);
        });
    }

    const buttonStyle = {
        margin: '2px',
    };

    return (
        <tr>
            <td>{employee.name}</td>
            <td>{employee.gender}</td>
            <td>{employee.department}</td>
            <td>{employee.designation}</td>
            <td>{employee.age}</td>
            <td>{employee.city}</td>
            <td>{employee.country}</td>
            <td>
                <div className="btn-group">
                    <button className="btn btn-outline-primary block" style={buttonStyle} onClick={() => { openRecordForEditing(employee) }}>Edit</button>
                    <button className="btn btn-outline-primary block" style={buttonStyle} onClick={() => { deleteEmployee(employee) }}>Delete</button>
                </div>
            </td>
        </tr>  
    );
}