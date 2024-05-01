import { cn } from '@lib/utils';
import React, { useEffect, useRef, useState } from 'react';

interface IProps {
  className?: string;
  children: React.ReactNode;
}

const ScrollableItems: React.FC<IProps> = ({ className, children }) => {
  const [isDragging, setDragging] = useState(false);
  const scrollableItemsRef = useRef(null);
  const startClientX = useRef(null);

  const handleStart = (clientX) => {
    setDragging(true);
    startClientX.current = clientX;
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const movementX = startClientX.current - clientX;
      scrollableItemsRef.current.classList.add('scrolling');
      scrollableItemsRef.current.scrollLeft += movementX;

      startClientX.current = clientX;
    };

    const handleEnd = () => {
      setDragging(false);
      scrollableItemsRef.current.classList.remove('scrolling');
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchend', handleEnd);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchend', handleEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

  return (
    <div
      ref={scrollableItemsRef}
      className={cn('ScrollableItems', className)}
      onMouseDown={(e) => handleStart(e.clientX)}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
    >
      {children}
    </div>
  );
};

export default ScrollableItems;
