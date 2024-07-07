import { useState, useEffect } from 'react';
interface ScrollPosition {
  scrollY: number;
  isScrollingUp: boolean;
}
const useScrollPosition = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: window.scrollY,
    isScrollingUp: true,
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < scrollPosition.scrollY;
      setScrollPosition({ scrollY: currentScrollY, isScrollingUp });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPosition.scrollY]);

  return scrollPosition;
};

export default useScrollPosition;
