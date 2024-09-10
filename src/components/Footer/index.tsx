// Footer.js or Footer.tsx
import React from 'react';

function Footer() {
  return (
    <footer className="w-screen z-10 bg-zinc-700 flex flex-col min-h-screen">
      <div className="container mx-auto text-center">
        <p className="text-white">
          &copy; {new Date().getFullYear()} INN-REPORT. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
