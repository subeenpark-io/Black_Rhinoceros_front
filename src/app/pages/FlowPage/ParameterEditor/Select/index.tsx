import React, { useState } from 'react';
import Label from 'app/components/Label';

export type Option = { text: string; value: string };

interface ISelect {
  label: string;
  value: string;
  options: Option[];
  onChange: ({ label, value }) => void;
}

const Select = React.forwardRef<HTMLSelectElement, ISelect>((props, ref) => {
  const { value, label, options, onChange } = props;
  const [_value, setValue] = useState(value);

  return (
    <>
      <Label htmlFor={label}>{label}</Label>
      <select
        name={label}
        value={_value}
        ref={ref}
        onChange={e => {
          const label = e.target.name;
          const value = e.target.value;
          setValue(value);
          onChange({ label, value });
        }}
      >
        {options.map(({ text, value }) => (
          <option key={`option_${value}`} value={value}>
            {text}
          </option>
        ))}
      </select>
    </>
  );
});
export default Select;
