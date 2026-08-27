export const dynamic = 'force-dynamic';

import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FeaturedWorkers } from "@/components/FeaturedWorkers";
import { SIHDemoSection } from "@/components/SIHDemoSection";

export default function Home() {
  return (
    <>
      <SIHDemoSection />
      <Hero />
      <FeaturedWorkers />
      <CategoryGrid />
    </>
  );
}
