import React from 'react';

/*
  Footer Component
  - Layout inspired by provided reference screenshot
  - Color palette stays within existing neutral / soft rose aesthetic
  - Three primary columns (About / Legal / Newsletter)
  - Bottom bar with copyright
  - Accessible labels & form semantics
  - Mobile first responsive stacking
*/

function Footer() {
  const year = new Date().getFullYear();

  return (
  <footer className="mt-24 bg-neutral-950 text-white/90 text-[11px] tracking-wide leading-relaxed">
      {/* Top Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16 grid gap-14 md:gap-10 md:grid-cols-12">
        {/* About */}
        <div className="md:col-span-5 lg:col-span-5 space-y-6">
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.35em] mb-5 text-white/90">CONTACT</h3>
            <div className="text-[12px] leading-relaxed font-light text-white/80 max-w-xs md:max-w-sm space-y-3">
              <p className="font-medium tracking-wide text-white/90">Moonlit Forest Candle</p>
              <ul className="space-y-1">
                <li className="text-white/75">Shopping & Retail</li>
                <li className="text-white/75">🕯️ Hand-poured with love</li>
                <li className="text-white/75">✨ Customized & scented candles</li>
                <li className="text-white/75">🎁 Perfect gift for your loved ones</li>
              </ul>
              <div className="pt-2 space-y-1">
                <p>
                  <a
                    href="https://www.instagram.com/moonlitforest_candle/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white/80 hover:text-white transition"
                    aria-label="Instagram profile Moonlit Forest Candle"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><rect x="3" y="3" width="18" height="18" rx="4" ry="4"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    <span>@moonlitforest_candle</span>
                  </a>
                </p>
                <p>
                  <a href="tel:+917986276862" className="text-white/80 hover:text-white transition" aria-label="Call Moonlit Forest Candle">
                    +91&nbsp;79862&nbsp;76862
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="md:col-span-4 lg:col-span-4 space-y-4">
          <h3 className="text-[11px] font-semibold tracking-[0.35em] mb-5 text-white/90">LEGAL</h3>
          <ul className="space-y-3 text-white/80 text-[12px]">
            {['About Us','Contact Us','Shipping Policy','Returns & Exchange Policy','Terms of Service','Privacy Policy','Refund policy'].map(item => (
              <li key={item}>
                <a href="#" className="hover:text-white transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-3 lg:col-span-3 space-y-6">
          <h3 className="text-[11px] font-semibold tracking-[0.35em] mb-5 text-white/90">NEWSLETTER</h3>
          <p className="text-[12px] text-white/80 font-light max-w-xs">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form className="space-y-4" onSubmit={(e)=>{e.preventDefault(); /* hook up later */}}>
            <label className="block">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full bg-transparent border border-white/55 placeholder-white/60 focus:border-white focus:outline-none px-4 py-3 rounded-sm text-[12px] tracking-wide"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 transition text-white text-[11px] tracking-[0.25em] font-medium px-8 py-3 rounded-sm border border-white/10"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
  <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[10px] tracking-[0.3em] font-medium text-white/80">© {year} DOFT CANDLES</p>
          <div className="flex flex-wrap gap-5 text-[10px] text-white/60">
            <a href="#" className="hover:text-white">Imprint</a>
            <a href="#" className="hover:text-white">Accessibility</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
