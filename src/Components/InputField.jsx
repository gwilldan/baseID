// import React, { useState } from "react";
import PropTypes from "prop-types";

function InputField({ endAdornment, ...props }) {
  return (
    <div
      className=" h-14 md:h-16 justify-between bg-white 
        mt-6 flex
    "
    >
      <input
        type="text"
        className=" focus:outline-none md:text-xl w-[80%] px-5 flex items-center"
        placeholder=" Search Base names"
        {...props}
      />
      {endAdornment && (
        <div className=" flex items-center justify-between gap-2 px-2 md:px-3">
          {endAdornment}
        </div>
      )}
    </div>
  );
}

InputField.propTypes = {
  endAdornment: PropTypes.element,
};

export default InputField;
