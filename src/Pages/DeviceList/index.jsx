import React from 'react';
import ModalForm from '../../Components/ModalForm';
import AddDeviceModal from '../../Utils/AddDeviceModal';
import Topbar from '../../Components/Topbar';

function index() {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex-1 mr-5">
          <Topbar header="Device List" notification="false" back="true" />
        </div>
        <AddDeviceModal>
          <ModalForm />
        </AddDeviceModal>
      </div>
      <div></div>
    </div>
  );
}

export default index;
