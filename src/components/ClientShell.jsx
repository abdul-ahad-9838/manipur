"use client";

import AdminTopBar from "@/components/AdminTopBar";
import EnquiryPopup from "@/components/EnquiryPopup";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { AuthProvider } from "@/context/AuthContext";
import { EnquiryProvider } from "@/context/EnquiryContext";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ClientShell({ children }) {
  const [mounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);

  // Only run splash after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setFadeSplash(true);
      setTimeout(() => setShowSplash(false), 500);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <EnquiryProvider>
        <AdminTopBar />
        <div className="app-container">
          {mounted && showSplash && (
            <div className={`splash-screen s${fadeSplash ? "fade-out" : ""}`}>
              <div className="splash-content">
                {/* <img src="/emblem.png" alt="MIU Logo" className="splash-logo" /> */}
                <Image
                  src="/emblem.png"
                  alt="MIU Logo"
                  className="splash-logo"
                  width={200}
                  height={200}
                />
                <div className="splash-miu-blocks">
                  <span>M</span>
                  <span>I</span>
                  <span>U</span>
                </div>
              </div>
            </div>
          )}
          {/* <AdvisoryPopup /> */}
          <Navbar />
          <WhatsAppButton />
          <EnquiryPopup />
          <main>{children}</main>
          <Footer />
          <MobileBottomNav />
        </div>
      </EnquiryProvider>
    </AuthProvider>
  );
}
