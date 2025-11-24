import Reveal from "./animations/Reveal";

export default function ProblemsGrid() {
  return (
    <section className="w-full py-32 px-5 bg-white text-[#11253B]">

      {/* Заголовок */}
      <Reveal>
        <h2 className="text-center text-4xl md:text-5xl font-semibold mb-20 leading-tight">
          If you can find one related problem,<br />
          you are in the right place.
        </h2>
      </Reveal>

      {/* Сетка */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 max-w-6xl mx-auto">

        {/* Колонка 1 */}
        <Reveal>
          <div className="space-y-6 text-[20px] leading-snug">
            <p className="hover:text-[#3FA8A4] transition">Lack of experience</p>
            <p className="hover:text-[#3FA8A4] transition">Expensive workforce</p>
            <p className="hover:text-[#3FA8A4] transition">No try-fail space</p>
          </div>
        </Reveal>

        {/* Колонка 2 */}
        <Reveal>
          <div className="space-y-6 text-[20px] leading-snug">
            <p className="hover:text-[#3FA8A4] transition">High solution costs</p>
            <p className="hover:text-[#3FA8A4] transition">Inefficient education</p>
          </div>
        </Reveal>

        {/* Колонка 3 */}
        <Reveal>
          <div className="space-y-6 text-[20px] leading-snug">
            <p className="hover:text-[#3FA8A4] transition">Lack of resources</p>
            <p className="hover:text-[#3FA8A4] transition">Hidden talent</p>
          </div>
        </Reveal>

        {/* Колонка 4 */}
        <Reveal>
          <div className="space-y-6 text-[20px] leading-snug">
            <p className="hover:text-[#3FA8A4] transition">Hands-on skill shortages</p>
            <p className="hover:text-[#3FA8A4] transition">Unclear career path</p>
            <p className="hover:text-[#3FA8A4] transition">Onboarding challenges</p>
          </div>
        </Reveal>

      </div>

    </section>
  );
}
