// Payment pages have no navbar/footer — standalone layout
export const metadata = {
  title: 'Online Payment | Manipur International University',
  description: 'Secure online payment portal for Manipur International University.',
  robots: 'noindex, nofollow', // Hidden from search engines
};

export default function PayOnlineLayout({ children }) {
  return (
    <div style={{ fontFamily: 'inherit' }}>
      {children}
    </div>
  );
}
