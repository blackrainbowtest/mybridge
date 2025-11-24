import Link from "next/link";
import Image from "next/image";
import NavMenu from "./navigation/NavMenu";

export default function Navbar() {
  return (
    <nav className="w-full h-20 bg-white flex items-center shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">

        {/* Лого */}
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={60} height={60} />
        </Link>

        {/* Меню */}
        <NavMenu />

        {/* Кнопка регистрации */}
        <a
          href="/register"
          className="
    px-6 py-3 
    text-white font-semibold 
    rounded-full 
    transition-all
    bg-[#11253B]
    hover:bg-[#FCD34D] 
    hover:text-[#11253B]
  "
        >
          Join Now
        </a>

      </div>
    </nav>
  );
}
