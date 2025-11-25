"use client";

import Reveal from "@/components/animations/Reveal";

export default function StatsSection() {
	return (
		<section className="w-full py-20 bg-white">

		{/* Заголовок */}
		<Reveal>
			<h2 className="
				text-center
				font-bold
				text-secondary
				text-4xl md:text-5xl lg:text-6xl
				mb-16
				leading-tight
			">
				Now let the numbers talk
			</h2>
		</Reveal>			{/* Контейнер */}
			<div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

				{/* Карточка 1 */}
				<Reveal delay={0.1}>
					<div className="
            bg-secondary
            rounded-xl
            shadow-lg
            p-6
            flex flex-col items-center text-center
            border border-secondary-darker
            h-full
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-xl
          ">
						{/* Круг */}
						<div className="
              w-24 h-24
              rounded-full
              bg-accent
              flex items-center justify-center
              text-3xl font-bold
              text-primary
            ">
							80%
						</div>

						{/* Текст */}
						<p className="mt-6 text-accent text-xl leading-snug">
							of students lack practical experience and struggle to
							understand job market requirements.
						</p>
					</div>
				</Reveal>

				{/* Карточка 2 */}
				<Reveal delay={0.2}>
					<div className="
            bg-secondary
            rounded-xl
            shadow-lg
            p-6
            flex flex-col items-center text-center
            border border-secondary-darker
            h-full
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-xl
          ">
						<div className="
              w-24 h-24
              rounded-full
              bg-accent
              flex items-center justify-center
              text-3xl font-bold
              text-primary
            ">
							80%
						</div>

						<p className="mt-6 text-accent text-xl leading-snug">
							of SMEs face a shortage of professional resources.
						</p>
					</div>
				</Reveal>

				{/* Карточка 3 */}
				<Reveal delay={0.3}>
					<div className="
            bg-secondary
            rounded-xl
            shadow-lg
            p-6
            flex flex-col items-center text-center
            border border-secondary-darker
            h-full
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-xl
          ">
						<div className="
              w-24 h-24
              rounded-full
              bg-accent
              flex items-center justify-center
              text-3xl font-bold
              text-primary
            ">
							86%
						</div>

						<p className="mt-6 text-accent text-xl leading-snug">
							of workplace issues come from junior employees’ lack of skills.
						</p>
					</div>
				</Reveal>

			</div>
		</section>
	);
}
