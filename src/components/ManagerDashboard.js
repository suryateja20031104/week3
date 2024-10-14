// import React, { useContext, useState, useEffect } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import './ManagerDashboard.css';

// function ManagerDashboard() {
//   const { employees, setEmployees } = useContext(EmployeeContext); // Use context to get state
//   const [newEmployeeName, setNewEmployeeName] = useState('');
//   const [newEmployeeTasks, setNewEmployeeTasks] = useState('');

//   // Use useEffect to load data from localStorage when the component mounts
//   useEffect(() => {
//     const savedEmployees = JSON.parse(localStorage.getItem('employees'));
//     if (savedEmployees) {
//       setEmployees(savedEmployees);
//     }
//   }, [setEmployees]);

//   // Save employees to localStorage whenever employees state changes
//   useEffect(() => {
//     localStorage.setItem('employees', JSON.stringify(employees));
//   }, [employees]);

//   const handleAddEmployee = (e) => {
//     e.preventDefault();
//     if (newEmployeeName.trim() && newEmployeeTasks.trim()) {
//       const updatedEmployees = [
//         ...employees,
//         {
//           name: newEmployeeName,
//           tasks: newEmployeeTasks.split(',').map((task) => ({ title: task.trim(), status: 'pending' })),
//         },
//       ];
//       setEmployees(updatedEmployees);
//       setNewEmployeeName('');
//       setNewEmployeeTasks('');
//     }
//   };

//   const handleEdit = (employeeIndex, taskIndex = null) => {
//     const updatedEmployees = [...employees];
//     if (taskIndex === null) {
//       const updatedName = prompt("Update employee name:", updatedEmployees[employeeIndex].name);
//       if (updatedName) {
//         updatedEmployees[employeeIndex].name = updatedName;
//         setEmployees(updatedEmployees);
//       }
//     } else {
//       const updatedTaskTitle = prompt("Update task:", updatedEmployees[employeeIndex].tasks[taskIndex].title);
//       if (updatedTaskTitle) {
//         updatedEmployees[employeeIndex].tasks[taskIndex].title = updatedTaskTitle;
//         setEmployees(updatedEmployees);
//       }
//     }
//   };

//   const handleMarkAsCompleted = (employeeIndex, taskIndex) => {
//     const updatedEmployees = [...employees];
//     updatedEmployees[employeeIndex].tasks[taskIndex].status = 'completed';
//     setEmployees(updatedEmployees);
//   };

//   const handleDeleteEmployee = (employeeIndex) => {
//     const updatedEmployees = employees.filter((_, index) => index !== employeeIndex);
//     setEmployees(updatedEmployees);
//   };

//   return (
//     <div className="manager-dashboard-container">
//       <h2>Manager Dashboard</h2>
//       <div className="manager-dashboard-content">
//         <form onSubmit={handleAddEmployee} className="employee-form">
//           <input
//             type="text"
//             placeholder="Employee Name"
//             value={newEmployeeName}
//             onChange={(e) => setNewEmployeeName(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Employee Tasks (comma-separated)"
//             value={newEmployeeTasks}
//             onChange={(e) => setNewEmployeeTasks(e.target.value)}
//           />
//           <button type="submit">Add Employee</button>
//         </form>

//         <div className="employee-list">
//           <h3>Employee List</h3>
//           {employees.length === 0 && <p>No employees added yet.</p>}
//           {employees.map((employee, employeeIndex) => (
//             <div key={employeeIndex} className="employee-item">
//               <h4 onClick={() => handleEdit(employeeIndex)}>{employee.name}</h4>
//               <h5>Tasks:</h5>
//               <ul>
//                 {employee.tasks.map((task, taskIndex) => (
//                   <li key={taskIndex}>
//                     {task.title} - <strong>{task.status}</strong>
//                     <button onClick={() => handleEdit(employeeIndex, taskIndex)}>Edit Task</button>
//                     {task.status === 'pending' && (
//                       <button onClick={() => handleMarkAsCompleted(employeeIndex, taskIndex)}>Mark as Completed</button>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//               <button className="delete-employee-btn" onClick={() => handleDeleteEmployee(employeeIndex)}>Delete Employee</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ManagerDashboard;


import React, { useContext, useState, useEffect } from 'react';
import { EmployeeContext } from './EmployeeContext';
import './ManagerDashboard.css';

