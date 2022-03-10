import React from 'react';
import Input from './Input';
import Select from './Select';
import DataUpload from './DataUpload';
import MultiSelect from './MultiSelect';

const takeForm = ({ formType, label, value, onParamsChange, options, id }) => {
  switch (formType) {
    case 'input':
      return (
        <Input
          key={label + id}
          label={label}
          value={value}
          onParamsChange={onParamsChange}
        />
      );
    case 'select':
      return (
        <Select
          key={label + id}
          label={label}
          value={value}
          onParamsChange={onParamsChange}
          options={options}
        />
      );
    case 'upload':
      return (
        <DataUpload
          key={label + id}
          label={label}
          value={value}
          onParamsChange={onParamsChange}
        />
      );
    case 'multiSelect':
      return (
        <MultiSelect
          key={label + id}
          label={label}
          value={value}
          onParamsChange={onParamsChange}
          options={options}
        />
      );
    default:
      return <div key={label + id}>no component for this formType</div>;
  }
};

export default takeForm;
