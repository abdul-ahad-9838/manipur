"use client";
import dynamic from "next/dynamic";

import AdminTopBar from "@/components/AdminTopBar";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { EnquiryProvider } from "@/context/EnquiryContext";

// ── Lazy client-only components ──────────────────────────────────────────────
// Each gets a no-op fallback so the shell never blocks on these chunks.
// const EnquiryPopup = dynamic(() => import("@/components/EnquiryPopup"), {
//   ssr: false,
//   loading: () => null,
// });

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

// ── Shell ────────────────────────────────────────────────────────────────────
export default function ClientShell({ children }) {
  return (
    <AuthProvider>
      <EnquiryProvider>
        <AdminTopBar />

        <div className="app-container">
          <Navbar />

          <main>{children}</main>

          {/* Deferred, non-critical UI — rendered after main content */}
          <WhatsAppButton />
          <StudentLoginButton />
          {/* <EnquiryPopup /> */}
          <MobileBottomNav />
        </div>
      </EnquiryProvider>
    </AuthProvider>
  );
}
