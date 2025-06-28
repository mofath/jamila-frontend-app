import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "./Layout.css";
import { AuthModal } from "../../containers/AuthModal/AuthModal";
import CartDrawer from "../../containers/CartDrawer/CartDrawer";

const Layout: React.FC = () => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="layout-container">
      <Header onLoginClick={() => setAuthModalOpen(true)} />
      <main className="main-content">
        <Outlet />
        <CartDrawer />
      </main>
      <Footer />
      {isAuthModalOpen && (
        <AuthModal onClose={() => setAuthModalOpen(false)} />
      )}{" "}
    </div>
  );
};

export default Layout;
