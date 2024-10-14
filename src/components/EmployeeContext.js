import React, { createContext, useState, useEffect } from 'react';
export const EmployeeContext = createContext();
export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('employees');
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });
  const [loggedInEmployee, setLoggedInEmployee] = useState(null);
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);
  return (
    <EmployeeContext.Provider value={{ employees, setEmployees, loggedInEmployee, setLoggedInEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};
