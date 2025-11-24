import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VideoPromo from "@/components/VideoPromo";
import ProblemsGrid from "@/components/ProblemsGrid";
import ChooseRole from "@/components/ChooseRole";

export default function Home() {
  return (
    <main>
      <Navbar />

      <div className="
        flex flex-col md:flex-row
        justify-between items-center
      ">
        <HeroSection />
        <VideoPromo />
      </div>
      <ProblemsGrid />
      <ChooseRole />
    </main>
  );
}