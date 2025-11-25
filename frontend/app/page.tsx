import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VideoPromo from "@/components/VideoPromo";
import ProblemsGrid from "@/components/ProblemsGrid";
import ChooseRole from "@/components/ChooseRole";
import Reveal from "@/components/animations/Reveal";
import OwnerSection from "@/components/roles/OwnerSection";
import StudentSection from "@/components/roles/StudentSection";
import StatsSection from "@/components/StatsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
	return (
		<main className="bg-gray-100 min-h-screen">
			<Navbar />

			<div className="
				flex flex-col md:flex-row
				justify-between items-center
				container mx-auto px-4
			">
				<Reveal>
					<HeroSection />
				</Reveal>
				<Reveal>
					<VideoPromo />
				</Reveal>
			</div>
			<ProblemsGrid />
			<ChooseRole />
			<StudentSection />
			<OwnerSection />
			<StatsSection />
			<ContactSection />
		</main>
	);
}