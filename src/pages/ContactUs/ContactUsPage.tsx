import Banner from "../../containers/Banner/Banner";
import ContactUsSection from "../../containers/ContactUsSection/ContactUsSection";
import "./ContactUsPage.css"

const ContactUsPage: React.FC = () => {
  return (
    <div className="contact-us-page">
      <Banner />
      <ContactUsSection />
    </div>
  );
};

export default ContactUsPage;
