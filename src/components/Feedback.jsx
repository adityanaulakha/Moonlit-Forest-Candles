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
      className="relative outline-none border-t border-amber-100 py-20 md:py-24 bg-gradient-to-b from-white via-amber-50/30 to-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-20 w-[32rem] h-[32rem] bg-amber-200/40 blur-[100px] rounded-full animate-pulse opacity-40" />
        <div className="absolute bottom-[-10rem] right-[-6rem] w-[28rem] h-[28rem] bg-rose-200/40 blur-[110px] rounded-full opacity-35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0)_0%,rgba(255,255,255,0.9)_70%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <header className="text-center mb-14">
          {/* <h2 className="tracking-[0.35em] text-3xl font-semibold text-neutral-700 mb-4">CUSTOMER FEEDBACK</h2> */}
          <h3 className="text-3xl sm:text-3xl font-medium tracking-wide text-neutral-800/95 mb-6">What our customers are saying</h3>
          <div className="flex justify-center mb-2">
            <span className="h-px w-40 bg-gradient-to-r from-transparent via-neutral-400/50 to-transparent" />
          </div>
          <p className="max-w-2xl mx-auto text-[12px] sm:text-[13px] leading-relaxed text-neutral-500">Real experiences from people who welcomed our handcrafted aromas into their spaces.</p>
        </header>

        {/* Carousel Shell */}
        <div className="relative overflow-visible" aria-live="polite">
          {/* Track */}
            <div className="overflow-hidden">
              <div
                ref={trackRef}
                className={`flex ${enableTransition ? 'transition-transform duration-600 ease-out' : ''}`}
                style={{ transform: `translateX(${translatePercent}%)` }}
                onTransitionEnd={handleTransitionEnd}
              >
                {items.map((t, i) => {
                  // Determine the base index for highlight
                  let baseIndex;
                  if (i < itemsPerView) baseIndex = base.length - itemsPerView + i; // head clones
                  else if (i >= itemsPerView + base.length) baseIndex = i - (itemsPerView + base.length); // tail clones
                  else baseIndex = i - itemsPerView; // real items
                  const isActive = baseIndex === visibleIndex;
                  return (
                    <article
                      key={i + '_' + t.id}
                      className="px-2 md:px-3 lg:px-4 flex-shrink-0"
                      style={{ width: `${100 / itemsPerView}%` }}
                      aria-label={`Testimonial by ${t.name}`}
                    >
                      <div
                        className={`group relative h-full flex flex-col rounded-md border backdrop-blur-sm p-7 md:p-8 transition-colors duration-400
                        ${isActive
                          ? 'bg-white border-amber-300 shadow-[0_6px_22px_-8px_rgba(0,0,0,0.18)] ring-1 ring-amber-200'
                          : 'bg-white/65 border-amber-100 hover:bg-white/80 hover:border-amber-200'}
                        `}
                      >
                        {/* Modern minimal quote icon */}
                        <span
                          aria-hidden="true"
                          className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-200/70 bg-white/80 backdrop-blur-sm shadow-sm text-amber-500"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="opacity-90"
                          >
                            <path d="M7.17 6C5.4 6 4 7.4 4 9.17c0 1.76 1.4 3.16 3.17 3.16.2 0 .4-.02.6-.05-.26 1.14-1.09 2.31-2.44 3.5-.26.23-.29.63-.06.9.23.26.63.29.9.06 1.86-1.6 2.94-3.28 3.2-5 .04-.25.06-.5.06-.76V9.17C9.33 7.4 7.93 6 7.17 6Zm9.66 0c-1.77 0-3.16 1.4-3.16 3.17v2.16c0 .26.02.51.06.76.26 1.72 1.34 3.4 3.2 5 .27.23.67.2.9-.06.23-.27.2-.67-.06-.9-1.35-1.19-2.18-2.36-2.44-3.5.2.03.4.05.6.05 1.77 0 3.17-1.4 3.17-3.16C19.33 7.4 17.93 6 16.83 6Z" />
                          </svg>
                        </span>
                        <Stars value={t.rating} />
                        <p className="mt-4 text-[13px] leading-relaxed text-neutral-700 flex-1">{t.text}</p>
                        <div className="mt-6 flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-400/60 to-rose-400/60 flex items-center justify-center text-[11px] font-semibold text-neutral-800">
                            {t.name.split(' ').map(w => w[0]).slice(0,2).join('')}
                          </div>
                          <div className="text-[11px] tracking-wide font-medium text-neutral-800 leading-snug">
                            {t.name}
                            <span className="text-neutral-400 font-normal"> • {t.location}</span>
                            {t.verified && <span className="ml-1 inline-block text-emerald-600 text-[10px] font-semibold">VERIFIED</span>}
                          </div>
                        </div>
                        {/* Accent gradient bar */}
                        <span className={`pointer-events-none absolute left-0 bottom-0 h-[3px] w-full rounded-b-md bg-gradient-to-r from-amber-300 via-rose-300 to-amber-300 opacity-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'group-hover:opacity-70'}`}></span>
                      </div>
                    </article>
                  );
                })}
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
            <div className="mt-12 flex justify-center gap-2" aria-label="Testimonials navigation">
              {base.map((_, i) => (
                <button
                  key={i}
                  onClick={() => jumpTo(i)}
                  aria-label={`Go to testimonials group ${i + 1}`}
                  aria-current={visibleIndex === i}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${visibleIndex === i ? 'bg-neutral-900 scale-110' : 'bg-neutral-400/40 hover:bg-neutral-500/70'}`}
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