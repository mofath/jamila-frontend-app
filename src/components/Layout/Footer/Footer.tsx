import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { contactInfo } from "../../../data/contact-info";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container container mx-auto">
        <div className="footer__heading">
          <span className="subtitle">Jamila Juice</span>
          <p className="subtitle">Revitalize your senses, one sip at a time.</p>
        </div>
        <div className="footer__contact mt-[48px]">
          <span className="footer__contact-item">
            <img src="/assets/icons/call.svg" alt="" />
            <span className="heading-5">{contactInfo.phone}</span>
          </span>
          <span className="footer__contact-item">
            <img src="/assets/icons/message.svg" alt="" />
            <span className="heading-5">{contactInfo.email}</span>
          </span>
          <span className="footer__contact-item">
            <img src="/assets/icons/location.svg" alt="" />
            <span className="heading-5">{contactInfo.address}</span>
          </span>
        </div>
        <div className="footer__social-media">
          <span>Copyright 2025 @Jamila all right reserved</span>
          <div className="footer__social-media-icons">
            <Link to={contactInfo.instagram}>
              <IoLogoInstagram size={24} />
            </Link>
            <Link to={contactInfo.facebook}>
              <FaFacebook size={24} />
            </Link>
            <Link to={contactInfo.google}>
              <FaGoogle size={24} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
