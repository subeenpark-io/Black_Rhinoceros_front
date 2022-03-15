import React, { useState, CSSProperties, useEffect } from 'react';
import { Handle, HandleProps } from 'react-flow-renderer';
import useHover from 'app/hooks/uesHover';
import styled from 'styled-components';
import { useMenu, useTooltip } from './util';
import { useAppSelector } from 'app/hooks/useRedux';
import { useOnClickOutside } from 'app/hooks/useOnClickOutside';

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
  const [popperMenu, setPopperMenu] = useState<HTMLElement | null>(null);

  const [active, bind] = useHover();
  const [menuActive, setMenuActive] = useState(false);

  const { styles, attributes } = useTooltip(
    referenceElement,
    popperElement,
    active,
  );

  const { menuStyles, menuAttributes } = useMenu(
    referenceElement,
    popperMenu,
    menuActive,
  );

  const { resultId } = useAppSelector(state => state.datapage);

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

  useOnClickOutside(popperMenu, () => {
    setMenuActive(false);
  });

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
        onContextMenu={() => {
          setMenuActive(!menuActive);
        }}
        {...bind}
      />
      <Tooltip
        ref={setPopperElement}
        style={{ ...styles }}
        {...attributes.popper}
      >
        {portType}
      </Tooltip>
      <Menu
        ref={setPopperMenu}
        style={{ ...menuStyles }}
        {...menuAttributes.popper}
        onClick={e => {
          console.log(data.nodeId, portType, resultId);
          setMenuActive(!menuActive);
        }}
      >
        visualize
      </Menu>
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

const Menu = styled.div`
  background: white;
  border: 1px solid;
  border-radius: 5px;
  padding-right: 5px;
  padding-left: 5px;
  z-index: 2;
  &:hover {
    filter: brightness(0.9);
  }
`;
