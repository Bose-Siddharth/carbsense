import React, { useState } from "react";
import ModalForm from "../../Components/ModalForm";
import AddDeviceModal from "../../Utils/AddDeviceModal";
import Topbar from "../../Components/Topbar";

// Sample data
const data = [
  {
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    title: "Regional Paradigm Technician",
    status: "Active",
    age: 27,
    role: "Admin",
  },
  {
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    title: "Product Directives Officer",
    status: "Inactive",
    age: 43,
    role: "Owner",
  },
  {
    name: "Esther Howard",
    email: "esther.howard@example.com",
    title: "Forward Response Developer",
    status: "Active",
    age: 32,
    role: "Member",
  },
  {
    name: "Jenny Wilson",
    email: "jenny.wilson@example.com",
    title: "Central Security Manager",
    status: "Inactive",
    age: 29,
    role: "Member",
  },
  {
    name: "Kristin Watson",
    email: "kristin.watson@example.com",
    title: "Lean Implementation Liaison",
    status: "Inactive",
    age: 36,
    role: "Admin",
  },
];

function Index() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");

  // Filter logic for search and role dropdown
  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole =
      role === "All" || item.status.toLowerCase() === role.toLowerCase();
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-4">
      {/* Topbar */}
      <div className="flex justify-between items-center mb-4">
        <Topbar header="Device List" notification="false" back="true" />
        <AddDeviceModal>
          <ModalForm />
        </AddDeviceModal>
      </div>

      {/* Search and Role Filters */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg p-2 w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded-lg p-2 w-full max-w-xs"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Scrollable Table */}
      <div className="border rounded-lg overflow-auto h-80">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4">Name</th>
              <th className="p-4">Title</th>
              <th className="p-4">Status</th>
              <th className="p-4">Age</th>
              <th className="p-4">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200`}
                >
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-300 mr-4"></div>
                      <div>
                        <div className="font-bold">{item.name}</div>
                        <div className="text-sm text-gray-500">
                          {item.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{item.title}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        item.status === "Active"
                          ? "bg-green-500"
                          : item.status === "Inactive"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">{item.age}</td>
                  <td className="p-4">{item.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p>Page 1 of 4</p>
        <select className="border rounded-lg p-2">
          <option value="5">Show 5</option>
          <option value="10">Show 10</option>
          <option value="15">Show 15</option>
        </select>
      </div>
    </div>
  );
}

export default Index;
