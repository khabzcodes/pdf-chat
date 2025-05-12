import { Hero } from "@/components/landing/hero";
import { Navbar } from "@/components/landing/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
    </div>
  );
}
