interface Props {
  title: string;
  image: string;
  description: string;
  buttonText: string;
  link: string;
}

export default function RoleCard({ title, image, description, buttonText, link }: Props) {
  return (
    <div
      className="
        bg-emerald-500 
        border-t-[3px] border-yellow-300 
        rounded-xl p-8 
        text-white shadow-lg
        transition
        hover:bg-emerald-600
        flex flex-col items-center
      "
    >
      {/* Заголовок */}
      <h3 className="text-2xl font-bold mb-4">{title}</h3>

      {/* Картинка */}
      <img
        src={image}
        alt={title}
        className="w-40 h-40 object-cover rounded-md mb-6"
      />

      {/* Описание */}
      <p className="text-center text-lg mb-8">
        {description}
      </p>

      {/* Кнопка */}
      <a
        href={link}
        className="
          bg-blue-900 text-white 
          px-6 py-3 rounded-full 
          hover:bg-blue-800 
          transition text-center
        "
      >
        {buttonText}
      </a>
    </div>
  );
}
