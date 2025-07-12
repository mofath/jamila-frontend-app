import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { AuthModal } from "../../containers/AuthModal/AuthModal";
import CartDrawer from "../../containers/CartDrawer/CartDrawer";
import { useAuthModal } from "../../containers/AuthModal/AuthModalContext";
import "./Layout.css";

const Layout: React.FC = () => {
  const { isAuthModalOpen, openAuthModal, closeAuthModal } = useAuthModal();

  return (
    <div className="layout-container">
      <Header onLoginClick={openAuthModal} />
      <main className="main-content">
        <Outlet />
        <CartDrawer />
      </main>
      <Footer />
      {isAuthModalOpen && (
        <AuthModal onClose={closeAuthModal} />
      )}{" "}
    </div>
  );
};

export default Layout;
