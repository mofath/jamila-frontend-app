import React from "react";
import { topSellingProductsData } from "../../data/top-selling-products";
import "./TopSellingProducts.css";

const TopSellingProducts: React.FC = () => {
  return (
    <section className="top-selling-products container mx-auto">
      <div className="top-selling-products__header">
        <h2 className="subtitle">Our Best Products This Month</h2>
        <h4 className="heading-2">Juice Products Of The Month</h4>
      </div>
      <div className="top-selling-products__grid">
        {topSellingProductsData.map(
          ({ id, name, label, price, volume, features, image }) => (
            <div key={id} className={`top-selling-products__card ${label}`}>
              <div className="top-selling-products__image-wrapper">
                <img
                  src={image}
                  alt={name}
                  className="top-selling-products__image"
                />
                <span className="top-selling-products__price-display">
                  <div className="top-selling-products__price-display-content">
                    <span className="price heading-2">{price}</span>
                    <span className="text">{volume}</span>
                  </div>
                </span>
              </div>
              <div className="top-selling-products__info">
                <h5 className="top-selling-products__name heading-3">{name}</h5>
                <span className="top-selling-products__volume heading-4">
                  {volume}
                </span>

                <ul className="top-selling-products__features">
                  {features.map((feat, index) => (
                    <li key={index} className="top-selling-products__feature">
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default TopSellingProducts;
