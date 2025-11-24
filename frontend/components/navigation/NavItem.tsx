"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItem({
	href,
	label,
}: {
	href: string;
	label: string;
}) {
	const pathname = usePathname();
	const active = pathname === href;

	return (
		<Link
			href={href}
			className={`
        relative px-4 py-2 transition group text-xl
        ${active ? "font-bold text-gray-800" : "font-medium text-gray-700 hover:text-gray-900"}
      `}
		>
			{label}

			{/* верхний левый угол */}
			<span className="pointer-events-none absolute left-0 top-0 scale-0 group-hover:scale-100 transition-transform duration-200 origin-top-left">
				<span className="absolute left-0 top-0 w-[10px] h-[2px] bg-black"></span>
				<span className="absolute left-0 top-0 w-[2px] h-[10px] bg-black"></span>
			</span>

			{/* нижний правый угол */}
			<span className="pointer-events-none absolute right-0 bottom-0 scale-0 group-hover:scale-100 transition-transform duration-200 origin-bottom-right">
				<span className="absolute right-0 bottom-0 w-[10px] h-[2px] bg-black"></span>
				<span className="absolute right-0 bottom-0 w-[2px] h-[10px] bg-black"></span>
			</span>
		</Link>
	);
}
