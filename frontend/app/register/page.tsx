"use client";
import RegisterForm from "@/components/RegisterForm";
import { useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") === "owner" ? "owner" : "student";

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent">
      <RegisterForm role={role} />
    </div>
  );
}
