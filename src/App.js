import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSelection from './components/LoginSelection';
import ManagerLogin from './components/ManagerLogin';
import EmployeeLogin from './components/EmployeeLogin';
import ManagerDashboard from './components/ManagerDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import { EmployeeProvider } from './components/EmployeeContext';

function App() {
  return (
    <EmployeeProvider> {/* Wrap the entire Router with EmployeeProvider */}
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LoginSelection />} />
            <Route path="/manager-login" element={<ManagerLogin />} />
            <Route path="/employee-login" element={<EmployeeLogin />} />
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          </Routes>
        </div>
      </Router>
    </EmployeeProvider>
  );
}

export default App;
