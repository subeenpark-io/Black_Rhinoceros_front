import { useEffect } from 'react';

export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref || ref.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, handler]);
}
