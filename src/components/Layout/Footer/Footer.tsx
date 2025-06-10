import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebook, FaYoutube, FaTwitter } from "react-icons/fa";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container container mx-auto">
        <div className="footer__heading">
          <p className="subtitle">Jamila Juice</p>
          <p className="subtitle">Revitalize your senses, one sip at a time.</p>
        </div>
        <div className="footer__opening-hours">
          <span className="heading-4">Opening Hours</span>
          <span className="heading-4">Monday - Saturday</span>
          <span className="heading-4">08.00 am - 09.00 pm</span>
        </div>
        <div className="footer__contact">
          <span className="footer__contact-item">
            <img src="/assets/icons/call.svg" alt="" />
            <span className="heading-4">+20 1143698267</span>
          </span>
          <span className="footer__contact-item">
            <img src="/assets/icons/message.svg" alt="" />
            <span className="heading-4">Jamila@Jamila.com</span>
          </span>
          <span className="footer__contact-item">
            <img src="/assets/icons/location.svg" alt="" />
            <span className="heading-4">New Cairo 658 st</span>
          </span>
          <span className="footer__contact-item">
            <img src="/assets/icons/planet.svg" alt="" />
            <span className="heading-4"> Jamila.com</span>
          </span>
        </div>
        <div className="footer__social-media">
          <span>Copyright 2025 @Jamila all right reserved</span>
          <div className="footer__social-media-icons">
            <IoLogoInstagram size={24} />
            <FaFacebook size={24} />
            <FaYoutube size={24} />
            <FaTwitter size={24} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
