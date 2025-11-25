import Image from "next/image";
import IconFeature from "./IconFeature";

export default function StudentSection() {
	return (
		<section className="w-full py-20 bg-white">

			{/* Заголовок */}
			<h2 className="text-center text-3xl md:text-4xl font-bold mb-16 text-secondary">
				If you are a Student
			</h2>

			<div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">

				{/* Левая сторона — большая картинка */}
				<div className="flex justify-center">
					<Image
						src="/student-big.jpg"
						alt="Happy student"
						width={925}
						height={961}
						className="w-full max-w-lg object-cover rounded-xl shadow-lg animate-float"
					/>
				</div>

				{/* Правая сторона — icon boxes */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
					<IconFeature image="/unlock.jpg" title="Unlock your potential" />
					<IconFeature image="/discover.jpg" title="Discover your strengths" />
					<IconFeature image="/realworld.jpg" title="Work on real-world problems" />
					<IconFeature image="/hands-on.jpg" title="Gain hands-on experience" />

					{/* Кнопка */}
					<div className="col-span-1 sm:col-span-2 flex justify-center">
						<a
							href="/register?role=student"
							className="
								px-6 py-3 
								bg-primary 
								text-white 
								rounded-full 
								shadow 
								transition-all duration-300
								hover:bg-secondary
								hover:text-accent
								hover:-translate-y-1
								hover:shadow-lg
							"
						>
							Apply as a Student
						</a>
					</div>

				</div>

			</div>

		</section>
	);
}
