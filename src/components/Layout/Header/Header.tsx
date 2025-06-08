import Button from "../../Button/Button";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <nav className="navbar container mx-auto">
      <div className="navbar__logo">
        <img src="/assets/icons/jamila-logo.svg" alt="Logo" />
      </div>
      <ul className="navbar__nav">
        <li><a href="/" className="active">Home</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/menu">Menu</a></li>
        <li><a href="/contact">Contact Us</a></li>
      </ul>
      <Button to="/partnership" >
        Franchise
      </Button>
    </nav>
  );
};

export default Header;
