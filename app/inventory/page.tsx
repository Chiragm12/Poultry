import React from "react";
import { Toaster } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const InventoryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster />
      <div className="container mx-auto px-4 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Inventory Management</h1>
          <p className="text-gray-600">Comprehensive view of farm inventory and resources</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Egg Inventory Card */}
          <Card>
            <CardHeader>
              <CardTitle>Egg Inventory</CardTitle>
              <CardDescription>Current egg stock levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Crack Eggs:</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span>Jumbo Eggs:</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span>Normal Eggs:</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>0</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Staff Inventory Card */}
          <Card>
            <CardHeader>
              <CardTitle>Staff Inventory</CardTitle>
              <CardDescription>Current employee count</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Employees:</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Staff:</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span>New This Month:</span>
                  <span className="font-semibold">0</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Equipment Inventory Card */}
          <Card>
            <CardHeader>
              <CardTitle>Equipment</CardTitle>
              <CardDescription>Farm equipment status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Feeders:</span>
                  <span className="font-semibold">25</span>
                </div>
                <div className="flex justify-between">
                  <span>Waterers:</span>
                  <span className="font-semibold">30</span>
                </div>
                <div className="flex justify-between">
                  <span>Nesting Boxes:</span>
                  <span className="font-semibold">50</span>
                </div>
                <div className="flex justify-between">
                  <span>Ventilation:</span>
                  <span className="font-semibold">8</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common inventory management tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold">Add Egg Record</h3>
                <p className="text-sm text-gray-600">Record new egg production</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold">Register Employee</h3>
                <p className="text-sm text-gray-600">Add new staff member</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold">Generate Report</h3>
                <p className="text-sm text-gray-600">View detailed reports</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InventoryPage; 