import { FAQ } from "@/components/home/faq";
import { HeroSection } from "@/components/home/hero-section";
import { PageWrapper } from "@/components/wrappers/page-wrapper";
import Image from "next/image";

export default function Home() {
  return (
    <PageWrapper>
      <HeroSection />
      <FAQ />
    </PageWrapper>
  );
}
