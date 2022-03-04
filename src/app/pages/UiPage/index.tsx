import React from 'react';
import styled from 'styled-components';
import Widget from './Widget';
import UiCanvas from './UiCanvas';
import Property from './Property';

const UiPage = () => {
  return (
    <Container>
      <Widget />
      <UiCanvas />
      <Property />
    </Container>
  );
};

export default UiPage;

const Container = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: row;
`;
