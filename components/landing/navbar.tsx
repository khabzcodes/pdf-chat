"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Menu, X, FileText } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur px-5">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">PDFChat</span>
        </div>

        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>

            {isMenuOpen && (
              <div className="absolute top-16 left-0 right-0 bg-white border-b p-4 flex flex-col gap-2">
                <Link href="#features" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Features
                  </Button>
                </Link>
                <Link href="#how-it-works" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    How it works
                  </Button>
                </Link>
                <Link href="#pricing" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Pricing
                  </Button>
                </Link>
                <Link href="#faq" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    FAQ
                  </Button>
                </Link>
                <Button>Get Started</Button>
              </div>
            )}
          </>
        ) : (
          <>
            <nav className="flex items-center gap-6">
              <Link
                href="#features"
                className="text-sm font-medium transition-colors"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium transition-colors"
              >
                How it works
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#faq"
                className="text-sm font-medium transition-colors"
              >
                FAQ
              </Link>
            </nav>
            <Link href="/chat" className={buttonVariants({ size: "sm" })}>
              Chat now
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
