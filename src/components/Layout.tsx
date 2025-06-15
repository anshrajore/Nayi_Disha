import React from 'react';
import Header from './Header';
import Footer from './Footer';
import VapiAgent from './VapiAgent';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-full max-w-full overflow-x-hidden">
        {children}
      </main>
      <Footer />
      <VapiAgent />
    </div>
  );
};

export default Layout;
