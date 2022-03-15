import { usePopper } from 'react-popper';

export const useTooltip = (
  referenceElement: HTMLElement | null,
  popperElement: HTMLElement | null,
  active: boolean,
) => {
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

  const display = {
    display: active ? 'block' : 'none',
  };

  return { styles: { ...styles.popper, ...display }, attributes };
};

export const useMenu = (
  referenceElement: HTMLElement | null,
  popperMenu: HTMLElement | null,
  active: boolean,
) => {
  const { styles, attributes } = usePopper(referenceElement, popperMenu, {
    placement: 'bottom-start',

    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [5, -5],
        },
      },
    ],
  });

  const display = {
    display: active ? 'block' : 'none',
  };

  return {
    menuStyles: { ...styles.popper, ...display },
    menuAttributes: attributes,
  };
};
