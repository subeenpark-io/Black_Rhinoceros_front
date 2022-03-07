import React, { useState } from 'react';
import Label from 'app/components/Label';

const Input = ({ value, label, onParamsChange }) => {
  const [_value, setValue] = useState(value);

  return (
    <>
      <Label htmlFor={label}>{label}</Label>
      <input
        value={_value}
        name={label}
        onChange={e => {
          const value = e.target.value;
          setValue(value);
          onParamsChange({ label, value });
        }}
      />
    </>
  );
};

export default Input;