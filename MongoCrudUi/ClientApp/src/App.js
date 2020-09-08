import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalProvider } from './Context/GlobalContext';
import { Layout } from './components/Layout';
import { CreateEmployee } from './components/CreateEmployee';
import { EditEmployee } from './components/EditEmployee';
import { EmployeeList } from './components/EmployeeList';
import { GoodBinaryStringChecker } from './components/GoodBinaryStringChecker';

import './custom.css'

export const App = () => {
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <Router>
                        <Layout />
                        <GlobalProvider>
                            <Switch>
                                <Route exact path='/CreateEmployee' component={CreateEmployee} />
                                <Route exact path='/EmployeeList' component={EmployeeList} />
                                <Route exact path="/EditEmployee/:id" component={EditEmployee} />
                                <Route exact path='/GoodBinaryStringChecker' component={GoodBinaryStringChecker} />
                            </Switch>
                        </GlobalProvider>
                    </Router>
                </div>
            </div>
        </div>
    );
}