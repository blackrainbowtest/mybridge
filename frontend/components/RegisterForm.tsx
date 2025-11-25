import { useState } from "react";

interface RegisterFormProps {
  role: "student" | "owner";
}

export default function RegisterForm({ role }: RegisterFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ role, firstName, lastName, description, image });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-secondary">
        {role === "student" ? "Student Registration" : "Employer Registration"}
      </h2>
      <div>
        <label className="block mb-2 font-medium text-primary">First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          className="border p-3 rounded-lg w-full bg-white"
          required
        />
      </div>
      <div>
        <label className="block mb-2 font-medium text-primary">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          className="border p-3 rounded-lg w-full bg-white"
          required
        />
      </div>
      <div>
        <label className="block mb-2 font-medium text-primary">Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border p-3 rounded-lg w-full bg-white"
          rows={4}
          required
        />
      </div>
      <div>
        <label className="block mb-2 font-medium text-primary">Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-secondary hover:bg-secondary-dark text-white rounded-full font-semibold transition"
      >
        Register
      </button>
    </form>
  );
}
