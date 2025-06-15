import { benefitsData } from "../../data/benefits-data";
import "./BenefitsSection.css";

const BenefitsSection = () => {
  return (
    <div className="benefits-section">
      <div className="benefits-section__container container mx-auto">
        <div className="benefits-section__heading">
          <p className="subtitle">Benefits</p>
          <h4 className="heading-4">The Benefits of Juices from our Shop</h4>
        </div>
        <div className="benefits-sections__benefits-list">
          {benefitsData.map(({ id, title, text, image }) => {
            return (
              <div key={id} className="benefits-sections__benefits-item">
                <img src={image} alt="" />
                <p className="heading-4">{title}</p>
                <p className="text">{text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
