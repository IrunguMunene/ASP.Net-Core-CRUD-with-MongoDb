import React, { useContext } from 'react';
import { NavbarBrand, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalContext';
import './NavMenu.css';


export const NavMenu = () => {
    let history = useHistory();

    const { setSearchEmployeeName, setRefreshProvider } = useContext(GlobalContext);
    

    const searchEmployee = e => {
        e.preventDefault();
        history.push("/EmployeeList");
    }

    const handleOnChange = (value) => {
        setSearchEmployeeName(value);
        setRefreshProvider(true);
    }

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
                        <form className="form-inline" onSubmit={searchEmployee}>
                            <input className="form-control mr-sm-2" type="search" placeholder="Name Search" aria-label="Search"
                                onChange={e => handleOnChange(e.target.value)} />
                            <button className="btn btn-outline-success text-dark my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
