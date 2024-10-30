"use client";

import PropTypes from "prop-types";
import "../globals.css";

export default function WeeeSelect({
  weeeinputlabel,
  value,
  onValueChange = () => {},
  placeholder = "",
  required = false,
  btndisabled = false,
  small = false,
  selectData = [],
}) {
  return (
    <div className="mb-2">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {weeeinputlabel}
      </label>
      <select
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full ${
          small ? "p-2.5" : "p-4"
        }`}
        value={value}
        required={required}
        disabled={btndisabled}
        onChange={(e) => onValueChange(e.target.value)}
      >
        <option value="" disabled selected>
          {placeholder}
        </option>
        {selectData.map((element, index) => (
          <option key={index} value={element.key}>
            {element.label}
          </option>
        ))}
      </select>
    </div>
  );
}

WeeeSelect.propTypes = {
  weeeinputlabel: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  btndisabled: PropTypes.bool,
  small: PropTypes.bool,
  selectData: PropTypes.array,
};
