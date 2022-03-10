import {
  Elements,
  Node,
  Edge,
  isNode,
  isEdge,
  ElementId,
} from 'react-flow-renderer';

// 노드 아이디 생성
let id = 0;
export const getId = (): ElementId => `dndnode_${id++}`;

// 선을 그을때(onConnectStart) 시작 포트의 정보
interface IStartParams {
  nodeId: string;
  handleType: string;
  portType: string;
}
export const portColoring = (elements: Elements, startParams: IStartParams) => {
  const nodes = elements.filter(ele => isNode(ele)) as Node[];
  const edges = elements.filter(ele => isEdge(ele)) as Edge[];

  const newNodes = nodes.map(node => {
    node.data = {
      ...node.data,
      connectStart: startParams,
    };

    return node;
  });

  return [...newNodes, ...edges];
};

export const portDarkening = (elements: Elements) => {
  const nodes = elements.filter(ele => isNode(ele)) as Node[];
  const edges = elements.filter(ele => isEdge(ele)) as Edge[];

  // data의 scource, target을 초기화 해서 모든 노드의 포트를 빈 포트로 만든다(색을 지운다).
  const resetNodes = nodes.map(node => {
    return {
      ...node,
      data: { ...node.data, source: [], target: [], connectStart: null },
    };
  });

  // 노드들과 엣지들을 모두 순회해서 포트들의 색을 다시 칠한다.
  const newNodes = resetNodes.map(node => {
    edges.forEach(edge => {
      if (node.id === edge.source) {
        node.data = {
          ...node.data,
          source: [...node.data.source, edge.sourceHandle],
        };
      } else if (node.id === edge.target) {
        node.data = {
          ...node.data,
          target: [...node.data.target, edge.targetHandle],
        };
      }
    });

    return node;
  });

  return [...newNodes, ...edges];
};

/* eslint-disable @typescript-eslint/no-var-requires */
const paramsFormData = require('./data.json');

export const getParams = type => {
  return paramsFormData[type];
};
