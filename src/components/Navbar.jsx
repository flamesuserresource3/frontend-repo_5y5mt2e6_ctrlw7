import React from 'react';
import { Home, Search, Users, Info } from 'lucide-react';

const NavLink = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-slate-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-[0.98] transition"
    aria-label={label}
  >
    <Icon className="w-5 h-5 text-blue-600" aria-hidden="true" />
    <span className="hidden sm:block">{label}</span>
  </a>
);

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white grid place-items-center font-bold shadow-sm" aria-hidden>
            A
          </div>
          <div>
            <p className="text-lg sm:text-xl font-semibold text-slate-900 leading-tight">AccessAble</p>
            <p className="text-[10px] sm:text-xs text-slate-500 -mt-1">Inclusive travel made easy</p>
          </div>
        </a>

        <nav className="flex items-center gap-1">
          <NavLink href="#/" icon={Home} label="Home" />
          <NavLink href="#/search" icon={Search} label="Search" />
          <NavLink href="#/community" icon={Users} label="Community" />
          <NavLink href="#/about" icon={Info} label="About" />
        </nav>
      </div>
    </header>
  );
}
