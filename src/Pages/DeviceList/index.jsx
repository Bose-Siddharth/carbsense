import React, { useEffect, useState } from 'react';
import ModalForm from '../../Components/ModalForm';
import AddDeviceModal from '../../Utils/AddDeviceModal';
import Topbar from '../../Components/Topbar';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';

function Index() {
  const [searchCategory, setSearchCategory] = useState('ID');
  const [searchInput, setSearchInput] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows to 5
  const [currentPage, setCurrentPage] = useState(1);
  const [editData, setEditData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [deviceStatuses, setDeviceStatuses] = useState([]); // State to store the backend data
  const navigate = useNavigate();
  const { sendGetRequest } = useHttp();

  // Fetch device data from backend
  const fetchDeviceData = async () => {
    try {
      const response = await sendGetRequest(`dashboard`);
      console.log(response);
      setDeviceStatuses(response.deviceStatuses || []); // Store the fetched data in the state
    } catch (error) {
      console.error('Error fetching device data:', error);
    }
  };

  useEffect(() => {
    fetchDeviceData();
  }, []);

  // Filter logic for search and status
  const filteredData = deviceStatuses.filter((item) => {
    const matchesSearch =
      searchCategory === 'ID'
        ? item.device_id.toLowerCase().includes(searchInput.toLowerCase())
        : item.zone ? item.zone.toLowerCase().includes(searchInput.toLowerCase()) : false; // Assuming zone is optional in backend
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
          maxHeight: rowsPerPage === deviceStatuses.length ? '75vh' : '70vh',
        }}>
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 w-1/5">Device ID</th>
              <th className="p-4 w-2/5">Status</th>
              <th className="p-4 w-1/5">Zone</th> {/* New Zone column */}
              <th className="p-4 w-1/5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}>
                  <td className="p-4">{item.device_id}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        item.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">{`zone-${index + 1}`}</td> {/* New Zone value */}
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
                      <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => {
                          navigate(`/monitor/${item.device_id}`);
                        }}>
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
          <option value={deviceStatuses.length}>Show All</option>
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
