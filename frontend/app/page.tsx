import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VideoPromo from "@/components/VideoPromo";

export default function Home() {
  return (
    <main>
      <Navbar />

      <div className="flex justify-between">
        <HeroSection />
        <VideoPromo />
      </div>
    </main>
  );
}