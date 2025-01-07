import React, { useState } from 'react';
import ModalForm from '../../Components/ModalForm';
import AddDeviceModal from '../../Utils/AddDeviceModal';
import Topbar from '../../Components/Topbar';

// Sample data
const data = [
  { id: 'A1B2C3', status: 'Active', zone: 'New York' },
  { id: 'D4E5F6', status: 'Inactive', zone: 'Los Angeles' },
  { id: 'G7H8I9', status: 'Active', zone: 'San Francisco' },
  { id: 'J1K2L3', status: 'Inactive', zone: 'Seattle' },
  { id: 'M4N5O6', status: 'Inactive', zone: 'Chicago' },
  { id: 'P7Q8R9', status: 'Active', zone: 'Austin' },
  { id: 'S1T2U3', status: 'Active', zone: 'Boston' },
  { id: 'V4W5X6', status: 'Inactive', zone: 'Miami' },
  { id: 'Y7Z8A9', status: 'Active', zone: 'Dallas' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' },
  { id: 'B1C2D3', status: 'Inactive', zone: 'Denver' }
];

function Index() {
  const [searchCategory, setSearchCategory] = useState('ID');
  const [searchInput, setSearchInput] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows to 5
  const [currentPage, setCurrentPage] = useState(1);
  const [editData, setEditData] = useState([]);
  const [editClick, setEditClick] = useState(false);

  // Filter logic for search and status
  const filteredData = data.filter((item) => {
    const matchesSearch =
      searchCategory === 'ID'
        ? item.id.toLowerCase().includes(searchInput.toLowerCase())
        : item.zone.toLowerCase().includes(searchInput.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' || item.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-4">
      {/* Topbar */}
      <div className="flex justify-between items-center mb-4">
        <Topbar header="Device List" notification="false" back="true" />
        <AddDeviceModal>
          <ModalForm />
        </AddDeviceModal>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-4">
        {/* Search Category Dropdown */}
        <select
          className="border rounded-lg p-2 w-full max-w-xs"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}>
          <option value="ID">Search by ID</option>
          <option value="Zone">Search by Zone</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder={`Search by ${searchCategory}`}
          className="border rounded-lg p-2 w-full max-w-xs"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        {/* Status Filter */}
        <select
          className="border rounded-lg p-2 w-full max-w-xs"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Scrollable Table */}
      <div
        className="border rounded-lg overflow-auto"
        style={{
          maxHeight: rowsPerPage === data.length ? '75vh' : '70vh' // '100vh' for "Show All", 24rem for other cases
        }}>
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 w-1/5">ID</th>
              <th className="p-4 w-2/5">Zone</th>
              <th className="p-4 w-1/5 text-center">Status</th>
              <th className="p-4 w-1/5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}>
                  <td className="p-4">{item.id}</td>
                  <td className="p-4">{item.zone}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        item.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-4">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => {
                          console.log(item);
                          setEditData(item);
                          setEditClick(true);
                        }}>
                        Edit
                      </button>
                      <button className="bg-gray-500 text-white px-4 py-2 rounded-lg">
                        View More
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <button
            className="px-4 py-2 border rounded-lg"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}>
            Previous
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            className="px-4 py-2 border rounded-lg"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
        <select
          className="border rounded-lg p-2"
          value={rowsPerPage}
          onChange={(e) => {
            const newRowsPerPage = parseInt(e.target.value, 10);
            setRowsPerPage(newRowsPerPage);
            setCurrentPage(1); // Reset to first page
          }}>
          <option value={data.length}>Show All</option>
          <option value="5">Show 5</option>
          <option value="10">Show 10</option>
          <option value="15">Show 15</option>
        </select>
      </div>

      {editClick && (
        <ModalForm
          visible={editClick}
          editData={editData}
          handleClose={() => {
            setEditClick(false);
          }}
        />
      )}
    </div>
  );
}

export default Index;
