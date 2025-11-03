import React from 'react';
import { Mail, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-12 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-slate-700">
        <div>
          <h3 className="font-semibold text-slate-900">AccessAble</h3>
          <p className="mt-2 text-sm">Built to make travel inclusive for all.</p>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Contact</h3>
          <a href="mailto:hello@accessable.app" className="mt-2 inline-flex items-center gap-2 text-sm hover:text-blue-700">
            <Mail className="w-4 h-4" /> hello@accessable.app
          </a>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Follow</h3>
          <div className="mt-2 flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="p-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Twitter" className="p-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Instagram" className="p-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
