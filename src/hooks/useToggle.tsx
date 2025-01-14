import { useCallback, useState } from 'react';

export default function () {
  const [isToggle, setIsToggle] = useState(false);

  const open = useCallback(() => {
    setIsToggle(true);
  }, []);

  const close = useCallback(() => {
    setIsToggle(false);
  }, []);

  const toggle = useCallback(() => {
    setIsToggle(prev => !prev);
  }, []);

  return {
    isToggle,
    open,
    close,
    toggle,
  };
}
