import React from "react";
import "./style.css";

const Input = ({ label, state, setState, placeholder, type, loading }) => {
  return (
    <div className="input-wrapper">
      <p className="label-input">{label}</p>
      <input
        className="custom-input"
        disabled={loading}
        type={type}
        value={state}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
      ></input>
    </div>
  );
};

export default Input;
