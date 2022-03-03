import React from 'react';
import styled from 'styled-components';
import { useStoreState } from 'react-flow-renderer';

const Header = () => {
  // saga flow 에서 가공해야함. 일단은 실행하는것 먼저 구현
  const unprocessedNodes = useStoreState(store => store.nodes);
  const unproccedEdges = useStoreState(store => store.edges);
  const runDag = () => {
    const nodes = unprocessedNodes.map(node => {
      return {
        id: node.id,
        moduleType: node.type,
        position: node.position,
        data: { label: node.data.label, params: node.data.params },
      };
    });

    const edges = unproccedEdges.map(edge => {
      return {
        sourcePort: {
          nodeId: edge.source,
          portType: edge.sourceHandle,
        },
        targetPort: {
          nodeId: edge.target,
          portType: edge.targetHandle,
        },
      };
    });
    console.log({ nodes, edges });
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
