import React, { useState, CSSProperties } from 'react';
import { Handle, HandleProps } from 'react-flow-renderer';
import { usePopper } from 'react-popper';
import useHover from 'app/hooks/uesHover';
import styled from 'styled-components';

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
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'right',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [-8.5, 5],
        },
      },
    ],
  });
  const [active, bind] = useHover();

  const display = {
    display: active ? 'block' : 'none',
  };

  return (
    <>
      <Handle
        type={type}
        position={position}
        id={portType}
        isConnectable={isConnectable}
        isValidConnection={isValidConnection}
        className={data[type].find(ele => ele === portType) ? 'connected' : ''}
        style={style}
        ref={setReferenceElement}
        {...bind}
      />
      <Tooltip
        ref={setPopperElement}
        style={{ ...styles.popper, ...display }}
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
