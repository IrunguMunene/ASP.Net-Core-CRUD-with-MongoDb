import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export const NavMenu = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                        <Link to={'/EmployeeList'} className="nav-link">Employees</Link>
                    </NavItem>
                    <NavItem>
                        <Link to={'/GoodBinaryStringChecker'} className="nav-link">Task 2 Solution</Link>
                    </NavItem>
                </ul>
            </div>
        </nav>
    );
}
