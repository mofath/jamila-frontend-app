import { Outlet } from 'react-router-dom';
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "./Layout.css";

const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">
        <Outlet /> {/* This is where the routed page will render */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
