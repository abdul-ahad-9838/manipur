"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import AdminTopBar from "@/components/AdminTopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { EnquiryProvider } from "@/context/EnquiryContext";

const EnquiryPopup = dynamic(() => import("@/components/EnquiryPopup"), {
  ssr: false,
});

const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), {
  ssr: false,
});

const MobileBottomNav = dynamic(() => import("@/components/MobileBottomNav"), {
  ssr: false,
});

const StudentLoginButton = dynamic(() => import("./StudentLoginButton"), {
  ssr: false,
});

export default function ClientShell({ children }) {
  const [showSplash, setShowSplash] = useState(false);
  const [fadeSplash, setFadeSplash] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const splashSeen = sessionStorage.getItem("miu-splash-seen");

    if (splashSeen) return;

    sessionStorage.setItem("miu-splash-seen", "true");
    setShowSplash(true);

    const fadeTimer = setTimeout(() => {
      setFadeSplash(true);
    }, 800);

    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 1100);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <AuthProvider>
      <EnquiryProvider>
        <AdminTopBar />

        <div className="app-container">
          {showSplash && (
            <div className={`splash-screen ${fadeSplash ? "fade-out" : ""}`}>
              <div className="splash-content">
                <Image
                  src="/emblem.png"
                  alt="MIU Logo"
                  className="splash-logo"
                  width={200}
                  height={200}
                  priority
                />

                <div className="splash-miu-blocks">
                  <span>M</span>
                  <span>I</span>
                  <span>U</span>
                </div>
              </div>
            </div>
          )}

          <Navbar />

          <main>{children}</main>

          <Footer />

          <WhatsAppButton />
          <StudentLoginButton />
          <EnquiryPopup />
          <MobileBottomNav />
        </div>
      </EnquiryProvider>
    </AuthProvider>
  );
}