function ManagerDashboard() {
  const { employees, setEmployees } = useContext(EmployeeContext); // Use context to get state
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeTasks, setNewEmployeeTasks] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3001/getAllEmployees'); // Assuming you have this endpoint
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [setEmployees]);

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (newEmployeeName.trim() && newEmployeeTasks.trim()) {
      const tasks = newEmployeeTasks.split(',').map((task) => ({
        title: task.trim(),
        status: 'pending',
      }));

      try {
        const response = await fetch('http://localhost:3001/addOrUpdateTasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            employeeName: newEmployeeName,
            tasks,
          }),
        });

        if (response.ok) {
          const updatedEmployees = [
            ...employees,
            { name: newEmployeeName, tasks },
          ];
          setEmployees(updatedEmployees);
          setNewEmployeeName('');
          setNewEmployeeTasks('');
        } else {
          console.error('Error adding employee tasks');
        }
      } catch (error) {
        console.error('Error connecting to backend:', error);
      }
    }
  };

  const handleEdit = (employeeIndex, taskIndex = null) => {
    const updatedEmployees = [...employees];
    if (taskIndex === null) {
      const updatedName = prompt("Update employee name:", updatedEmployees[employeeIndex].name);
      if (updatedName) {
        updatedEmployees[employeeIndex].name = updatedName;
        setEmployees(updatedEmployees);
      }
    } else {
      const updatedTaskTitle = prompt("Update task:", updatedEmployees[employeeIndex].tasks[taskIndex].title);
      if (updatedTaskTitle) {
        updatedEmployees[employeeIndex].tasks[taskIndex].title = updatedTaskTitle;
        setEmployees(updatedEmployees);
      }
    }
  };

  const handleMarkAsCompleted = (employeeIndex, taskIndex) => {
        const updatedEmployees = [...employees];
        updatedEmployees[employeeIndex].tasks[taskIndex].status = 'completed';
        setEmployees(updatedEmployees);
  };

  const handleDeleteEmployee = (employeeIndex) => {
        const updatedEmployees = employees.filter((_, index) => index !== employeeIndex);
        setEmployees(updatedEmployees);
  };

  return (
    <div className="manager-dashboard-container">
      <h2>Manager Dashboard</h2>
      <div className="manager-dashboard-content">
        <form onSubmit={handleAddEmployee} className="employee-form">
          <input
            type="text"
            placeholder="Employee Name"
            value={newEmployeeName}
            onChange={(e) => setNewEmployeeName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Employee Tasks (comma-separated)"
            value={newEmployeeTasks}
            onChange={(e) => setNewEmployeeTasks(e.target.value)}
          />
          <button type="submit">Add Employee</button>
        </form>

        <div className="employee-list">
          <h3>Employee List</h3>
          {employees.length === 0 && <p>No employees added yet.</p>}
          {employees.map((employee, employeeIndex) => (
            <div key={employeeIndex} className="employee-item">
              <h4 onClick={() => handleEdit(employeeIndex)}>{employee.name}</h4>
              <h5>Tasks:</h5>
              <ul>
                {employee.tasks.map((task, taskIndex) => (
                  <li key={taskIndex}>
                    {task.title} - <strong>{task.status}</strong>
                    <button onClick={() => handleEdit(employeeIndex, taskIndex)}>Edit Task</button>
                    {task.status === 'pending' && (
                      <button onClick={() => handleMarkAsCompleted(employeeIndex, taskIndex)}>Mark as Completed</button>
                    )}
                  </li>
                ))}
              </ul>
              <button className="delete-employee-btn" onClick={() => handleDeleteEmployee(employeeIndex)}>Delete Employee</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;
// import React, { useContext, useState, useEffect } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import './ManagerDashboard.css';

// function ManagerDashboard() {
//   const { employees, setEmployees } = useContext(EmployeeContext);
//   const [newEmployeeName, setNewEmployeeName] = useState('');
//   const [newEmployeeTasks, setNewEmployeeTasks] = useState('');

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/getAllEmployees');
//         const data = await response.json();
//         setEmployees(data);
//       } catch (error) {
//         console.error('Error fetching employees:', error);
//       }
//     };

//     fetchEmployees();
//   }, [setEmployees]);

//   const handleAddEmployee = async (e) => {
//     e.preventDefault();
//     if (newEmployeeName.trim() && newEmployeeTasks.trim()) {
//       const tasks = newEmployeeTasks.split(',').map((task) => ({
//         title: task.trim(),
//         status: 'pending',
//       }));

//       try {
//         const response = await fetch('http://localhost:3001/addOrUpdateTasks', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             employeeName: newEmployeeName,
//             tasks,
//           }),
//         });

//         if (response.ok) {
//           const updatedEmployees = [
//             ...employees,
//             { name: newEmployeeName, tasks },
//           ];
//           setEmployees(updatedEmployees);
//           setNewEmployeeName('');
//           setNewEmployeeTasks('');
//         } else {
//           console.error('Error adding employee tasks');
//         }
//       } catch (error) {
//         console.error('Error connecting to backend:', error);
//       }
//     }
//   };

//   const handleEdit = async (employeeIndex, taskIndex = null) => {
//     const updatedEmployees = [...employees];
//     let updatedTaskTitle = null;

//     if (taskIndex === null) {
//       const updatedName = prompt("Update employee name:", updatedEmployees[employeeIndex].name);
//       if (updatedName) {
//         updatedEmployees[employeeIndex].name = updatedName;

//         // Update the backend with the new employee name
//         try {
//           await fetch('http://localhost:3001/updateEmployeeName', {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               oldName: employees[employeeIndex].name,
//               newName: updatedName,
//             }),
//           });
//         } catch (error) {
//           console.error('Error updating employee name in the backend:', error);
//         }
//       }
//     } else {
//       updatedTaskTitle = prompt("Update task:", updatedEmployees[employeeIndex].tasks[taskIndex].title);
//       if (updatedTaskTitle) {
//         updatedEmployees[employeeIndex].tasks[taskIndex].title = updatedTaskTitle;

//         // Update the task in the backend
//         try {
//           await fetch('http://localhost:3001/updateTask', {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               employeeName: employees[employeeIndex].name,
//               taskIndex,
//               newTitle: updatedTaskTitle,
//             }),
//           });
//         } catch (error) {
//           console.error('Error updating task in the backend:', error);
//         }
//       }
//     }

//     setEmployees(updatedEmployees);
//   };

//   const handleMarkAsCompleted = async (employeeIndex, taskIndex) => {
//     const updatedEmployees = [...employees];
//     updatedEmployees[employeeIndex].tasks[taskIndex].status = 'completed';

//     setEmployees(updatedEmployees);

//     // Update the task status in the backend
//     try {
//       await fetch('http://localhost:3001/updateTaskStatus', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           employeeName: employees[employeeIndex].name,
//           taskIndex,
//           newStatus: 'completed',
//         }),
//       });
//     } catch (error) {
//       console.error('Error updating task status in the backend:', error);
//     }
//   };

//   const handleDeleteEmployee = async (employeeIndex) => {
//     const employeeNameToDelete = employees[employeeIndex].name;
//     const updatedEmployees = employees.filter((_, index) => index !== employeeIndex);
//     setEmployees(updatedEmployees);

//     // Delete the employee from the backend
//     try {
//       await fetch(`http://localhost:3001/deleteEmployee/${employeeNameToDelete}`, {
//         method: 'DELETE',
//       });
//     } catch (error) {
//       console.error('Error deleting employee from the backend:', error);
//     }
//   };

//   return (
//     <div className="manager-dashboard-container">
//       <h2>Manager Dashboard</h2>
//       <div className="manager-dashboard-content">
//         <form onSubmit={handleAddEmployee} className="employee-form">
//           <input
//             type="text"
//             placeholder="Employee Name"
//             value={newEmployeeName}
//             onChange={(e) => setNewEmployeeName(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Employee Tasks (comma-separated)"
//             value={newEmployeeTasks}
//             onChange={(e) => setNewEmployeeTasks(e.target.value)}
//           />
//           <button type="submit">Add Employee</button>
//         </form>

//         <div className="employee-list">
//           <h3>Employee List</h3>
//           {employees.length === 0 && <p>No employees added yet.</p>}
//           {employees.map((employee, employeeIndex) => (
//             <div key={employeeIndex} className="employee-item">
//               <h4 onClick={() => handleEdit(employeeIndex)}>{employee.name}</h4>
//               <h5>Tasks:</h5>
//               <ul>
//                 {employee.tasks.map((task, taskIndex) => (
//                   <li key={taskIndex}>
//                     {task.title} - <strong>{task.status}</strong>
//                     <button onClick={() => handleEdit(employeeIndex, taskIndex)}>Edit Task</button>
//                     {task.status === 'pending' && (
//                       <button onClick={() => handleMarkAsCompleted(employeeIndex, taskIndex)}>Mark as Completed</button>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//               <button className="delete-employee-btn" onClick={() => handleDeleteEmployee(employeeIndex)}>Delete Employee</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ManagerDashboard;
