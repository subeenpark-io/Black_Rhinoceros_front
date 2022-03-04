import React from 'react';
import styled from 'styled-components';

const Property = () => {
  return (
    <Aside>
      <div>
        <strong>Property</strong>
      </div>
    </Aside>
  );
};

export default Property;

const Aside = styled.aside`
  border-left: 1px solid #eee;
  padding: 15px 10px;
  font-size: 14px;
  background: #fcfcfc;
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 300px;
`;
