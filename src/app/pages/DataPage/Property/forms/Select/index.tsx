import React, { useState } from 'react';
import Label from 'app/components/Label';
import { IChangedParams } from '../..';

export type Option = { text: string; value: string };

interface ISelect {
  label: string;
  value: string;
  options: Option[];
  onParamsChange: (changedParams: IChangedParams) => void;
}

const Select = React.forwardRef<HTMLSelectElement, ISelect>((props, ref) => {
  const { value, label, options, onParamsChange } = props;
  const [_value, setValue] = useState(value);

  return (
    <>
      <Label htmlFor={label}>{label}</Label>
      <select
        name={label}
        value={_value}
        ref={ref}
        onChange={e => {
          const value = e.target.value;
          setValue(value);
          onParamsChange({ label, value });
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
