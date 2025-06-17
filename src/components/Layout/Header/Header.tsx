import { useLocation } from "react-router-dom";
import { ROUTES } from "../../../constants/routes.constants";
import Button from "../../Button/Button";
import "./Header.css";

interface HeaderProps {
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const { pathname } = useLocation();

  const isActive = (route: string) => pathname === route;

  return (
    <nav className="navbar container mx-auto">
      <div className="navbar__logo">
        <img src="/assets/icons/jamila-logo.svg" alt="Logo" />
      </div>
      <ul className="navbar__nav">
        <li>
          <a
            href={ROUTES.HOME}
            className={isActive(ROUTES.HOME) ? "active" : ""}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href={ROUTES.ABOUT}
            className={isActive(ROUTES.ABOUT) ? "active" : ""}
          >
            About Us
          </a>
        </li>
        <li>
          <a
            href={ROUTES.MENU}
            className={isActive(ROUTES.MENU) ? "active" : ""}
          >
            Menu
          </a>
        </li>
        <li>
          <a
            href={ROUTES.CONTACT}
            className={isActive(ROUTES.CONTACT) ? "active" : ""}
          >
            Contact Us
          </a>
        </li>
      </ul>
      <div className="flex flex-row gap-4">
        <Button variant="transparent" onClick={onLoginClick}>
          Login
        </Button>{" "}
        <Button to={ROUTES.PARTNERSHIP}>Franchise</Button>
      </div>
    </nav>
  );
};

export default Header;
