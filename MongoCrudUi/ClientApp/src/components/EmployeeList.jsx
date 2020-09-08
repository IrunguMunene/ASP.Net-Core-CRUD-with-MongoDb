import React, { useContext } from "react";
import { GlobalContext } from '../Context/GlobalContext';
import { TableRow } from './TableRow';
import { Filter } from './Filter';

export const EmployeeList = () => {
    const { employees } = useContext(GlobalContext);

    if (!employees.length) {
        return <p className="text-warning">There is no employee data to display.</p>;
    }

    return (
        <div>
            <Filter />
            <div className="row table-responsive-sm">
                <table className="table table-bordered table-striped table-sm">
                    <thead className="thead-dark">
                        <tr>
                            <th>Employee Name</th>
                            <th>Gender</th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>Age</th>
                            <th>City</th>
                            <th>Country</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <TableRow key={employee.id} employee={employee} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};