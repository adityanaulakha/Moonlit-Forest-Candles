import React, { useCallback, useEffect, useRef, useState } from 'react';

// Static testimonial data (can later be fetched from API)
const testimonials = [
  {
    id: 't1',
    name: 'Aarohi M.',
    location: 'Mumbai',
    text: 'Beautiful craftsmanship and fast shipping. The candle holders added instant charm to my festive decor!',
    rating: 5,
    verified: true
  },
  {
    id: 't2',
    name: 'Rohan K.',
    location: 'Bengaluru',
    text: 'Loved the aroma candle – subtle, calming and long lasting. Will definitely order again.',
    rating: 5,
    verified: true
  },
  {
    id: 't3',
    name: 'Simran P.',
    location: 'Chandigarh',
    text: 'The resin platter is stunning – looks even better in person and became the highlight of my center table.',
    rating: 5,
    verified: true
  },
  {
    id: 't4',
    name: 'Devansh L.',
    location: 'Gurugram',
    text: 'High quality and thoughtfully packed. You can tell a lot of care goes into every product.',
    rating: 4,
    verified: true
  }
];

const Stars = ({ value }) => (
  <div className="flex text-amber-500 text-xs" aria-label={`${value} star rating`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i}>{i < value ? '★' : '☆'}</span>
    ))}
  </div>
);

function Feedback() {
  const getItemsPerView = useCallback(() => {
    if (typeof window === 'undefined') return 1;
    const w = window.innerWidth;
    if (w >= 1280) return 3; // xl
    if (w >= 768) return 2; // md
    return 1; // mobile
  }, []);

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView);
  const [index, setIndex] = useState(itemsPerView); // start after prepended clones
  const [isPaused, setIsPaused] = useState(false);
  const [enableTransition, setEnableTransition] = useState(true);
  const trackRef = useRef(null);

  // Resize handler updates itemsPerView & resets index accordingly
  useEffect(() => {
    const handleResize = () => {
      const newIpv = getItemsPerView();
      setItemsPerView(prev => {
        if (prev !== newIpv) {
          // Reset index relative to new clones
          setIndex(newIpv);
        }
        return newIpv;
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getItemsPerView]);

  const base = testimonials;
  const carouselNeeded = base.length > itemsPerView;

  // Build items with clones for infinite effect
  const clonesHead = carouselNeeded ? base.slice(-itemsPerView) : [];
  const clonesTail = carouselNeeded ? base.slice(0, itemsPerView) : [];
  const items = [...clonesHead, ...base, ...clonesTail];

  // Autoplay
  useEffect(() => {
    if (!carouselNeeded || isPaused) return;
    const id = setInterval(() => {
      setIndex(i => i + 1);
    }, 5000);
    return () => clearInterval(id);
  }, [carouselNeeded, isPaused]);

  // Handle transition end for infinite looping
  const handleTransitionEnd = () => {
    if (!carouselNeeded) return;
    const totalBase = base.length;
    if (index >= totalBase + itemsPerView) {
      // passed the end clones -> jump back
      setEnableTransition(false);
      setIndex(itemsPerView);
      requestAnimationFrame(() => {
        // force reflow before re-enabling transition
        requestAnimationFrame(() => setEnableTransition(true));
      });
    } else if (index < itemsPerView) {
      // moved into head clones -> jump to tail end
      setEnableTransition(false);
      setIndex(totalBase + (index % totalBase));
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setEnableTransition(true));
      });
    }
  };

  const visibleIndex = carouselNeeded ? (index - itemsPerView + base.length) % base.length : 0;

  const goNext = () => carouselNeeded && setIndex(i => i + 1);
  const goPrev = () => carouselNeeded && setIndex(i => i - 1);

  const jumpTo = (target) => {
    if (!carouselNeeded) return;
    setIndex(itemsPerView + target);
  };

  // Keyboard navigation when focused inside section
  const sectionRef = useRef(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, []);

  // Compute width translation
  const translatePercent = -(index * (100 / itemsPerView));

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      tabIndex={0}
      aria-label="Customer testimonials carousel"
      className="outline-none bg-gradient-to-b from-white to-amber-50/40 border-t border-amber-100 py-16 md:py-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <header className="text-center mb-12">
          <h2 className="tracking-[0.35em] text-3xl font-semibold text-neutral-700 mb-4">CUSTOMER FEEDBACK</h2>
          <div className="flex justify-center">
            <span className="h-px w-32 bg-gradient-to-r from-transparent via-neutral-400/60 to-transparent" />
          </div>
        </header>

        {/* Carousel Shell */}
  <div className="relative overflow-hidden" aria-live="polite">
          {/* Track */}
            <div className="overflow-hidden">
              <div
                ref={trackRef}
                className={`flex ${enableTransition ? 'transition-transform duration-600 ease-out' : ''}`}
                style={{ transform: `translateX(${translatePercent}%)` }}
                onTransitionEnd={handleTransitionEnd}
              >
                {items.map((t, i) => (
                  <article
                    key={i + '_' + t.id}
                    className="px-2 md:px-3 lg:px-4 flex-shrink-0"
                    style={{ width: `${100 / itemsPerView}%` }}
                    aria-label={`Testimonial by ${t.name}`}
                  >
                    <div className="h-full flex flex-col bg-white/75 backdrop-blur-sm border border-amber-100 rounded-sm p-5 md:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-md transition">
                      <Stars value={t.rating} />
                      <p className="mt-3 text-[13px] leading-relaxed text-neutral-600 flex-1">{t.text}</p>
                      <div className="mt-5 text-[11px] tracking-wide font-medium text-neutral-800">
                        {t.name}
                        <span className="text-neutral-400 font-normal"> • {t.location}</span>
                        {t.verified && <span className="ml-1 inline-block text-emerald-600 text-[10px] font-semibold">VERIFIED</span>}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

          {/* Arrows (hidden if not needed) */}
          {carouselNeeded && (
            <>
              <button
                onClick={goPrev}
                aria-label="Previous testimonials"
                className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 md:left-1 lg:-left-4 xl:-left-6 h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur border border-neutral-200 shadow-sm hover:bg-white transition"
              >
                <span className="sr-only">Previous</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-700"><path d="M15 6l-6 6 6 6"/></svg>
              </button>
              <button
                onClick={goNext}
                aria-label="Next testimonials"
                className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-0 md:right-1 lg:-right-4 xl:-right-6 h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur border border-neutral-200 shadow-sm hover:bg-white transition"
              >
                <span className="sr-only">Next</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-700"><path d="M9 6l6 6-6 6"/></svg>
              </button>
            </>
          )}

          {/* Dots */}
          {carouselNeeded && (
            <div className="mt-10 flex justify-center gap-2" aria-label="Testimonials navigation">
              {base.map((_, i) => (
                <button
                  key={i}
                  onClick={() => jumpTo(i)}
                  aria-label={`Go to testimonials group ${i + 1}`}
                  aria-current={visibleIndex === i}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${visibleIndex === i ? 'bg-neutral-800' : 'bg-neutral-400/40 hover:bg-neutral-500/70'}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Feedback;