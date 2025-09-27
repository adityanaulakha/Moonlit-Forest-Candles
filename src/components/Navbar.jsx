import { useState } from 'react';
import Logo from '../assets/Logo.jpg';

// Simple inline SVG icons to avoid extra dependencies
const IconSearch = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);
const IconCart = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} aria-hidden="true">
    <circle cx="9" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2 3h2l2.4 12.3A2 2 0 0 0 8.4 17h9.7a2 2 0 0 0 2-1.7L22 8H6" />
  </svg>
);
const IconUser = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} aria-hidden="true">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c1.4-3.2 4.7-5 8-5s6.6 1.8 8 5" />
  </svg>
);

const navItems = [
  {
    label: 'Scented Traditions',
    items: ['Classic Lavender', 'Heritage Rose', 'Vintage Sandalwood']
  },
  {
    label: 'Festive Gifting',
    items: ['Diwali Set', 'Christmas Collection', 'Eid Specials']
  },
  {
    label: 'Festive Essentials',
    items: ['Decor Lights', 'Fragrance Oils', 'Incense Cones']
  },
  {
    label: 'Bestsellers',
    items: ['Top Candles', 'Most Loved Sets', 'Customer Favourites']
  },
  {
    label: 'Gifting',
    items: ['Gift Boxes', 'Personalized', 'Corporate']
  },
  {
    label: 'Shop All',
    items: ['All Candles', 'Accessories', 'Bundles']
  }
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-neutral-200">
      {/* Full width nav (edge-to-edge) */}
      <nav className="w-full px-3 sm:px-4 relative">
        <div className="flex h-30 items-center justify-between relative">
          {/* Left: Logo */}
          <div className="flex items-center shrink-0 pr-4">
            <a href="/" className="flex items-center">
              <img src={Logo} alt="Brand Logo" className="h-20 sm:h-20 lg:h-[120px] w-auto object-contain" />
            </a>
          </div>

          {/* Center: Desktop Nav (absolutely centered) */}
          <ul className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2 h-full">
            {navItems.map(item => (
              <li key={item.label} className="relative group">
                <button
                  className="h-full text-sm px-3 py-2 rounded-md font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition inline-flex items-center gap-1"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {item.label}
                  <span className="text-neutral-400 group-hover:text-neutral-600 transition">▾</span>
                </button>
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-150 absolute left-0 top-full pt-2 min-w-[14rem]">
                  <div className="rounded-md border border-neutral-200 bg-white shadow-lg py-2 flex flex-col">
                    {item.items.map(sub => (
                      <a
                        key={sub}
                        href="#"
                        className="px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition"
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 pl-4 shrink-0">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search"
                className="pl-9 pr-3 py-2 text-sm rounded-full border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-400/50 focus:border-neutral-400 placeholder:text-neutral-400"
                aria-label="Search products"
              />
              <IconSearch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            </div>
            <button aria-label="Search" className="md:hidden p-2 rounded-full hover:bg-neutral-100 text-neutral-600">
              <IconSearch className="w-5 h-5" />
            </button>
            <button aria-label="Cart" className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600">
              <IconCart className="w-5 h-5" />
            </button>
            <button aria-label="Profile" className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600">
              <IconUser className="w-5 h-5" />
            </button>
            <button
              className="lg:hidden p-2 rounded-md border border-neutral-300 hover:bg-neutral-100 text-neutral-600"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              <span className="sr-only">Menu</span>
              <div className="w-5 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 bg-current transition ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-0.5 bg-current transition ${mobileOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 bg-current transition ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-[max-height] duration-300 overflow-hidden ${mobileOpen ? 'max-h-[800px]' : 'max-h-0'}`}>
        <div className="px-4 pb-4 border-t border-neutral-200 bg-white/90 backdrop-blur">
          <div className="py-3">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search products"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-400/50 focus:border-neutral-400 placeholder:text-neutral-400"
                aria-label="Search products"
              />
              <IconSearch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            </div>
            <ul className="space-y-2">
              {navItems.map(item => (
                <li key={item.label} className="border border-neutral-200 rounded-md overflow-hidden">
                  <details>
                    <summary className="cursor-pointer list-none flex items-center justify-between px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                      {item.label}
                      <span className="text-neutral-400">▾</span>
                    </summary>
                    <div className="flex flex-col bg-white">
                      {item.items.map(sub => (
                        <a key={sub} href="#" className="px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 border-t border-neutral-100">
                          {sub}
                        </a>
                      ))}
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;