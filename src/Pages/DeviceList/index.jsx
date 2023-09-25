import React from 'react';
import ModalForm from '../../Components/ModalForm';
import AddDeviceModal from '../../Utils/AddDeviceModal';

function index() {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-semibold border-l-4 border-l-black">Device List</h1>
        <AddDeviceModal>
          <ModalForm />
        </AddDeviceModal>
      </div>
      <div></div>
    </div>
  );
}

export default index;
