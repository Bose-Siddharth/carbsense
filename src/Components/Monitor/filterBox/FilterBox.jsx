import React from 'react';
import './FilterBox.css';

function FilterBox({ onChange }) {
  return (
    <div className="filter-box">
      <label htmlFor="view_option" className="label">
        View Options
      </label>
      <select
        name="view_option"
        id="view_option"
        className="select"
        onChange={onChange} // Bind onChange handler
      >
        <option value="view_option1">Live Sensor Data Monitor</option>
        <option value="view_option2">Generate Data Report</option>
        <option value="view_option3">Previous Reports</option>
      </select>
    </div>
  );
}


export default FilterBox;
