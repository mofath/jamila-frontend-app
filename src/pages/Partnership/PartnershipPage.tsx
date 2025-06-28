import { useGetSettingsQuery } from "../../apis/firebaseApi";
import Banner from "../../containers/Banner/Banner";
import BenefitsSection from "../../containers/BenefitsSection/BenefitsSection";
import FranchiseApplicationForm from "../../containers/FranchiseApplicationForm/FranchiseApplicationForm";
import "./PartnershipPage.css";

const PartnershipPage: React.FC = () => {
  return (
    <div className="partnership-page page">
      <Banner />
      <div className="partnership-page__benefits-wrapper">
        <BenefitsSection />
      </div>
      <FranchiseApplicationForm />
    </div>
  );
};

export default PartnershipPage;
