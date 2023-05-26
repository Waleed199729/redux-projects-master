// after declearing ActionsTypes i will update my employeeAction.js by giving ( 3 const Actions ) below

import { ADD_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from './employeeTypes';

export const addEmployee = (employee) => {            //(employee) it's a object
    return {
        type: ADD_EMPLOYEE,
        employee                           // employee => acts like a Payload / employee type data bejh raha hain ham
    }
}

export const updateEmployee = (employee) => {                // 2 objects pass  
    return {
        type: UPDATE_EMPLOYEE,
        employee     //id aur employee as a payload pass kiye hain id = id; && employee=employee ho to ham single form use krte hain
    }
}

export const deleteEmployee = (id) => {
    return {
        type: DELETE_EMPLOYEE,
        id
    }
}

// then go to the employeeReducer