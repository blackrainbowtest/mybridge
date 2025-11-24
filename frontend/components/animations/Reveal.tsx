"use client";

import { useRef, useEffect, useState } from "react";

export default function Reveal({ children }: { children: React.ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setVisible(true);
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.15 }
		);

		if (ref.current) observer.observe(ref.current);

		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			className={`w-full transition-all duration-700 ease-out
		${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
	`}
		>
			{children}
		</div>
	);
}
