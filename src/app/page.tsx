export const dynamic = 'force-dynamic';

import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FeaturedWorkers } from "@/components/FeaturedWorkers";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWorkers />
      <CategoryGrid />
    </>
  );
}
