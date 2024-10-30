"use client";

import PropTypes from "prop-types";
import "../globals.css";

export default function WeeeInputs({
  weeeinputlabel,
  value,
  onValueChange = () => {},
  placeholder = "",
  inputtype = "text",
  required = false,
  btndisabled = false,
  small = false,
}) {
  return (
    <div className="mb-2">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {weeeinputlabel}
      </label>
      <input
        type={inputtype}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full ${
          small ? "p-2.5" : "p-4"
        }`}
        placeholder={placeholder}
        required={required}
        value={value}
        disabled={btndisabled}
        onChange={(e) => onValueChange(e.target.value)}
      />
    </div>
  );
}

WeeeInputs.propTypes = {
  weeeinputlabel: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func,
  inputtype: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  btndisabled: PropTypes.bool,
  small: PropTypes.bool,
};
