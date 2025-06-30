import React from "react";
import { Toaster } from "sonner";
import DashboardPage from "./dashboard/dashboard";

const PoultryFarmDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <DashboardPage />
    </div>
  );
};

export default PoultryFarmDashboard;
