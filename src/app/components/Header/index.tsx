import React from 'react';
import styled from 'styled-components';
import { useStoreState } from 'react-flow-renderer';
import { useDatapageSlice } from 'app/pages/DataPage/slice';
import { useAppDispatch } from 'app/hooks/useRedux';

const Header = () => {
  const nodes = useStoreState(store => store.nodes);
  const edges = useStoreState(store => store.edges);

  const { actions } = useDatapageSlice();
  const dispatch = useAppDispatch();

  const runDag = () => {
    dispatch(
      actions.tyrRunDagRequest({
        id: '',
        name: 'test',
        nodes,
        edges,
      }),
    );
  };

  return (
    <Container>
      <LeftWrapper />
      <RightWrapper>
        <Button onClick={runDag}>Run</Button>
      </RightWrapper>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px #eee solid;
  background: #fcfcfc;
`;

const LeftWrapper = styled.div`
  width: 100%;
`;

const RightWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Button = styled.button`
  width: 70px;
  height: 30px;
  border-radius: 4px;
`;
