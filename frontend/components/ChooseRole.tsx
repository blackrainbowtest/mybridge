import RoleCard from "@/components/RoleCard";

export default function ChooseRole() {
  return (
    <section className="w-full py-20 px-5 bg-white">
      
      {/* Заголовок */}
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
        Choose your role & start solving them!
      </h2>

      {/* Две карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">

        {/* Student Card */}
        <RoleCard
          title="Students"
          image="/student.png"
          description="You are eager to learn but face difficulties applying your knowledge or finding hands-on experience."
          buttonText="Apply as a Student"
          link="/register?role=student"
        />

        {/* Business Card */}
        <RoleCard
          title="SMEs & Initiatives"
          image="/business.png"
          description="You are a problem owner who needs resources but lacks enough time, money, or knowledge."
          buttonText="Apply as an Owner"
          link="/register?role=owner"
        />

      </div>
    </section>
  );
}
