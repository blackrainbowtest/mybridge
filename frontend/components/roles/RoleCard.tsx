import Image from "next/image";
import Link from "next/link";

export default function RoleCard({
	title,
	image,
	description,
	buttonText,
	link,
}: {
	title: string;
	image: string;
	description: string;
	buttonText: string;
	link: string;
}) {
	return (
		<div
			className="
			bg-secondary 
			border-t-4 border-accent
			rounded-xl overflow-hidden
			shadow-lg 
			transition-all duration-300
			hover:brightness-95 hover:shadow-xl
		"
		>
			{/* Заголовок */}
			<h3 className="text-2xl font-semibold text-white text-center py-6">
				{title}
			</h3>

			{/* Картинка */}
			<div className="w-full flex justify-center">
				<Image
					src={image}
					alt={title}
					width={800}
					height={800}
					className="
		w-64 h-64   /* mobile: 256px */
		sm:w-72 sm:h-72  /* tablet: 288px */
		md:w-80 md:h-80  /* small desktop: 320px */
		lg:w-[420px] lg:h-[420px]  /* desktop: 420px */
		xl:w-[500px] xl:h-[500px]  /* big desktop: 500px */
		object-cover rounded-xl shadow-md
	"
				/>
			</div>

			{/* Описание */}
			<p className="text-white text-center px-6 py-4 text-[18px] leading-snug">
				{description}
			</p>

			{/* Кнопка */}
			<div className="text-center pb-6">
				<Link
					href={link}
					className="
				inline-block
				px-6 py-3
				bg-white text-primary
				font-semibold
				rounded-full
				shadow
				hover:bg-accent
				hover:text-primary
				transition-all
			"
				>
					{buttonText}
				</Link>
			</div>
		</div>
	);
}
