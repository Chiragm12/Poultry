"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Employee {
  id: string;
  full_name: string;
  age: number;
  salary: number;
  work_employed_to_do: string;
  aadhar_number: string;
  phone_number: string;
  gender: string;
  marital_status: string;
  created_at: string;
}

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/form');
      
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      
      const data = await response.json();
      setEmployees(data.employees || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error("Failed to load employee data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Employee Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Employee Records</CardTitle>
          <CardDescription>
            {employees.length} employee{employees.length !== 1 ? 's' : ''} registered
          </CardDescription>
        </div>
        <Button onClick={fetchEmployees} variant="outline">
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {employees.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No employees registered yet. Submit the form to see data here.
          </div>
        ) : (
          <div className="space-y-4">
            {employees.map((employee) => (
              <div key={employee.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{employee.full_name}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(employee.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Age:</span> {employee.age}
                  </div>
                  <div>
                    <span className="font-medium">Salary:</span> ₹{employee.salary.toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">Gender:</span> {employee.gender}
                  </div>
                  <div>
                    <span className="font-medium">Marital Status:</span> {employee.marital_status}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span> {employee.phone_number}
                  </div>
                  <div>
                    <span className="font-medium">Aadhar:</span> {employee.aadhar_number}
                  </div>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Work Description:</span> {employee.work_employed_to_do}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmployeeList;
