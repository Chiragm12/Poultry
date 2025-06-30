import React from "react";
import { Toaster } from "sonner";
import DashboardLayout from "./report";

const ReportPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <DashboardLayout />
    </div>
  );
};

export default ReportPage; 