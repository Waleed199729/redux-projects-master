import React, { useState } from 'react'
import Swal from 'sweetalert2';

import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';

import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee } from '../../redux';

function Dashboard() {
    const dispatch = useDispatch();
    const { employees } = useSelector(state => state.employees);          //yahan se ham employees ki updated State nikaal rahe hain

    console.log('TEST', employees)

    const [isAdding, setIsAdding] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = (id) => {
        const [employee] = employees.filter(employee => employee.id === id);

        setSelectedEmployee(employee);
        setIsEditing(true);
    }

    const handleDelete = (employee) => {                //ye function List.js me call hwa r yahan functionality perform krne ke bd neche dispatch krwaya 
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(result => {
            if (result.value) {
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                dispatch(deleteEmployee(employee.id)); //ye (dispatch) hame employeeReducers.js me (const delete ke function) se dispatch krway ga wiht the help of employeeAction.js
            }
        });
    }

    


    return (
        <div className='container'>
            {/* List */}
            {!isAdding && !isEditing && (
                <>
                    <Header                                    //addEmployee ka button Hearder.js me ha to onclick pr setIsAdding ka function chale ga  
                        setIsAdding={setIsAdding}       //showing the add button on the screen
                    />
                    <List                                           //List.js component
                        employees={employees}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </>
            )}
            {/* Add */}
            {isAdding && (
                <Add
                    employees={employees}
                    setIsAdding={setIsAdding}
                />
            )}
            {/* Edit */}
            {isEditing && (
                <Edit
                    employees={employees}
                    selectedEmployee={selectedEmployee}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
    )
}

export default Dashboard;