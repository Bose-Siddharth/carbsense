import React, { useState, cloneElement } from 'react';
import { BsPlusSquareDotted } from 'react-icons/bs';

// eslint-disable-next-line react/prop-types
function AddDeviceModal({ children }) {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const renderChildren = () => {
    return React.Children.map(children, (child) => cloneElement(child, { visible, handleClose }));
  };

  return (
    <div>
      <button
        onClick={handleVisible}
        className="flex items-center gap-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <BsPlusSquareDotted className="text-xl" /> Add Device{' '}
      </button>
      {renderChildren()}
    </div>
  );
}

export default AddDeviceModal;
