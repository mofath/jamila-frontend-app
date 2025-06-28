/* Header.tsx */
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoMdMenu as MenuIcon } from "react-icons/io";
import { BiUser as UserIcon } from "react-icons/bi";
import { FiShoppingCart as CartIcon } from "react-icons/fi";
import { ROUTES } from "../../../constants/routes.constants";
import { useAuth } from "../../../hook/useAuth";

import "./Header.css";
import { toggleCart } from "../../../store/cartSlice";
import { useDispatch } from "react-redux";

interface HeaderProps {
  onLoginClick: () => void;
}

const navLinks = [
  { name: "Home", path: ROUTES.HOME },
  { name: "About Us", path: ROUTES.ABOUT },
  { name: "Menu", path: ROUTES.MENU },
  { name: "Contact Us", path: ROUTES.CONTACT },
  { name: "Franchise", path: ROUTES.PARTNERSHIP },
];

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const { pathname } = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const isActive = (route: string) => pathname === route;

  const openCartDrawer = () => {
    dispatch(toggleCart());
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Just handle closing on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  return (
    <nav className="header">
      <div className="header__container mx-auto container">
        <div className="header__logo">
          <img src="/assets/icons/jamila-logo.svg" alt="Logo" />
        </div>

        <ul className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
          {navLinks.map(({ name, path }) => (
            <li key={path} className="header__nav-item">
              <a
                href={path}
                className={`header__nav-link ${
                  isActive(path) ? "header__nav-link--active" : ""
                }`}
              >
                {name}
              </a>
            </li>
          ))}
        </ul>

        <div className="header__actions">
          {/* 🛒 Cart Button */}
          <button className="header__icon-button" onClick={openCartDrawer}>
            <CartIcon size={28} color="var(--color-primary-100)" />
          </button>
          <div className="header__user">
            <button
              onClick={() => {
                if (isAuthenticated) {
                  setDropdownOpen(!dropdownOpen);
                } else {
                  onLoginClick();
                }
              }}
              className="header__icon-button"
            >
              <UserIcon size={32} color="var(--color-primary-100)" />
            </button>

            {isAuthenticated && dropdownOpen && (
              <div ref={dropdownRef} className="header__dropdown">
                <button
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  className="header__logout"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <button
            className="header__burger"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <MenuIcon size={40} color="var(--color-primary-100)" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
