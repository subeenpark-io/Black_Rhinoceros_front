import React, { useEffect, useState } from 'react';
import { useStoreState, isNode, Node } from 'react-flow-renderer';
import styled from 'styled-components';
import takeForm from './forms';

type Option = {
  text: string;
  value: string;
};

interface IParameter {
  formType: string;
  label: string;
  options: Option[];
  value: string;
}

export interface IChangedParams {
  label: string;
  value?: string;
  options?: Option[];
}
const Property = ({ elements, onSetElements }) => {
  const selectedElements = useStoreState(store => store.selectedElements);

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [renderedParams, setRenderedParams] = useState<JSX.Element[]>();
  const [changedParams, setChangedParams] = useState<IChangedParams>();

  useEffect(() => {
    if (selectedNode) {
      const updateSelectedNode = elements.find(
        ele => ele.id === selectedNode.id,
      );
      setSelectedNode(updateSelectedNode);
    }
  }, [elements]);

  // 노드를 클릭하면 클릭한 노드로 업데이트한다
  useEffect(() => {
    const selectedNode = selectedElements?.filter(ele =>
      isNode(ele),
    )[0] as Node;

    setSelectedNode(selectedNode);
  }, [selectedElements]);

  // 선택한 노드의 파라미터 양식에 맞게 폼을 만든다.
  useEffect(() => {
    const params: IParameter[] = selectedNode?.data.params;

    const renderedParams = params?.map(param => {
      return takeForm({ ...param, onParamsChange, id: selectedNode?.id });
    });

    setRenderedParams(renderedParams);
  }, [selectedNode]);

  // 사용자가 값을 입력하면 해당 노드의 파라미터 값을 업데이트하고,전체 엘리먼트에 저장한다.
  const onParamsChange = (params: IChangedParams) => {
    setChangedParams({ ...params });
  };

  useEffect(() => {
    if (changedParams) {
      const { label } = changedParams;
      const updatedNode = {
        ...selectedNode,
        data: {
          ...selectedNode?.data,
          params: selectedNode?.data.params.map(param => {
            if (param.label === label) {
              return { ...param, ...changedParams };
            } else {
              return param;
            }
          }),
        },
      };

      const newElements = elements.map(ele => {
        if (ele.id === selectedNode?.id) {
          return updatedNode;
        } else {
          return ele;
        }
      });

      onSetElements(newElements);
    }
  }, [changedParams]);

  return (
    <Aside>
      <div>
        <strong>Property</strong>
      </div>
      <div>{selectedNode?.type}</div>
      <Form>{renderedParams}</Form>
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

const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
`;
