import { useState, useMemo, MouseEvent } from 'react';

const useHover = (): [
  boolean,
  {
    onMouseEnter: (e: MouseEvent) => void;
    onMouseLeave: (e: MouseEvent) => void;
  },
] => {
  const [isHovered, setHovered] = useState(false);

  const bind = useMemo(
    () => ({
      onMouseEnter: () => void setHovered(true),
      onMouseLeave: () => void setHovered(false),
    }),
    [],
  );

  return [isHovered, bind];
};

export default useHover;
