import React from "react";
import { Toaster } from "sonner";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

const PoultryFarmDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster />
      <div className="container mx-auto px-4 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Poultry Farm Management</h1>
          <p className="text-gray-600">Employee registration and management system</p>
        </div>
        
        <EmployeeForm />
        <EmployeeList />
      </div>
    </div>
  );
};

export default PoultryFarmDashboard;
// This code defines a React component for a Poultry Farm Dashboard, including a header, quick actions, and data overview sections.
// It uses Tailwind CSS for styling and includes SVG icons for visual elements.
// The dashboard is designed to be responsive and visually appealing, with a focus on farm management tasks