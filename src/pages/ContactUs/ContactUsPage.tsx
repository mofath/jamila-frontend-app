import Banner from "../../containers/Banner/Banner";
import ContactUsForm from "../../containers/ContactUsForm/ContactUsForm";
import "./ContactUsPage.css"

const ContactUsPage: React.FC = () => {
  return (
    <div className="contact-us-page page">
      <Banner />
      <ContactUsForm />
    </div>
  );
};

export default ContactUsPage;
