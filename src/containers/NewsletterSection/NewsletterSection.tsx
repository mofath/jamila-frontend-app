import { Button, Input } from "../../components";
import "./NewsletterSection.css";

const NewsletterSection = () => {
  return (
    <section className="newsletter-section">
      <div className="newsletter-section__container container mx-auto">
        <div className="newsletter-section__content">
          {/* Heading */}
          <div className="newsletter-section__heading">
            <h2 className="heading-2">Join Our Newsletter</h2>
            <p className="text">
              Stay updated with our latest juice blends, exclusive offers, and
              health tips.
            </p>
          </div>
          {/* Subscription form */}
          <div className="newsletter-section__form">
            <Input type="email" placeholder="Enter your email..." variant="secondary" />
            <Button>Subscribe</Button>
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
