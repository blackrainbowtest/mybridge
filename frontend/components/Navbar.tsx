import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full h-20 flex items-center justify-between px-10 shadow-sm bg-white">
      
      {/* Лого */}
      <div className="flex items-center gap-3">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
      </div>

      {/* Ссылки */}
      <div className="flex items-center gap-8 text-gray-300 group">
        <a
          href="/"
          className="
            relative px-2 py-1
            text-gray-300
            hover:text-white
            transition
          "
        >
          Home
          <span className="pointer-events-none absolute left-0 top-0 w-[10px] h-[10px] bg-black scale-0 origin-top-left transition-transform duration-200 group-hover:scale-100"></span>
          <span className="pointer-events-none absolute right-0 bottom-0 w-[10px] h-[10px] bg-black scale-0 origin-bottom-right transition-transform duration-200 group-hover:scale-100"></span>
        </a>
        <a
          href="/submit"
          className="
            relative px-2 py-1
            text-gray-300
            hover:text-white
            transition
          "
        >
          Submit Project
          <span className="pointer-events-none absolute left-0 top-0 w-[10px] h-[10px] bg-black scale-0 origin-top-left transition-transform duration-200 group-hover:scale-100"></span>
          <span className="pointer-events-none absolute right-0 bottom-0 w-[10px] h-[10px] bg-black scale-0 origin-bottom-right transition-transform duration-200 group-hover:scale-100"></span>
        </a>
      </div>

      {/* Кнопка регистрации */}
      <div>
        <a 
          href="/register"
          className="px-4 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition"
        >
          Join Now
        </a>
      </div>

    </nav>
  );
}
