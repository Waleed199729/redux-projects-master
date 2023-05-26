import { ADD_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from './employeeTypes';                                                    //employee => action types
import { employeesData } from '../../data'                                                                        //khud data banaya hwa import kiya ha, jo data me index.js ke name se para ha

const initialState = {      //ye pura aak OBJECT ha
    employees: employeesData,    // firts time rendering pr ye sara it's a Key {employeesData[]} ka data show hoga, 
    //ye employees ko as a State, ham dashboard me access karein ge by using {useSelector} hook
    error: null         
}

export const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EMPLOYEE:
            return {                      //Reducer object ko update nahi kare balke new state bana kr overwrite kr dega
                ...state,                 // purana data le rahe hain
                employees: [...state.employees, action.employee]  //purane employee data ke sath new [action.employee] ka jo data aya ha usko merge kr do r upar aj kr initialState ko Update kr do
            };
        case UPDATE_EMPLOYEE:
            return {
                ...state,               //old state le rahe hain
                employees: state.employees.map(employee => {     //iterate kr rahe hain
                    if (employee.id === action.employee.id) {                //age employee.id equals to action.id then: 
                        return { ...employee, ...action.employee }   //particular object ka data update krdiya
                    }
                    return employee;
                })
            };
        case DELETE_EMPLOYEE:
            return {
                ...state,
                employees: state.employees.filter(employee => employee.id !== action.id) // jb yahan pr id match nahi hogi to condition false hojay gi r filter function yahan pr wo data ko remove kr ke pechla data store krwa dega
            };
        default:
            return state;
    }
}



// now go to the index.js adn exoort the actions jo hamare UI component zarury pari gi
