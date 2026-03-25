'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface NavDropdown {
  label: string;
  items: DropdownItem[];
}

const solarDropdown: NavDropdown = {
  label: 'Solar',
  items: [
    { label: 'Solar Costs', href: '/solar-panel-cost/', description: 'Compare solar panel pricing by state & city' },
    { label: 'Solar Companies', href: '/solar-companies/', description: 'Find top-rated solar installers near you' },
    { label: 'Solar Incentives', href: '/solar-incentives/', description: 'Federal, state & local solar rebates' },
  ],
};

const energyDropdown: NavDropdown = {
  label: 'Energy',
  items: [
    { label: 'Electricity Rates', href: '/electricity-rates/', description: 'Compare utility rates in your area' },
    { label: 'Battery Storage', href: '/energy-storage/', description: 'Home battery & backup power solutions' },
  ],
};

function LightningBoltLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      {/* Lightning bolt SVG icon */}
      <svg
        className="h-8 w-8 text-amber-500 group-hover:text-amber-400 transition-colors"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M13 2L4.09 12.79a1 1 0 00.77 1.62H11v6.59a.5.5 0 00.89.31L20.91 11.21a1 1 0 00-.77-1.62H13V3a.5.5 0 00-.89-.31L13 2z" />
      </svg>
      <span className="text-xl font-bold tracking-tight">
        <span className="text-gray-900">Electrum</span>
        <span className="text-amber-500"> Solar</span>
      </span>
    </Link>
  );
}

function DesktopDropdown({ dropdown }: { dropdown: NavDropdown }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors px-3 py-2 rounded-lg hover:bg-amber-50"
        aria-expanded={open}
      >
        {dropdown.label}
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 w-72 rounded-xl border border-gray-200 bg-white py-2 shadow-xl z-50">
          {dropdown.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-3 hover:bg-amber-50 transition-colors"
              onClick={() => setOpen(false)}
            >
              <span className="block text-sm font-medium text-gray-900">{item.label}</span>
              {item.description && (
                <span className="block text-xs text-gray-500 mt-0.5">{item.description}</span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileAccordion({ dropdown, onClose }: { dropdown: NavDropdown; onClose: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-base font-medium text-gray-900">{dropdown.label}</span>
        <svg
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div className="bg-gray-50 pb-2">
          {dropdown.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-8 py-2.5 text-sm text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-colors"
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <LightningBoltLogo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            <DesktopDropdown dropdown={solarDropdown} />
            <DesktopDropdown dropdown={energyDropdown} />
            <Link
              href="/about/"
              className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors px-3 py-2 rounded-lg hover:bg-amber-50"
            >
              About
            </Link>
          </nav>

          {/* Right side: CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/get-quote/"
              className="inline-flex items-center rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 active:bg-amber-700 transition-colors"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Mobile: hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              className="rounded-lg p-2 text-gray-600 hover:bg-amber-50 hover:text-amber-600 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav aria-label="Mobile navigation">
            <MobileAccordion dropdown={solarDropdown} onClose={() => setMobileMenuOpen(false)} />
            <MobileAccordion dropdown={energyDropdown} onClose={() => setMobileMenuOpen(false)} />
            <div className="border-b border-gray-100">
              <Link
                href="/about/"
                className="block px-4 py-3 text-base font-medium text-gray-900 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </nav>
          <div className="p-4">
            <Link
              href="/get-quote/"
              className="flex w-full items-center justify-center rounded-lg bg-amber-500 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-amber-600 active:bg-amber-700 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
