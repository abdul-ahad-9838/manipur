// app/admin/layout.jsx

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }) {
  return <>{children}</>;
}
