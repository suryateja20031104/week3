// import React, { useEffect, useState } from 'react';
// import './EmployeeDashboard.css';

// function EmployeeDashboard() {
//   const [employee, setEmployee] = useState(null);
//   useEffect(() => {
//     const employees = JSON.parse(localStorage.getItem('employees'));
//     if (employees && employees.length > 0) {
//       setEmployee(employees[0]);
//     }
//   }, []);

//   return (
//     <div className="employee-dashboard-container">
//       <h2>Employee Dashboard</h2>
//       {employee ? (
//         <>
//           <h3>Welcome, {employee.name}</h3>
//           <h4>Your Tasks:</h4>
//           <ul>
//             {employee.tasks.map((task, index) => (
//               <li key={index}>
//                 {task.title} - <strong>{task.status}</strong>
//               </li>
//             ))}
//           </ul>
//         </>
//       ) : (
//         <p>No employee details available.</p>
//       )}
//     </div>
//   );
// }

// export default EmployeeDashboard;

import React, { useState } from 'react';
import './EmployeeDashboard.css';

function EmployeeDashboard() {
  const [employeeName, setEmployeeName] = useState('');
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchEmployeeTasks = async () => {
    if (!employeeName.trim()) {
      setError("Please enter a valid employee name.");
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:3001/getEmployeeTasks/${employeeName}`);
      if (response.ok) {
        const data = await response.json();
        setEmployee(data);
        setError(null); // Reset any previous errors
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Employee not found");
        setEmployee(null); // Clear the employee data on error
      }
    } catch (error) {
      setError("An error occurred while fetching the data.");
      console.error("Error fetching employee tasks:", error);
    }
  };

  return (
    <div className="employee-dashboard-container">
      <h2>Employee Dashboard</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={employeeName}
        onChange={(e) => setEmployeeName(e.target.value)}
      />
      <button onClick={handleFetchEmployeeTasks}>Fetch Tasks</button>

      {error && <p className="error">{error}</p>}

      {employee ? (
        <>
          <h3>Welcome, {employee.name}</h3>
          <h4>Your Tasks:</h4>
          <ul>
            {employee.tasks.map((task, index) => (
              <li key={index}>
                {task.title} - <strong>{task.status}</strong>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No employee details available.</p>
      )}
    </div>
  );
}

export default EmployeeDashboard;
