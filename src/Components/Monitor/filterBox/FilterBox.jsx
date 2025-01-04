import React from 'react';
import './FilterBox.css';

function FilterBox() {
  return (
    <div className="filter-box">
      <label htmlFor="operator" className="label">
        Operator
      </label>
      <select name="operator" id="operator" className="select">
        <option value="all" defaultChecked>
          All
        </option>
        <option value="operator1">Operator 1</option>
        <option value="operator2">Operator 2</option>
        <option value="operator3">Operator 3</option>
        <option value="operator4">Operator 4</option>
      </select>
    </div>
  );
}

export default FilterBox;
