import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStoreState } from 'react-flow-renderer';
import { useDatapageSlice } from 'app/pages/DataPage/slice';
import { useAppDispatch, useAppSelector } from 'app/hooks/useRedux';
import { useGlobalSlice } from 'app/pages/App/slice';

const SelectUser = () => {
  const { actions } = useGlobalSlice();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(state => state.global);

  const [value, setValue] = useState(currentUser);

  return (
    <Select
      value={value}
      onChange={e => {
        const user = e.target.value;
        setValue(user);
        dispatch(actions.changeUser(user));
      }}
    >
      <option value={'user1'}>User 1</option>
      <option value={'user2'}>User 2</option>
      <option value={'user3'}>User 3</option>
    </Select>
  );
};

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
        <SelectUser />
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

const Select = styled.select`
  margin-left: 20px;
`;
