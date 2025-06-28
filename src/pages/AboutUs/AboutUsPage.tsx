import AboutUsSection from "../../containers/AboutUsSection/AboutUsSection";
import Banner from "../../containers/Banner/Banner";
import PartnersSection from "../../containers/PartnersSection/PartnersSection";
import TeamSection from "../../containers/TeamSection/TeamSection";
import "./AboutUsPage.css";

const AboutUsPage: React.FC = () => {
  return (
    <div className="about-us-page page">
      {/* <Banner /> */}
      <AboutUsSection />
      <TeamSection />
      <PartnersSection />
    </div>
  );
};

export default AboutUsPage;
