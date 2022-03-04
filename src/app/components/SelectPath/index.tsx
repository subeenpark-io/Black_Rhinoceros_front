import React from 'react';
import { useHistory } from 'react-router-dom';

const SelectPath = () => {
  const history = useHistory();
  const value = window.location.pathname;

  return (
    <select
      value={value}
      onChange={e => {
        const path = e.target.value;
        history.push(`${path}`);
      }}
    >
      <option value={'/data'}>Data</option>
      <option value={'/ui'}>UI Widgets</option>
    </select>
  );
};

export default SelectPath;
