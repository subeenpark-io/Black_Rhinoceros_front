import React from 'react';
import styled from 'styled-components';
import SelectPath from 'app/components/SelectPath';

const Widget = () => {
  return (
    <Aside>
      <SelectPath />
    </Aside>
  );
};

export default Widget;

const Aside = styled.aside`
  border-right: 1px solid #eee;
  padding: 15px 10px;
  font-size: 15px;
  background: #fcfcfc;
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 200px;
`;
