import { useLocation } from "react-router-dom";
import { ROUTES } from "../../../constants/routes.constants";
import Button from "../../Button/Button";
import "./Header.css";

const Header: React.FC = () => {
  const { pathname } = useLocation();

  const isActive = (route: string) => pathname === route;

  return (
    <nav className="navbar container mx-auto">
      <div className="navbar__logo">
        <img src="/assets/icons/jamila-logo.svg" alt="Logo" />
      </div>
      <ul className="navbar__nav">
        <li>
          <a href={ROUTES.HOME} className={isActive(ROUTES.HOME) ? "active" : ""}>Home</a>
        </li>
        <li>
          <a href={ROUTES.ABOUT} className={isActive(ROUTES.ABOUT) ? "active" : ""}>About Us</a>
        </li>
        <li>
          <a href={ROUTES.MENU} className={isActive(ROUTES.MENU) ? "active" : ""}>Menu</a>
        </li>
        <li>
          <a href={ROUTES.CONTACT} className={isActive(ROUTES.CONTACT) ? "active" : ""}>Contact Us</a>
        </li>
      </ul>
      <Button to={ROUTES.PARTNERSHIP}>
        Franchise
      </Button>
    </nav>
  );
};

export default Header;
