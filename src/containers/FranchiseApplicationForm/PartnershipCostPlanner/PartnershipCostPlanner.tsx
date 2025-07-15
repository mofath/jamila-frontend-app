import React, { useState, useEffect } from "react";
import "./PartnershipCostPlanner.css";

interface PartnershipCostPlannerProps {
  adFees: any[];
  royaltyFees: any[];
}

const PartnershipCostPlanner: React.FC<PartnershipCostPlannerProps> = ({
  royaltyFees,
  adFees,
}) => {
  const fees = [
    {
      year: "Year 1",
      royaltyFee: `${royaltyFees[0]}%`,
      addFee: `${adFees[0]}%`,
    },
    {
      year: "Year 2",
      royaltyFee: `${royaltyFees[1]}%`,
      addFee: `${adFees[1]}%`,
    },
    {
      year: "Year 3",
      royaltyFee: `${royaltyFees[2]}%`,
      addFee: `${adFees[2]}%`,
    },
  ];

  return (
    <div className="partnership-cost-planner">
      <div className="partnership-cost-planner__header-row">
        <div className="partnership-cost-planner__cell" />
        <div className="partnership-cost-planner__cell">Royalty Fee</div>
        <div className="partnership-cost-planner__cell">Add Fee</div>
      </div>

      {fees.map((row, idx) => (
        <div key={row.year} className="partnership-cost-planner__row">
          <div className="partnership-cost-planner__cell">{row.year}</div>
          <div className="partnership-cost-planner__cell">{row.royaltyFee}</div>
          <div className="partnership-cost-planner__cell">{row.addFee}</div>
        </div>
      ))}
    </div>
  );
};

export default PartnershipCostPlanner;
