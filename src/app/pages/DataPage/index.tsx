import React, { useState, DragEvent, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  removeElements,
  Controls,
  OnLoadParams,
  Elements,
  Edge,
  Node,
  Connection,
  isEdge,
  isNode,
  ArrowHeadType,
  ReactFlowProps,
} from 'react-flow-renderer';
import styled from 'styled-components';
import NodeTypes from 'app/components/CustomNodes/util/nodeTypes';
import edgeTypes from 'app/components/CustomEdge/util/EdgeTypes';
import { portDarkening, portColoring, getId, getParams } from './uitl';
import Property from './Property';
import Widget from './Widget';
import { useDatapageSlice } from './slice';
import { useAppDispatch, useAppSelector } from 'app/hooks/useRedux';
import DagStateBar from './DagStateBar';
import { useGlobalSlice } from '../App/slice';
import { usePrevious } from 'app/hooks/usePrevious';

const initialElements = [];

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

const DataPage = () => {
  const { currentUser, users } = useAppSelector(state => state.global);

  const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
  const [elements, setElements] = useState<Elements>(users[currentUser]);

  const { actions } = useDatapageSlice();
  const dispatch = useAppDispatch();

  const {
    parameterForm,
    dagStatusLoading,
    elements: elementsToSync,
  } = useAppSelector(state => state.datapage);

  useEffect(() => {
    dispatch(actions.setElements(elements));
  }, [elements]);

  // 유저 select 할때 elements 상태 저장
  const { actions: globalActions } = useGlobalSlice();
  const prevUser = usePrevious(currentUser) || 'user1';
  useEffect(() => {
    // 유저를 select 할 때 이전 유저의 elements 저장
    dispatch(globalActions.setUserData({ elements, user: prevUser }));

    // 선택한 유저 elements 불러오기
    setElements(users[currentUser]);
  }, [currentUser]);

  // 노드, 엣지 추가 될때 elements 상태 저장
  useEffect(() => {
    dispatch(
      globalActions.setUserData({
        elements: elementsToSync,
        user: currentUser,
      }),
    );
  }, [elementsToSync]);

  useEffect(() => {
    dispatch(actions.fetchParamFormRequest());
  }, []);

  const onElementsRemove = (elementsToRemove: Elements) => {
    const removedElements = removeElements(elementsToRemove, elements);

    const portColoredElements = portDarkening(removedElements);
    setElements(portColoredElements);
  };

  const onLoad = (_reactFlowInstance: OnLoadParams) =>
    setReactFlowInstance(_reactFlowInstance);

  const onConnect = (params: Edge | Connection) => {
    const nodes = elements.filter(ele => isNode(ele)) as Node[];
    const edges = elements.filter(ele => isEdge(ele)) as Edge[];

    // 출발하는 노드와 도착하는 노드가 같다면 취소
    if (params.source === params.target) return;

    // 연결하려고 하는 포트가 연결 되어 있는 포트라면 해당하는 엣지 삭제
    const paramsSourceId = (params.source as string) + params.sourceHandle;
    const paramsTargetId = (params.target as string) + params.targetHandle;

    const removedEdges = edges.filter(edge => {
      if (edge.source + edge.sourceHandle === paramsSourceId) {
        return false;
      }
      if (edge.target + edge.targetHandle === paramsTargetId) {
        return false;
      }
      return true;
    });

    // 엣지는 params로 커스텀한다.
    const customizedParams = {
      ...params,
      type: 'custom',
      arrowHeadType: ArrowHeadType.ArrowClosed,
    };
    const edgeAddedElements = addEdge(customizedParams, [
      ...nodes,
      ...removedEdges,
    ]);

    const portColoredElements = portDarkening(edgeAddedElements);
    setElements(portColoredElements);
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    // sideBar 컴포넌트에서 set 한 노드 타입을 가져온다.
    const type = event.dataTransfer.getData('application/reactflow');

    if (type && reactFlowInstance) {
      const position = reactFlowInstance.project({
        x: event.clientX - 250,
        y: event.clientY - 130,
      });

      const nodeId = getId();

      // const params = getParams(type); // json 으로
      const params = parameterForm && parameterForm[type];
      const newNode: Node = {
        id: nodeId,
        type,
        position,
        data: {
          label: `${type} node`,
          source: [],
          target: [],
          nodeId,
          params,
        },
      };
      setElements(es => es.concat(newNode));
    }
  };

  const onConnectStart = (e: React.MouseEvent, { nodeId, handleType }) => {
    const target = e.target as HTMLElement;
    const startParams = {
      nodeId,
      handleType,
      portType: target.dataset.handleid as string,
    };

    const coloredElements = portColoring(elements, startParams);
    setElements(coloredElements);
  };

  const onConnectStop = () => {
    const deColoredElements = portDarkening(elements);
    setElements(deColoredElements);
  };

  const onSetElemnts = (elements: Elements) => {
    setElements(elements);
  };

  // const freezeCanvas = {
  //   elementsSelectable: false,
  //   nodesConnectable: false,
  //   nodesDraggable: false,
  //   zoomOnScroll: false,
  //   zoomOnDoubleClick: false,
  //   paneMoveable: false,
  //   panOnScroll: false,
  // };
  const freezeCanvas = (isLoading: boolean) => {
    return {
      elementsSelectable: isLoading,
      nodesConnectable: isLoading,
      nodesDraggable: isLoading,
      zoomOnScroll: isLoading,
      zoomOnDoubleClick: isLoading,
      paneMoveable: isLoading,
      panOnScroll: isLoading,
    };
  };

  return (
    <Container>
      <Widget />
      <Wrappper>
        <DagStateBar />
        <ReactFlow
          onContextMenu={e => {
            e.preventDefault();
          }}
          elements={elements}
          onConnect={onConnect}
          onElementsRemove={onElementsRemove}
          onLoad={onLoad}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={NodeTypes}
          edgeTypes={edgeTypes}
          deleteKeyCode={46}
          onConnectStart={onConnectStart}
          onConnectStop={onConnectStop}
          // {...(dagStatusLoading ? freezeCanvas : null)}
          {...freezeCanvas(!dagStatusLoading)}
        >
          <Controls />
        </ReactFlow>
      </Wrappper>
      <Property elements={elements} onSetElements={onSetElemnts} />
    </Container>
  );
};

export default DataPage;

const Container = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: row;
`;

const Wrappper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
