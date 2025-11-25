import Image from "next/image";

export default function IconFeature({ image, title }: {
	image: string;
	title: string;
}) {
	return (
		<div className="flex flex-col items-center text-center">
			<Image
				src={image}
				alt={title}
				width={190}
				height={190}
				className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover rounded-full shadow"
			/>
			<h3 className="mt-4 text-xl font-semibold leading-snug !text-secondary">
				{title}
			</h3>
		</div>
	);
}
