import Image from "next/image";
import IconFeature from "./IconFeature";

export default function OwnerSection() {
	return (
		<section className="w-full py-20 bg-white">

			<h2 className="text-center text-3xl md:text-4xl font-bold mb-16 text-[#3FA8A4]">
				If you are a Problem Owner
			</h2>

			<div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">

				{/* Левая колонка — icon boxes */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-10 order-2 lg:order-1">

					<IconFeature image="/save-time.jpg" title="Save time" />
					<IconFeature image="/save-money.jpg" title="Save money" />
					<IconFeature image="/solutions.jpg" title="Get practical solutions" />
					<IconFeature image="/find-pro.jpg" title="Find professionals" />

					<div className="col-span-1 sm:col-span-2 flex justify-center">
						<a
							href="/register?role=owner"
							className="
								px-6 py-3 
								bg-[#11253B] 
								text-white 
								rounded-full 
								shadow 
								transition-all duration-300
								hover:bg-[#3FA8A4]
								hover:text-[#FCD34D]
								hover:-translate-y-1
								hover:shadow-lg
							"
						>
							Apply as an Owner
						</a>

					</div>
				</div>

				{/* Правая — большая картинка */}
				<div className="flex justify-center order-1 lg:order-2">
					<Image
						src="/owner-big.jpg"
						alt="Happy owner"
						width={984}
						height={929}
						className="w-full max-w-lg object-cover rounded-xl shadow-lg animate-float"
					/>
				</div>

			</div>

		</section>
	);
}
