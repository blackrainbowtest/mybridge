export default function ProblemsGrid() {
  return (
    <section className="w-full py-20 px-5 bg-white text-black">

      {/* Заголовок */}
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
        If you can find one related problem,<br />
        you are in the right place
      </h2>

      {/* Сетка: 4 колонки */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">

        {/* Колонка 1 */}
        <div className="space-y-5 text-lg">
          <p>1.1 Lack of experience</p>
          <p>1.2 Expensive workforce</p>
          <p>1.3 No try-fail space</p>
        </div>

        {/* Колонка 2 */}
        <div className="space-y-5 text-lg">
          <p>2.1 High solution costs</p>
          <p>2.2 Inefficient education</p>
        </div>

        {/* Колонка 3 */}
        <div className="space-y-5 text-lg">
          <p>3.1 Lack of resources</p>
          <p>3.2 Hidden talent</p>
        </div>

        {/* Колонка 4 */}
        <div className="space-y-5 text-lg">
          <p>4.1 Hands-on skill shortages</p>
          <p>4.2 Unclear career path</p>
          <p>4.3 Onboarding challenges</p>
        </div>

      </div>

    </section>
  );
}
