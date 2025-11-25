"use client";

import Image from "next/image";
import ContactForm from "./ContactForm";

export default function ContactSection() {

	return (
		<section className="w-full py-20 px-6 text-[#11253B] bg-[#FCD34D]">
			<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

				{/* LEFT IMAGE */}
				<div className="relative">
					<Image
						src="/Grow-Your-Business.png"
						alt="Grow your business"
						width={600}
						height={700}
						className="rounded-lg drop-shadow-xl animate-float"
					/>
				</div>

			{/* RIGHT CONTENT */}
			<div>
				<div className="border-l-[8px] pl-10">
					<h2 className="text-4xl font-semibold  mb-2">
						GET IN TOUCH
					</h2>
					<h3 className="text-3xl font-bold mb-10 text-[#3FA8A4]">
						Send us a Message
					</h3>
				</div>
				<h3 className="text-3xl font-bold mb-10">
					Simple Contact Form
				</h3>
				
				{/* FORM */}
				<ContactForm />
			</div>
			</div>
		</section>
	);
}
