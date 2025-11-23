import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full h-20 flex items-center justify-between px-10 shadow-sm bg-white">
      
      {/* Лого */}
      <div className="flex items-center gap-3">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
      </div>

      {/* Ссылки */}
      <div className="flex items-center gap-8 text-gray-700">
        <a href="/" className="hover:text-black transition">Home</a>
        <a href="/submit" className="hover:text-black transition">Submit Project</a>
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
