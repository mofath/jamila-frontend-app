import React from "react";
import PartnerInfoForm from "./PartnerInfoForm/PartnerInfoForm";
import PartnershipCostPlanner from "./PartnershipCostPlanner/PartnershipCostPlanner";
import { Button } from "../../components";
import "./FranchiseApplicationForm.css";

const FranchiseApplicationForm: React.FC = () => {
  return (
    <div className="franchise-application-form">
      <div className="franchise-application-form__container container mx-auto">
        <div className="partnership-cost-planner__wrapper">
          <div className="partnership-cost-planner__heading">
            <p className="subtitle">Franchising</p>
            <h2 className="heading-2">Reduced Franchise Royalty & Ad Fee</h2>
            <p className="text">
              Discover exclusive benefits crafted for new partners. Our
              streamlined onboarding and support ensure your franchise starts
              strong and grows efficiently with expert guidance.
            </p>
          </div>
          <PartnershipCostPlanner />
        </div>
        <div className="partner-info-form__wrapper">
          <div className="partnership-cost-planner__heading">
            <p className="subtitle">Form</p>
            <h2 className="heading-2">
              Refreshing Beverages Explore Our Booking Options
            </h2>
            <p className="text">
              Fill out the application to begin your journey. Our franchise team
              is here to help you every step of the way. Let’s build something
              great together today.
            </p>
          </div>
          <PartnerInfoForm />
          <div>
            <Button variant="secondary">Join Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FranchiseApplicationForm;
