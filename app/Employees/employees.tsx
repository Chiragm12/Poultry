import React, { useState } from "react";

const EmployeeManagement = () => {
  const [currentPage, setCurrentPage] = useState("employees");
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Emily Carter",
      role: "Farm Supervisor",
      contact: "emily.carter@email.com",
      salary: "$60,000",
      attendance: "Present",
    },
    {
      id: 2,
      name: "David Lee",
      role: "Farm Technician",
      contact: "david.lee@email.com",
      salary: "$45,000",
      attendance: "Absent",
    },
    {
      id: 3,
      name: "Sarah Jones",
      role: "Egg Collector",
      contact: "sarah.jones@email.com",
      salary: "$35,000",
      attendance: "Present",
    },
    {
      id: 4,
      name: "Michael Brown",
      role: "Maintenance",
      contact: "michael.brown@email.com",
      salary: "$40,000",
      attendance: "Present",
    },
    {
      id: 5,
      name: "Jessica Wilson",
      role: "Quality Control",
      contact: "jessica.wilson@email.com",
      salary: "$50,000",
      attendance: "Absent",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    contact: "",
    salary: "",
    attendance: "Present"
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddEmployee = () => {
    if (formData.name && formData.role && formData.contact && formData.salary) {
      const newEmployee = {
        id: employees.length + 1,
        ...formData
      };
      setEmployees([...employees, newEmployee]);
      setFormData({ name: "", role: "", contact: "", salary: "", attendance: "Present" });
      setShowAddForm(false);
    }
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee.id);
    setFormData({
      name: employee.name,
      role: employee.role,
      contact: employee.contact,
      salary: employee.salary,
      attendance: employee.attendance
    });
    setShowAddForm(true);
  };

  const handleUpdateEmployee = () => {
    setEmployees(employees.map(emp => 
      emp.id === editingEmployee 
        ? { ...emp, ...formData }
        : emp
    ));
    setFormData({ name: "", role: "", contact: "", salary: "", attendance: "Present" });
    setShowAddForm(false);
    setEditingEmployee(null);
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const toggleAttendance = (id) => {
    setEmployees(employees.map(emp =>
      emp.id === id
        ? { ...emp, attendance: emp.attendance === "Present" ? "Absent" : "Present" }
        : emp
    ));
  };

  const navItems = [
    { label: "Dashboard", page: "dashboard" },
    { label: "Inventory", page: "inventory" },
    { label: "Production", page: "production" },
    { label: "Employees", page: "employees" },
    { label: "Reports", page: "reports" },
  ];

  const renderDashboard = () => (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Employees</h3>
          <p className="text-3xl font-bold text-blue-600">{employees.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Present Today</h3>
          <p className="text-3xl font-bold text-green-600">
            {employees.filter(emp => emp.attendance === "Present").length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Absent Today</h3>
          <p className="text-3xl font-bold text-red-600">
            {employees.filter(emp => emp.attendance === "Absent").length}
          </p>
        </div>
      </div>
    </div>
  );

  const renderEmployees = () => (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#0d0f1c] tracking-light text-[32px] font-bold leading-tight">Employee Management</p>
            <p className="text-[#47569e] text-sm font-normal leading-normal">
              Manage employee records, roles, contact information, and salary details. Track daily attendance and update salaries and roles as needed.
            </p>
          </div>
          <button 
            onClick={() => {
              setShowAddForm(true);
              setEditingEmployee(null);
              setFormData({ name: "", role: "", contact: "", salary: "", attendance: "Present" });
            }}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#e6e9f4] text-[#0d0f1c] text-sm font-medium leading-normal hover:bg-[#d1d5e8] transition-colors"
          >
            <span className="truncate">Add Employee</span>
          </button>
        </div>

        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-bold mb-4">
                {editingEmployee ? "Edit Employee" : "Add New Employee"}
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="email"
                  name="contact"
                  placeholder="Email"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="salary"
                  placeholder="Salary (e.g., $50,000)"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <select
                  name="attendance"
                  value={formData.attendance}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  onClick={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  {editingEmployee ? "Update" : "Add"} Employee
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingEmployee(null);
                    setFormData({ name: "", role: "", contact: "", salary: "", attendance: "Present" });
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <h2 className="text-[#0d0f1c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Employee Records
        </h2>

        <div className="px-4 py-3">
          <div className="flex overflow-hidden rounded-lg border border-[#ced2e9] bg-[#f8f9fc] overflow-x-auto">
            <table className="flex-1 min-w-full">
              <thead>
                <tr className="bg-[#f8f9fc]">
                  {["Name", "Role", "Contact", "Salary", "Attendance", "Actions"].map((head, index) => (
                    <th
                      key={index}
                      className={`px-4 py-3 text-left text-[#0d0f1c] text-sm font-medium leading-normal ${
                        index < 4 ? "w-[400px]" : "w-60"
                      }`}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id} className="border-t border-t-[#ced2e9]">
                    <td className="px-4 py-2 w-[400px] text-[#0d0f1c] text-sm font-normal">{emp.name}</td>
                    <td className="px-4 py-2 w-[400px] text-[#47569e] text-sm font-normal">{emp.role}</td>
                    <td className="px-4 py-2 w-[400px] text-[#47569e] text-sm font-normal">{emp.contact}</td>
                    <td className="px-4 py-2 w-[400px] text-[#47569e] text-sm font-normal">{emp.salary}</td>
                    <td className="px-4 py-2 w-60 text-sm font-normal">
                      <button 
                        onClick={() => toggleAttendance(emp.id)}
                        className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 text-sm font-medium w-full transition-colors ${
                          emp.attendance === "Present" 
                            ? "bg-green-100 text-green-800 hover:bg-green-200" 
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        <span className="truncate">{emp.attendance}</span>
                      </button>
                    </td>
                    <td className="px-4 py-2 w-60">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditEmployee(emp)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <span className="text-gray-400">|</span>
                        <button 
                          onClick={() => handleDeleteEmployee(emp.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOtherPages = (pageName) => (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 capitalize">{pageName}</h1>
      <p className="text-gray-600">This is the {pageName} page. Content coming soon...</p>
    </div>
  );

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return renderDashboard();
      case "employees":
        return renderEmployees();
      default:
        return renderOtherPages(currentPage);
    }
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#f8f9fc] group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e6e9f4] px-10 py-3">
          <div className="flex items-center gap-4 text-[#0d0f1c]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-[#0d0f1c] text-lg font-bold leading-tight tracking-[-0.015em]">
              Poultry Farm Manager
            </h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setCurrentPage(item.page)}
                  className={`text-sm font-medium leading-normal transition-colors ${
                    currentPage === item.page
                      ? "text-[#47569e] font-bold"
                      : "text-[#0d0f1c] hover:text-[#47569e]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#e6e9f4] text-[#0d0f1c] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z" />
              </svg>
            </button>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD-rZGmO0gM9IQVGR1tDZE6Mf1PZLrDJLJ37mszoBSpgAL7qXrLpX0y1G8PTkcmyo764yu7o-6yii3TCqp7gucmjPJJ_UTv_-yVKxxpZslgNI-obMugadhg12Mjz2zyi3C6SMCUGtkelulu3Wvkmte3_DvVbVyy_j0MvZqmNK2L2R73lyyyExeHfNrcgE6DnojTo3EUdy5GwK_Cn47JWCNxQr---3_Zy8xGMvDL22RWB8QphllTAW8Sxa1OSz5mkO4sMmulMx6WdwI")',
              }}
            ></div>
          </div>
        </header>

        {renderContent()}
      </div>
    </div>
  );
};

export default EmployeeManagement;