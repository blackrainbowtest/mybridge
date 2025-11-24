import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VideoPromo from "@/components/VideoPromo";

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
    </main>
  );
}