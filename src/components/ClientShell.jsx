"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import AdminTopBar from "@/components/AdminTopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { EnquiryProvider } from "@/context/EnquiryContext";

// ── Lazy client-only components ──────────────────────────────────────────────
// Each gets a no-op fallback so the shell never blocks on these chunks.
const EnquiryPopup = dynamic(() => import("@/components/EnquiryPopup"), {
  ssr: false,
  loading: () => null,
});

const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), {
  ssr: false,
  loading: () => null,
});

// Skeleton prevents layout shift on mobile while the chunk loads.
const MobileBottomNav = dynamic(() => import("@/components/MobileBottomNav"), {
  ssr: false,
  loading: () => <div style={{ height: 64 }} aria-hidden />,
});

const StudentLoginButton = dynamic(() => import("./StudentLoginButton"), {
  ssr: false,
  loading: () => null,
});

function useSplash() {
  // Always start as false (matches server render — no splash on SSR)
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Now we're on the client — safe to read sessionStorage
    if (sessionStorage.getItem("miu-splash-seen")) return;

    sessionStorage.setItem("miu-splash-seen", "true");
    setVisible(true); // trigger splash after hydration
  }, []);

  useEffect(() => {
    if (!visible) return;

    const fade = setTimeout(() => setFading(true), 800);
    const remove = setTimeout(() => setVisible(false), 1300);

    return () => {
      clearTimeout(fade);
      clearTimeout(remove);
    };
  }, [visible]);

  return { visible, fading };
}

// ── Shell ────────────────────────────────────────────────────────────────────
export default function ClientShell({ children }) {
  const { visible: showSplash, fading: fadeSplash } = useSplash();

  return (
    <AuthProvider>
      <EnquiryProvider>
        <AdminTopBar />

        <div className="app-container">
          {showSplash && (
            <div className={`splash-screen${fadeSplash ? " fade-out" : ""}`}>
              <div className="splash-content">
                <Image
                  src="/emblem.webp"
                  alt="MIU Logo"
                  className="splash-logo"
                  width={150}
                  height={150}
                  priority
                />

                <div className="splash-miu-blocks" aria-hidden>
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

          {/* Deferred, non-critical UI — rendered after main content */}
          <WhatsAppButton />
          <StudentLoginButton />
          <EnquiryPopup />
          <MobileBottomNav />
        </div>
      </EnquiryProvider>
    </AuthProvider>
  );
}
