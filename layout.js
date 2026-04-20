import './globals.css';

export const metadata = {
  title: 'LLBAI',
  description: 'Practical legal intelligence for Law Learning Bench'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
