"use client";

import Image from "next/image";
import Link from "next/link";
import NavMenu from "./navigation/NavMenu";
import MobileMenu from "./navigation/MobileMenu";

export default function Navbar() {
  return (
    <nav className="w-full h-20 bg-white flex items-center shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">

        {/* Лого */}
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={60} height={60} />
        </Link>

        {/* Desktop Menu (скрывается на мобильных) */}
        <div className="hidden md:flex items-center gap-8">
          <NavMenu />
        </div>

        {/* Desktop Join Button */}
        <div className="hidden md:block">
          <a
            href="#choose-role"
            className="
              px-6 py-3 
              text-white font-semibold 
              rounded-full 
              transition-all
              bg-primary
              hover:bg-accent 
              hover:text-primary
            "
          >
            Join Now
          </a>
        </div>

        {/* Mobile Menu (бургер) */}
        <div className="md:hidden">
          <MobileMenu />
        </div>

      </div>
    </nav>
  );
}
