import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee } from '../../redux';
import './Add.css'

function Add({ setIsAdding }) {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employees);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');

  const [education, setEducation] = useState([{ subject: '', grade: '', school: '', passingyear: '' }]);

  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();
  }, []);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    setEducation(prevEducation => {
      const updatedUserList = [...prevEducation];
      
      updatedUserList[index] = {
        ...updatedUserList[index],
        [name]: value,
      };
      return updatedUserList;
    
    });
  };

  const addService = (e) => {
    e.preventDefault();
   
    setEducation([...education, {
      subject: '',
      grade: '',
      school: '',
      passingyear: '',
    }])
  };

  const removeService = (serviceIndex) => {
    let updatedUserList = education.filter((e,index) => index !== serviceIndex);
    setEducation(updatedUserList);
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !salary || !date || !address) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const id = employees.length + 1;
    const newEmployee = {
      id,
      firstName,
      lastName,
      email,
      salary,
      date,
      address,
      education,
    
    };

    dispatch(addEmployee(newEmployee));
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${firstName} ${lastName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          ref={textInput}
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="salary">Salary ($)</label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label htmlFor="address"> Address </label>
        <input
          id="address"
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
<table>
        {education?.map((service, serviceIndex) => (
          <div className='education_field' key={serviceIndex}>
            <label>Educational</label>
            
            <input
              type="text"
              name="subject"
              value={service.subject}
              onChange={(e) => handleInputChange(serviceIndex, e)}
              placeholder="Subject"
            />
            <input
              type="text"
              name="grade"
              value={service.grade}
              onChange={(e) => handleInputChange(serviceIndex, e)}
              placeholder="Grade"
            />
            <input
              type="text"
              name="school"
              value={service.school}
              onChange={(e) => handleInputChange(serviceIndex, e)}
              placeholder="School"
            />
            <input
              type="text"
              name="passingyear"
              value={service.passingyear}
              onChange={(e) => handleInputChange(serviceIndex, e)}
              placeholder="Passing Year"
            />
           
            <button className="btn_remove" onClick={() => removeService(serviceIndex)}>
              Remove
            </button>
           
          </div>
        ))}

      
        <button className="btn_add" onClick={(e) => addService(e)}>
          Add Service
        </button>
        
</table>

        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
}

export default Add;