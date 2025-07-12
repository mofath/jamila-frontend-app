import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { ROUTES } from "../../constants/routes.constants";
import "./NewsletterSection.css";

const NewsletterSection = () => {
  return (
    <section className="newsletter-section">
      <div className="newsletter-section__container container mx-auto">
        <div className="newsletter-section__content">
          {/* Heading */}
          <div className="newsletter-section__heading">
            <h2 className="heading-2">Join Us</h2>
            <p className="text">
              Partner with us and become a part of our growing juice franchise. Let's blend success together!
            </p>
          </div>
          {/* Subscription form */}
          <div className="newsletter-section__form">
            <Button to={ROUTES.PARTNERSHIP} fullWidth>Franchise</Button>
          </div>
        </div>
      </div>
      {/* Fruits Image */}
      <img
        src="/assets/images/red-fruits-mix.png"
        alt="Fruits"
        className="newsletter-section__image"
      />
    </section>
  );
};

export default NewsletterSection;
