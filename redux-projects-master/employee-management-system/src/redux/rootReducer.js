import { combineReducers } from 'redux';                //ue Hook use hoti ha jb multiple reducer use krne hon
import { employeeReducer } from './employee/employeeReducer';

const rootReducer = combineReducers({
    employees: employeeReducer,                             //ye employee ka reducer agaya yahan from emopoyeeReducer.js
    // other reducers                                    //like koi r reducer jese: counter: counterReducer
});

export default rootReducer;


// Now we will register this rootReducer to the Store 
//now go on store.js
