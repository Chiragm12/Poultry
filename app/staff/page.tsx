import React from "react";
import { Toaster } from "sonner";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

const StaffPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster />
      <div className="container mx-auto px-4 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Staff Management</h1>
          <p className="text-gray-600">Employee registration and management system</p>
        </div>
        <EmployeeForm />
        <EmployeeList />
      </div>
    </div>
  );
};

export default StaffPage; 