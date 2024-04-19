import { useRef, useEffect, useState } from 'react';

export const useComponentSize = () => {
  const ref = useRef(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const { offsetWidth, offsetHeight } = ref.current;
        setWindowSize({ width: offsetWidth, height: offsetHeight });
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { ref, windowSize };
};
