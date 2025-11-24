"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	const navItem = (href: string, label: string) => {
		const active = pathname === href;

		return (
			<Link
				href={href}
				onClick={() => setOpen(false)}
				className={`
			block py-3 px-4 text-lg cursor-pointer transition-all
			${active ? "font-bold text-gray-900" : "text-gray-700"}
			hover:bg-[#FCD34D] hover:text-[#11253B]
		`}
			>
				{label}
			</Link>
		);
	};

	return (
		<>
			{/* BURGER / CLOSE BUTTON */}
			<button
				className={`
	md:hidden text-3xl w-10 h-10 flex items-center justify-center rounded-md
	cursor-pointer transition-all

	${open
						? "bg-[#FCD34D] text-[#11253B]"        // меню открыто → жёлтый
						: "bg-transparent text-gray-800"}       // меню закрыто → прозрачный

	${open
						? ""                                   // открыто → hover не меняем
						: "hover:bg-gray-200 hover:text-gray-900"}  // закрыто → hover серый
	`}
				onClick={() => setOpen(!open)}
			>
				{open ? "×" : "☰"}
			</button>

			{/* DROPDOWN MENU */}
			{open && (
				<div
					className="
			absolute top-20 left-0 w-full
			bg-white shadow-lg z-50
			md:hidden animate-[fadeDown_0.25s_ease]
			"
				>
					{navItem("/", "Home")}
					{navItem("/submit", "Submit Project")}

					{/* Mobile version of Join Now */}
					<Link
						href="/register"
						onClick={() => setOpen(false)}
						className="
				block py-3 px-4 text-lg cursor-pointer
				bg-[#11253B] text-white
				hover:bg-[#FCD34D] hover:text-[#11253B]
				transition-all font-semibold
			"
					>
						Join Now
					</Link>
				</div>
			)}
		</>
	);
}
