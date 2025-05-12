import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileUp } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Chat with your PDFs using AI
            </h1>
            <p className="text-xl text-gray-500 max-w-[600px] mx-auto">
              Upload your PDF documents and get instant answers to your
              questions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center">
            <Link href="/chat" className={buttonVariants({ size: "sm" })}>
              <FileUp className="h-4 w-4" />
              Upload PDF
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
