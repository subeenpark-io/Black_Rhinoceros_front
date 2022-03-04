import React from 'react';
import Input from './Input';
import Select from './Select';
import DataUpload from './DataUpload';

const takeForm = ({ formType, label, value, onChange, options, id }) => {
  switch (formType) {
    case 'input':
      return (
        <Input
          key={label + id}
          label={label}
          value={value}
          onChange={onChange}
        />
      );
    case 'select':
      return (
        <Select
          key={label + id}
          label={label}
          value={value}
          onChange={onChange}
          options={options}
        />
      );
    case 'upload':
      return (
        <DataUpload
          key={label + id}
          label={label}
          value={value}
          onChange={onChange}
        />
      );
    default:
      return;
  }
};

export default takeForm;
