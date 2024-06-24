import React from "react";
import { color, scale } from "../variables";

const ObservableComponent = React.forwardRef(
  ({ onChange, onKeyPress, placeholder, type, label, field, form}, ref) => (
    <div style={{ display: "flex", flexDirection: "column"}}>
      {label && (
        <label style={{fontWeight: 700, marginBottom: `${scale.s2}rem`}}>
          {label}
        </label>
      )}
      <input
        {...field}
        ref={ref}
        style={{
          borderRadius: `${scale.s1}rem`,
          border: `1px solid ${color.lightGrey}`,
          padding: `${scale.s3}rem`,
          marginBottom: `${scale.s3}rem`
        }}
        onChange={changeEvent => {
          form.setFieldValue(field.name, changeEvent.target.value);
          onChange(changeEvent.target.value);
        }}
        onKeyPress={onKeyPress}
        placeholder={placeholder ? placeholder : "..."}
        type={type ? type: "text"}
        />
    </div>
  ));

export default ObservableComponent;