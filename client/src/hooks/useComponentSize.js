import { useRef, useEffect, useState } from 'react';

export const useComponentSize = () => {
  const ref = useRef(null);
  const [widowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const { offsetWidth, offsetHeight } = ref.current;
        setWindowSize({ width: offsetWidth, height: offsetHeight });
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [ref]);

  return { ref, widowSize };
}


