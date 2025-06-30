"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend
} from 'recharts';

interface Employee {
  id: string;
  full_name: string;
  age: number;
  salary: number;
  work_employed_to_do: string;
  phone_number: string;
  gender: string;
  marital_status: string;
  created_at: string;
}

interface EggRecord {
  id: string;
  crack_eggs: number;
  jumbo_eggs: number;
  normal_eggs: number;
  total_eggs: number;
  created_at: string;
}

const DashboardPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [eggRecords, setEggRecords] = useState<EggRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [employeesRes, eggsRes] = await Promise.all([
          fetch('/api/form'),
          fetch('/api/eggs')
        ]);
        let employeesList: Employee[] = [];
        let eggsList: EggRecord[] = [];
        if (employeesRes.ok) {
          const data = await employeesRes.json();
          employeesList = data.employees || [];
        }
        if (eggsRes.ok) {
          const data = await eggsRes.json();
          eggsList = data.records || [];
        }
        setEmployees(employeesList);
        setEggRecords(eggsList);
      } catch (e) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Metrics
  const totalEmployees = employees.length;
  const totalSalary = employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
  const attendancePercentage = totalEmployees > 0 ? Math.round((totalEmployees * 0.85) + Math.random() * 20) : 0;
  // Last 7 days egg production
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 6);
  const eggProductionData = (() => {
    const days: { [date: string]: number } = {};
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().split('T')[0];
      days[key] = 0;
    }
    eggRecords.forEach((egg) => {
      const key = new Date(egg.created_at).toISOString().split('T')[0];
      if (key in days) days[key] += egg.total_eggs;
    });
    return Object.entries(days).map(([date, total]) => ({ date, total }));
  })();
  const totalEggProduction = eggProductionData.reduce((sum, d) => sum + d.total, 0);
  // Attendance trend (simulate for 4 weeks)
  const attendanceTrendData = [
    { week: 'Week 1', present: Math.round(totalEmployees * 0.9), absent: Math.round(totalEmployees * 0.1) },
    { week: 'Week 2', present: Math.round(totalEmployees * 0.85), absent: Math.round(totalEmployees * 0.15) },
    { week: 'Week 3', present: Math.round(totalEmployees * 0.8), absent: Math.round(totalEmployees * 0.2) },
    { week: 'Week 4', present: Math.round(totalEmployees * 0.95), absent: Math.round(totalEmployees * 0.05) },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9fc]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#47569e] mx-auto mb-4"></div>
          <p className="text-[#47569e]">Loading dashboard data...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9fc]">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#f8f9fc] overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#e6e9f4] px-10 py-3">
          <div className="flex items-center gap-4 text-[#0d0f1c]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">FarmView</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9 text-sm font-medium">
              <Link href="/" className="text-[#0d0f1c]">Dashboard</Link>
              <Link href="#" className="text-[#0d0f1c]">Production</Link>
              <Link href="/employees" className="text-[#0d0f1c]">Employees</Link>
              <Link href="#" className="text-[#0d0f1c]">Inventory</Link>
              <Link href="/report" className="text-[#0d0f1c]">Reports</Link>
            </div>
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full size-10"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuB8uImWPxfNJZ3QGhGalqxYHirRF0GwWS757jG7XKQ6sI93z_3NRqBATMNQxASNLKoCJmUZseMUcHhuP81BRwF-WMrqG5qCZcTxeWZ5mAgKXEGA0tgnGl9GsjdiYbEmXnUZgK8sPd39HHfvtoVP0ER613e75bn_JVY4npI1FSaj9KZJ07xjwnwuHEh18frAJMThVDmJjcZdftFI6Gu0Y6xgmrjKVHpDSWxxcU3waHYKmGf7BzDfQIpEJueAo_Sky0j0D9Jp0L1BDgA")`,
              }}
            ></div>
          </div>
        </header>

        {/* Main Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[32px] font-bold leading-tight min-w-72 text-[#0d0f1c]">Dashboard</p>
            </div>

            {/* Cards */}
            <div className="flex flex-wrap gap-4 p-4">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#e6e9f4]">
                <p className="text-base font-medium">Total Employees</p>
                <p className="text-2xl font-bold">{totalEmployees}</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#e6e9f4]">
                <p className="text-base font-medium">Total Egg Production</p>
                <p className="text-2xl font-bold">{totalEggProduction.toLocaleString()}</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#e6e9f4]">
                <p className="text-base font-medium">Attendance Percentage</p>
                <p className="text-2xl font-bold">{attendancePercentage}%</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#e6e9f4]">
                <p className="text-base font-medium">Salary Breakdown</p>
                <p className="text-2xl font-bold">${totalSalary.toLocaleString()}</p>
              </div>
            </div>

            {/* Trend & Attendance */}
            <div className="flex flex-wrap gap-4 px-4 py-6">
              {/* Egg Production Trend */}
              <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-lg border border-[#ced2e9] p-6">
                <p className="text-base font-medium">Egg Production Trend</p>
                <p className="text-[32px] font-bold truncate">
                  {eggProductionData.length > 1 ? `${((eggProductionData[eggProductionData.length-1].total - eggProductionData[0].total) / (eggProductionData[0].total || 1) * 100).toFixed(1)}%` : '0%'}
                </p>
                <div className="flex gap-1">
                  <p className="text-[#47569e] text-base">Last 7 Days</p>
                  <p className="text-[#07883f] font-medium">
                    {eggProductionData.length > 1 ? `${((eggProductionData[eggProductionData.length-1].total - eggProductionData[0].total) / (eggProductionData[0].total || 1) * 100).toFixed(1)}%` : '0%'}
                  </p>
                </div>
                <div className="min-h-[180px] py-4">
                  <ResponsiveContainer width="100%" height={148}>
                    <LineChart data={eggProductionData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="total" stroke="#607afb" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Employee Attendance */}
              <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-lg border border-[#ced2e9] p-6">
                <p className="text-base font-medium">Employee Attendance</p>
                <p className="text-[32px] font-bold truncate">
                  {attendanceTrendData.length > 1 ? `${((attendanceTrendData[attendanceTrendData.length-1].present - attendanceTrendData[0].present) / (attendanceTrendData[0].present || 1) * 100).toFixed(1)}%` : '0%'}
                </p>
                <div className="flex gap-1">
                  <p className="text-[#47569e]">Last 4 Weeks</p>
                  <p className="text-[#e73c08] font-medium">
                    {attendanceTrendData.length > 1 ? `${((attendanceTrendData[attendanceTrendData.length-1].present - attendanceTrendData[0].present) / (attendanceTrendData[0].present || 1) * 100).toFixed(1)}%` : '0%'}
                  </p>
                </div>
                <div className="min-h-[180px] py-4">
                  <ResponsiveContainer width="100%" height={148}>
                    <BarChart data={attendanceTrendData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="present" fill="#607afb" name="Present" />
                      <Bar dataKey="absent" fill="#e6e9f4" name="Absent" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default DashboardPage;
