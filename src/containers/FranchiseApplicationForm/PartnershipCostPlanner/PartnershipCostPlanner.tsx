import React, { useState, useEffect } from "react";
import  "./PartnershipCostPlanner.css";

type FeeSelection = {
  year: string;
  royaltyFee: string;
  addFee: string;
};

const initialData: FeeSelection[] = [
  { year: "Year 1", royaltyFee: "7%", addFee: "3%" },
  { year: "Year 2", royaltyFee: "4%", addFee: "8%" },
  { year: "Year 3", royaltyFee: "2%", addFee: "5%" },
];

const PartnershipCostPlanner = ({}) => {
  const [fees, setFees] = useState<FeeSelection[]>(initialData);

  const handleChange = (
    index: number,
    field: "royaltyFee" | "addFee",
    value: string
  ) => {
    const updated = [...fees];
    updated[index][field] = value;
    setFees(updated);
  };

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
