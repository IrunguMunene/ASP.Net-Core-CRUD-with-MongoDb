import React from 'react';
import { NavbarBrand, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export const NavMenu = () => {
    return (
        <nav className="navbar navbar-default navbar-expand-lg navbar-dark bg-primary navbar-fixed-top rounded">
            <div className="container-fluid">
                <NavbarBrand tag={Link} to="/">Secure Privacy Code Test</NavbarBrand>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <NavItem>
                            <Link to={'/CreateEmployee'} className="nav-link text-dark">Add Employee</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/EmployeeList'} className="nav-link text-dark">Employees</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/GoodBinaryStringChecker'} className="nav-link text-dark">Task 2 Solution</Link>
                        </NavItem>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
