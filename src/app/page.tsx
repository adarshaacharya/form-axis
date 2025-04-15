import { FAQ } from "@/components/marketing/faq";
import { HeroSection } from "@/components/marketing/hero-section";
import { PageWrapper } from "@/components/wrappers/page-wrapper";
import { Features } from "@/components/marketing/features";

export default function Home() {
  return (
    <PageWrapper>
      <main>
        <HeroSection />
        <Features />
        <FAQ />
      </main>
    </PageWrapper>
  );
}
