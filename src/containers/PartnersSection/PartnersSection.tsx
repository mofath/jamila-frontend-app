import { partnersData } from "../../data/partners-data";
import "./PartnersSection.css";

const PartnersSection: React.FC = () => {
  const topRow = partnersData.slice(0, 4);
  const bottomRow = partnersData.slice(4, 7);

  return (
    <div className="partners-section container mx-auto">
      <div className="partners-section__partners-list">
        <div className="partners-row top-row">
          {topRow.map((partner) => (
            <img
              key={partner.id}
              src={partner.image}
              alt={partner.name}
              className="partner-logo"
            />
          ))}
        </div>
        <div className="partners-row bottom-row">
          {bottomRow.map((partner) => (
            <img
              key={partner.id}
              src={partner.image}
              alt={partner.name}
              className="partner-logo"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;
