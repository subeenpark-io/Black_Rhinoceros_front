import styled from 'styled-components';
import { CSSProperties } from 'react';

export const Node = styled.div`
  padding: 8px;
  border-radius: 8px;
  width: 150px;
  font-size: 12px;
  color: #222;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  background: white;

  &:hover {
    border-color: gray;
  }
`;

export const ColorBand = styled.div`
  height: calc(100% - 2px);
  width: 12px;
  position: absolute;
  top: 1px;
  left: 10px;
`;

// 노드 한 면에 포트가 두개 일때 사이 간격 조절
export const leftHandle: CSSProperties = {
  left: '45px',
};
export const rightHandle: CSSProperties = {
  left: '105px',
};
