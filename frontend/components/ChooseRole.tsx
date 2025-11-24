import RoleCard from "@/components/roles/RoleCard";
import Reveal from "@/components/animations/Reveal";

export default function ChooseRole() {
  return (
    <section className="w-full py-32 px-5 bg-white text-[#11253B]">

      {/* Заголовок */}
      <Reveal>
        <h2 className="text-center text-4xl md:text-5xl font-semibold mb-20 leading-tight">
          Choose your role & start solving them!
        </h2>
      </Reveal>

      {/* Две карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 max-w-6xl mx-auto">

        <Reveal>
          <RoleCard
            title="Students"
            image="/Student.jpg"
            description="You are eager to learn but face difficulties applying your knowledge or finding hands-on experience."
            buttonText="Apply as a Student"
            link="/register?role=student"
          />
        </Reveal>

        <Reveal>
          <RoleCard
            title="SMEs & Initiatives"
            image="/Owner.jpg"
            description="You are a problem owner who needs resources but lacks enough time, money, or knowledge."
            buttonText="Apply as an Owner"
            link="/register?role=owner"
          />
        </Reveal>

      </div>

    </section>
  );
}
