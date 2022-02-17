import React, { FC } from 'react';
import { EdgeProps, getBezierPath, getMarkerEnd } from 'react-flow-renderer';

const CustomEdge: FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  arrowHeadType,
  markerEndId,
}) => {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  return (
    <>
      <path
        id={id}
        fill="none"
        className="react-flow__edge-path"
        d={edgePath}
        tabIndex={1}
        markerEnd={markerEnd}
      />
      <path
        id={id + 'hit'}
        fill="none"
        className="react-flow__edge-path hit"
        d={edgePath}
      />
    </>
  );
};

export default CustomEdge;
