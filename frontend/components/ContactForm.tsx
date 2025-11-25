"use client";

import { useState } from "react";

type ValidationErrors = {
	firstName?: string;
	lastName?: string;
	email?: string;
	subject?: string;
	message?: string;
};

export default function ContactForm() {
	const [loading, setLoading] = useState(false);
	const [sent, setSent] = useState(false);
	const [errors, setErrors] = useState<ValidationErrors>({});
	const [touched, setTouched] = useState<Set<string>>(new Set());

	const validateField = (name: string, value: string): string | undefined => {
		switch (name) {
			case "firstName":
			case "lastName":
				if (!value.trim()) return "This field is required";
				if (value.trim().length < 2) return "Must be at least 2 characters";
				if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value)) return "Only letters allowed";
				break;
			case "email":
				if (!value.trim()) return "Email is required";
				if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
				break;
			case "subject":
				if (!value.trim()) return "Subject is required";
				if (value.trim().length < 3) return "Must be at least 3 characters";
				break;
			case "message":
				if (!value.trim()) return "Message is required";
				if (value.trim().length < 10) return "Must be at least 10 characters";
				break;
		}
		return undefined;
	};

	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		const error = validateField(name, value);
		
		setErrors(prev => ({
			...prev,
			[name]: error
		}));
		
		setTouched(prev => new Set(prev).add(name));
	};

	async function handleSubmit(e: any) {
		e.preventDefault();
		
		// Validate all fields
		const form = new FormData(e.target);
		const data = Object.fromEntries(form.entries());
		const newErrors: ValidationErrors = {};
		let hasErrors = false;

		Object.entries(data).forEach(([name, value]) => {
			const error = validateField(name, value as string);
			if (error) {
				newErrors[name as keyof ValidationErrors] = error;
				hasErrors = true;
			}
		});

		setErrors(newErrors);
		
		// Mark all fields as touched on submit attempt
		setTouched(new Set(Object.keys(data)));

		if (hasErrors) {
			return;
		}

		setLoading(true);

		const res = await fetch("/api/contact", {
			method: "POST",
			body: JSON.stringify(data),
		});

		setLoading(false);

		if (res.ok) {
			setSent(true);
			e.target.reset();
			setErrors({});
			setTouched(new Set());
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="space-y-2">
				<div className="grid grid-cols-2 gap-5">
					<div>
						<label htmlFor="firstName" className="block mb-2 font-medium">
							First Name
						</label>
						<input
							id="firstName"
							name="firstName"
							placeholder="First Name"
							onChange={handleFieldChange}
							className={`border p-3 rounded-lg w-full bg-white ${
								touched.has("firstName") && errors.firstName ? "border-red-500" : ""
							}`}
						/>
						{touched.has("firstName") && errors.firstName && (
							<p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
						)}
					</div>
					<div>
						<label htmlFor="lastName" className="block mb-2 font-medium">
							Last Name
						</label>
						<input
							id="lastName"
							name="lastName"
							placeholder="Last Name"
							onChange={handleFieldChange}
							className={`border p-3 rounded-lg w-full bg-white ${
								touched.has("lastName") && errors.lastName ? "border-red-500" : ""
							}`}
						/>
						{touched.has("lastName") && errors.lastName && (
							<p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
						)}
					</div>
				</div>

				<div>
					<label htmlFor="email" className="block mb-2 font-medium">
						Email Address
					</label>
					<input
						id="email"
						type="email"
						name="email"
						placeholder="Email Address"
						onChange={handleFieldChange}
						className={`border p-3 rounded-lg w-full bg-white ${
							touched.has("email") && errors.email ? "border-red-500" : ""
						}`}
					/>
					{touched.has("email") && errors.email && (
						<p className="text-red-500 text-sm mt-1">{errors.email}</p>
					)}
				</div>

				<div>
					<label htmlFor="subject" className="block mb-2 font-medium">
						Subject
					</label>
					<input
						id="subject"
						name="subject"
						placeholder="Subject"
						onChange={handleFieldChange}
						className={`border p-3 rounded-lg w-full bg-white ${
							touched.has("subject") && errors.subject ? "border-red-500" : ""
						}`}
					/>
					{touched.has("subject") && errors.subject && (
						<p className="text-red-500 text-sm mt-1">{errors.subject}</p>
					)}
				</div>

				<div>
					<label htmlFor="message" className="block mb-2 font-medium">
						Message
					</label>
					<textarea
						id="message"
						name="message"
						placeholder="Message..."
						rows={6}
						onChange={handleFieldChange}
						className={`border p-3 rounded-lg w-full bg-white ${
							touched.has("message") && errors.message ? "border-red-500" : ""
						}`}
					/>
					{touched.has("message") && errors.message && (
						<p className="text-red-500 text-sm mt-1">{errors.message}</p>
					)}
				</div>

				{/* BUTTON */}
				<button
					type="submit"
					disabled={loading}
					className="px-6 py-3 bg-secondary hover:bg-secondary-dark text-white rounded-full 
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
