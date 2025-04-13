import { FAQ } from "@/components/marketing/faq";
import { HeroSection } from "@/components/marketing/hero-section";
import { PageWrapper } from "@/components/wrappers/page-wrapper";

export default function Home() {
  return (
    <PageWrapper>
      <HeroSection />
      <FAQ />
    </PageWrapper>
  );
}
