import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

function index({ visible, handleClose }) {
  if (!visible) return null;

  const initialForm = {
    deviceId: '',
    tankId: '',
    site: '',
    tankDepth: '',
    tankCapacity: '',
    liquidType: '',
    currentLevel: ''
  };

  const notify = () => toast.success('Device added successfully!');

  const [form, setForm] = React.useState(initialForm);

  // eslint-disable-next-line no-unused-vars
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    setForm(initialForm);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-10">
        <div className="flex justify-between items-center p-5 border-b-2 border-gray-800">
          <h1 className="text-xl font-semibold">Add Device</h1>
        </div>
        <div className="mt-5">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Device ID</label>
                <input
                  type="text"
                  className="border-2 border-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  onChange={handleChange}
                  name="deviceId"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Tank ID</label>
                <input
                  type="text"
                  className="border-2 border-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  onChange={handleChange}
                  name="tankId"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Site</label>
                <input
                  type="text"
                  className="border-2 border-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  onChange={handleChange}
                  name="site"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Tank Depth</label>
                <input
                  type="text"
                  className="border-2 border-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  onChange={handleChange}
                  name="tankDepth"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Tank Capacity</label>
                <input
                  type="text"
                  className="border-2 border-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  onChange={handleChange}
                  name="tankCapacity"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Liquid Type</label>
                <input
                  type="text"
                  className="border-2 border-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  onChange={handleChange}
                  name="liquidType"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Current Level</label>
              <input
                type="text"
                className="border-2 border-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                name="currentLevel"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={notify}
                disabled={Object.values(form).some((item) => item === '') ? true : false}
                style={{ transition: 'all 0.2s ease-in-out' }}
              >
                Add Device
              </button>
            </div>
          </form>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
        <button
          type="button"
          className="absolute top-0 right-0 p-1 m-2 bg-white rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
          onClick={handleClose}
        >
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default index;
