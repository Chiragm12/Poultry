import React from "react";
import { Toaster } from "sonner";
import EmployeeManagement from "./employees";

const EmployeesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <EmployeeManagement />
    </div>
  );
};

export default EmployeesPage; 