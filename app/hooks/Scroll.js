// hooks/useGsapScroll.js
import { useEffect } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useGsapScroll = () => {
  useEffect(() => {
    gsap.fromTo(
      'section', // Adjust the selector based on your needs
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: 'section',
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      }
    );
  }, []);
};

export default useGsapScroll;
