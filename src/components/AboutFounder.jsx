import React from 'react';
import FounderImg from '../assets/Founder.jpg';

/*
  AboutFounder Component
  Reference: Provided screenshot layout (text block + angled framed portrait + badge)
  Differences: White background per requirement, scented candle business themed dummy content.
*/

function AboutFounder() {
  return (
    <section id="about-founder" className="relative w-full bg-white py-24 md:py-28 overflow-hidden" aria-labelledby="about-founder-heading">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
        <header className="mb-14 md:mb-16 text-center md:text-left">
          <h2 id="about-founder-heading" className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">About Our Founder</h2>
          <p className="mt-3 text-lg font-medium tracking-wide text-amber-600">"Crafting Mood Through Scented Candles"</p>
        </header>

        <div className="grid md:grid-cols-12 gap-14 items-start">
          {/* Left Content */}
          <div className="md:col-span-7 lg:col-span-7 space-y-10">
            <div className="grid sm:grid-cols-2 gap-10">
              <div className="space-y-5 text-[13px] leading-relaxed text-neutral-700">
                <p className="text-[44px] leading-none font-serif font-light text-neutral-700 select-none">❝</p>
                <p>Creating olfactory narratives that soothe, center and elevate daily rituals is at the heart of our studio. Each candle is blended in small batches using clean-burning waxes and layered botanical accords.</p>
                <p>We believe scent can gently transform space—inviting calm reflection, quiet celebration, or a grounded return to self.</p>
              </div>
              <div className="space-y-6 text-[13px] leading-relaxed text-neutral-700">
                <div>
                  <h3 className="text-[11px] tracking-[0.25em] font-semibold text-neutral-800 mb-2">PHILOSOPHY</h3>
                  <p>Purposeful design paired with responsible ingredients. We source pure fragrance blends, natural wicks and recyclable vessels to ensure a considered sensory experience.</p>
                </div>
                <div>
                  <h3 className="text-[11px] tracking-[0.25em] font-semibold text-neutral-800 mb-2">APPROACH</h3>
                  <p>Every fragrance begins with a story draft. We map emotional tones, build a scent pyramid and refine until balance, throw and character feel quietly luxurious.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-3xl sm:text-4xl font-extralight italic text-amber-700 tracking-wide">Avisha</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-10 border-t pt-10">
              <div>
                <h4 className="text-[11px] tracking-[0.25em] font-semibold text-neutral-800 mb-4">RECOGNITION</h4>
                <ul className="space-y-3 text-[12px] text-neutral-600">
                  <li className="flex gap-2"><span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-neutral-400"/> Featured Artisan Collective 2023</li>
                  <li className="flex gap-2"><span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-neutral-400"/> Sustainable Home Fragrance Award 2024</li>
                  <li className="flex gap-2"><span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-neutral-400"/> Guest Speaker – Slow Living Summit</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[11px] tracking-[0.25em] font-semibold text-neutral-800 mb-4">VALUES</h4>
                <ul className="space-y-3 text-[12px] text-neutral-600">
                  <li className="flex gap-2"><span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-amber-400"/> Ingredient Transparency</li>
                  <li className="flex gap-2"><span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-amber-400"/> Craft over Mass Production</li>
                  <li className="flex gap-2"><span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-amber-400"/> Mindful Atmospheres</li>
                </ul>
              </div>
            </div>

            <div>
              <a href="#story" className="inline-flex items-center gap-3 bg-neutral-900 text-white text-[11px] tracking-[0.25em] font-medium px-8 py-3 rounded-sm hover:bg-neutral-800 transition">
                LEARN MORE ABOUT US
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
              </a>
            </div>
          </div>

          {/* Right: Portrait */}
          <div className="md:col-span-5 lg:col-span-5 relative flex justify-center md:justify-end">
            <div className="relative w-full max-w-md">
                <div className="overflow-hidden rounded-t-full rounded-b-full">
                  <img src={FounderImg} alt="Founder portrait" className="w-full h-full object-cover select-none" loading="lazy" />
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutFounder;
