import React from 'react';
import './FilterBox.css';

function FilterBox() {
  return (
    <div className="filter-box">
      <label htmlFor="zone" className="label">
        Zone
      </label>
      <select name="zone" id="zone" className="select">
        <option value="all" defaultChecked>
          All
        </option>
        <option value="zone1">Zone 1</option>
        <option value="zone2">Zone 2</option>
        <option value="zone3">Zone 3</option>
        <option value="zone4">Zone 4</option>
      </select>
    </div>
  );
}

export default FilterBox;
