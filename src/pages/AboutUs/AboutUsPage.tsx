import AboutUsSection from "../../containers/AboutUsSection/AboutUsSection";
import Banner from "../../containers/Banner/Banner";
import PartnersSection from "../../containers/PartnersSection/PartnersSection";
import "./AboutUsPage.css";

const AboutUsPage: React.FC = () => {
  return (
    <div className="about-us-page">
      <Banner />
      <AboutUsSection />
      <PartnersSection />
    </div>
  );
};

export default AboutUsPage;
