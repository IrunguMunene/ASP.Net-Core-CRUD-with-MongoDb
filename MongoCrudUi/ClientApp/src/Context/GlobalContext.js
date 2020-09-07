import React, { createContext, useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import { TEXTS } from './../Constants';

const initialState = {
    employees: []
}

const reducer = (state = initialState.employees, action) => {
    switch (action.type) {
        case "EDIT_EMPLOYEE":
            const employeeToUpdate = action.payload;
            const updatedEmployees = state.employees.map(employee => {
                if (employee.id === employeeToUpdate.id) {
                    return employeeToUpdate;
                }

                return employee;
            });

            return {
                ...state,
                employees: updatedEmployees
            };
        case "REMOVE_EMPLOYEE":
            return {
                ...state,
                employees: state.employees.filter(employee => employee.id !== action.payload)
            };
        case "RETRIEVE":
            return {
                ...state,
                employees: [...action.payload]
            }
        default:
            return state;
    }
}

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [refreshProvider, setRefreshProvider] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(TEXTS.BASE_URL + 'LoadEmployees',);
            dispatch({ type: "RETRIEVE", payload: result.data });
        };

        if (refreshProvider) {
            fetchData();
            setRefreshProvider(false);
        }
    }, [refreshProvider]);

    return (
        <GlobalContext.Provider value={{
            employees: state.employees,
            dispatch,
            setRefreshProvider,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};