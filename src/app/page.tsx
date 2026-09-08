export const dynamic = 'force-dynamic';

import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
    </>
  );
}
