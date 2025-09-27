import { useEffect, useState, useRef } from 'react';
import Desk1 from '../assets/HeroSection/Img_1.webp';
import Desk2 from '../assets/HeroSection/Img_2.webp';
import Desk3 from '../assets/HeroSection/Img_3.jpg';
import Desk4 from '../assets/HeroSection/Img_4.jpg';
import badges from '../assets/HeroSection/Banner_1.jpg';
import M1 from '../assets/HeroSection/Mobile/Img_1.webp';
import M2 from '../assets/HeroSection/Mobile/Img_2.webp';
import M3 from '../assets/HeroSection/Mobile/Img_3.jpg';
import M4 from '../assets/HeroSection/Mobile/Img_4.jpg';

// Desktop / tablet carousel slides
const slides = [Desk1, Desk2, Desk3, Desk4];
// Mobile specific (first one will show). If you want a mobile carousel later, reuse this array.
const mobileSlides = [M1, M2, M3, M4].filter(Boolean);

function HeroSection({ interval = 5000, transitionMs = 900, pauseOnHover = true }) {
  // We create a virtual track: [cloneLast, ...slides, cloneFirst]
  // index refers to this extended array. Start at 1 (first real slide)
  const [index, setIndex] = useState(1);
  // drag removed
  // Mobile specific state (independent simple carousel)
  const [mobileIndex, setMobileIndex] = useState(0);
  const hoveringRef = useRef(false);
  const transitioningRef = useRef(false);
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  const extended = [slides[slides.length - 1], ...slides, slides[0]]; // length = slides.length + 2

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      if (pauseOnHover && hoveringRef.current) return;
      goTo(index + 1);
    }, interval);
    return () => clearInterval(id);
  }, [index, interval, pauseOnHover]);

  const goTo = (next) => {
    if (!trackRef.current) return;
    transitioningRef.current = true;
    setIndex(next);
  };

  // After transition ends, if at cloned ends, jump without animation
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const handleEnd = () => {
      transitioningRef.current = false;
      setIndex(prev => {
        if (prev === extended.length - 1) { // moved onto cloned first
          // jump to real first (index 1)
          el.style.transition = 'none';
          el.style.transform = `translateX(-100%)`;
          // force reflow then restore transition
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              el.style.transition = `transform ${transitionMs}ms ease-in-out`;
            });
          });
          return 1;
        }
        if (prev === 0) { // moved onto cloned last
          el.style.transition = 'none';
            el.style.transform = `translateX(-${slides.length * 100}%)`;
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              el.style.transition = `transform ${transitionMs}ms ease-in-out`;
            });
          });
          return slides.length;
        }
        return prev;
      });
    };
    el.addEventListener('transitionend', handleEnd);
    return () => el.removeEventListener('transitionend', handleEnd);
  }, [extended.length, transitionMs]);

  // Apply transform based on index
  const trackStyle = {
    transform: `translateX(-${index * 100}%)`,
    transition: `transform ${transitionMs}ms ease-in-out`
  };

  // Real slide index (0-based) for dots
  let realSlide = index - 1;
  if (index === 0) realSlide = slides.length - 1;
  if (index === slides.length + 1) realSlide = 0;

  const handleDotClick = (i) => {
    if (transitioningRef.current) return;
    goTo(i + 1); // dot i corresponds to extended index i+1
  };

  // Auto advance for mobile simple carousel
  useEffect(() => {
    if (mobileSlides.length < 2) return;
    const id = setInterval(() => {
      setMobileIndex(m => (m + 1) % mobileSlides.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  return (
    <div className="w-full">
      {/* Mobile (single image) */}
      <section className="relative w-full h-[60vh] sm:h-[65vh] md:hidden overflow-hidden select-none bg-neutral-100">
        {/* Mobile slides (fade) */}
        <div className="absolute inset-0">
          {(mobileSlides.length ? mobileSlides : [slides[0]]).map((src, i, arr) => {
            const active = i === mobileIndex;
            // If using fallback array (desktop slides), we want only first image fixed
            const fading = arr === mobileSlides && mobileSlides.length > 1;
            return (
              <img
                key={i + '-m'}
                src={src}
                alt={`Mobile hero ${i + 1}`}
                className={`${fading ? 'absolute' : 'relative'} inset-0 w-full h-full object-cover transition-opacity duration-700 ${active ? 'opacity-100' : fading ? 'opacity-0' : 'opacity-100'}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                draggable="false"
              />
            );
          })}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />
        </div>
        {mobileSlides.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {mobileSlides.map((_, i) => {
              const active = i === mobileIndex;
              return (
                <button
                  key={i}
                  aria-label={`Go to mobile slide ${i + 1}`}
                  aria-current={active ? 'true' : 'false'}
                  onClick={() => setMobileIndex(i)}
                  className={`h-2 w-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/40 ${active ? 'bg-white/90' : 'bg-white/40 hover:bg-white/70'}`}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* Desktop / Tablet Carousel */}
      <section
        ref={sectionRef}
        className="relative hidden md:block w-full h-[70vh] md:h-[80vh] lg:h-[65vh] overflow-hidden select-none bg-neutral-100 touch-pan-y"
        onMouseEnter={() => (hoveringRef.current = true)}
        onMouseLeave={() => (hoveringRef.current = false)}
      >
        <div
          ref={trackRef}
          className="absolute inset-0 flex"
          style={trackStyle}
        >
          {extended.map((src, i) => (
            <div key={i + '-ext'} className="w-full h-full flex-shrink-0 relative">
              <img
                src={src}
                alt="Hero slide"
                className="absolute inset-0 w-full h-full object-cover"
                draggable="false"
                loading={i === 1 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
        {/* Dots (minimal) */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {slides.map((_, i) => {
            const active = i === realSlide;
            return (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={active ? 'true' : 'false'}
                onClick={() => handleDotClick(i)}
                className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${active ? 'bg-white/90' : 'bg-white/40 hover:bg-white/60'}`}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default HeroSection;