import React from "react";
import { Toaster } from "sonner";
import EggForm from "../components/EggForm";
import EggList from "../components/EggList";

const ProductionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster />
      <div className="container mx-auto px-4 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Egg Production Management</h1>
          <p className="text-gray-600">Track and manage egg inventory and production data</p>
        </div>
        <EggForm />
        <EggList />
      </div>
    </div>
  );
};

export default ProductionPage; 