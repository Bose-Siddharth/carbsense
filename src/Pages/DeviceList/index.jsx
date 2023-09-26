import React from 'react';
import ModalForm from '../../Components/ModalForm';
import AddDeviceModal from '../../Utils/AddDeviceModal';
import Topbar from '../../Components/Topbar';

function index() {
  return (
    <div>
      <div className="flex justify-between">
        <Topbar header="Device List" notification="false" back="true" />
        <AddDeviceModal>
          <ModalForm />
        </AddDeviceModal>
      </div>
      <div></div>
    </div>
  );
}

export default index;
