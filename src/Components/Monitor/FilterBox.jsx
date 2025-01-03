import React from 'react';

function FilterBox() {
  return (
    <div className="bg-white w-72 h-32 flex items-center pr-10 rounded-lg">
      <label htmlFor="operator" className="font-semibold fixed ml-5 mb-2 -mt-14">
        Operator
      </label>
      <select
        name="operator"
        id="operator"
        className="relative -mt-0 ml-10 w-full h-10 bg-white border-2 rounded-lg hover:border-blue-500">
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
