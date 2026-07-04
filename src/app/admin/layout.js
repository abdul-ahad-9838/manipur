// app/admin/layout.jsx

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return <>{children}</>;
}
