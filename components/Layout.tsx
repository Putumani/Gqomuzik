import { ReactNode } from 'react';
import Navbar from './NavBar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  toggleUploader: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, toggleUploader }) => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-gray-300 to-gray-200 text-white">
      <Navbar toggleUploader={toggleUploader} />
      <div className="mt-8" />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;


