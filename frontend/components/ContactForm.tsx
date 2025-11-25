"use client";

import { useState } from "react";

export default function ContactForm() {
	const [loading, setLoading] = useState(false);
	const [sent, setSent] = useState(false);

	async function handleSubmit(e: any) {
		e.preventDefault();
		setLoading(true);

		const form = new FormData(e.target);
		const data = Object.fromEntries(form.entries());

		const res = await fetch("/api/contact", {
			method: "POST",
			body: JSON.stringify(data),
		});

		setLoading(false);

		if (res.ok) {
			setSent(true);
			e.target.reset();
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="grid grid-cols-2 gap-5">
					<input
						name="firstName"
						placeholder="First Name"
						required
						className="border p-3 rounded-lg w-full"
					/>
					<input
						name="lastName"
						placeholder="Last Name"
						required
						className="border p-3 rounded-lg w-full"
					/>
				</div>

				<input
					type="email"
					name="email"
					placeholder="Email Address"
					required
					className="border p-3 rounded-lg w-full"
				/>

				<input
					name="subject"
					placeholder="Subject"
					required
					className="border p-3 rounded-lg w-full"
				/>

				<textarea
					name="message"
					placeholder="Message..."
					rows={6}
					required
					className="border p-3 rounded-lg w-full"
				/>

				{/* BUTTON */}
				<button
					type="submit"
					disabled={loading}
					className="px-6 py-3 bg-[#3FA8A4] hover:bg-[#2b8683] text-white rounded-full 
                         transition transform hover:-translate-y-1"
				>
					{loading ? "Sending..." : "Send Message"}
				</button>
			</form>

			{sent && (
				<p className="text-green-600 mt-3">
					Message sent successfully!
				</p>
			)}
		</>
	);
}
