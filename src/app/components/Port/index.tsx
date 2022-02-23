import React, { useState, CSSProperties } from 'react';
import { Handle, HandleProps } from 'react-flow-renderer';
import useHover from 'app/hooks/uesHover';
import styled from 'styled-components';
import { useTooltip } from './util';

interface IPort extends HandleProps {
  data: any; // 데이터 구조 확정되고 타입 명시
  portType: string; // dataset, untrained 추가
  style?: CSSProperties;
}

const Port = ({
  isValidConnection,
  isConnectable,
  position,
  data,
  type,
  portType,
  style,
}: IPort) => {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null,
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [active, bind] = useHover();
  const { styles, attributes } = useTooltip(
    referenceElement,
    popperElement,
    active,
  );

  let connected = data[type].find(ele => ele === portType) ? 'connected' : '';
  if (data.connectStart && data.connectStart.handleType !== type) {
    const startPortType = data.connectStart.portType.split(':')[0];
    const currentPortType = portType.split(':')[0];
    if (
      data.nodeId !== data.connectStart.nodeId &&
      startPortType === currentPortType
    ) {
      connected = 'positive';
    } else {
      connected = 'negative';
    }
  }

  return (
    <>
      <Handle
        type={type}
        position={position}
        id={portType}
        isConnectable={isConnectable}
        isValidConnection={isValidConnection}
        className={connected}
        style={style}
        ref={setReferenceElement}
        {...bind}
      />
      <Tooltip
        ref={setPopperElement}
        style={{ ...styles }}
        {...attributes.popper}
      >
        {portType}
      </Tooltip>
    </>
  );
};

export default Port;

const Tooltip = styled.div`
  background: white;
  padding-left: 5px;
  border-radius: 5px;
  border: 1px solid;
  padding-right: 5px;
  z-index: 2;
  transition: 2s;
`;
