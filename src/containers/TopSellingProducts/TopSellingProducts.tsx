import React from "react";
import { topSellingProductsData } from "../../data/top-selling-products";
import ProductBestSellingCard from "../../components/ProdutBestSellinCard/ProductBestSellingCard";
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
          ({ id, name, label, price, volume, features, image }) => {
            return (
              <ProductBestSellingCard
                name={name}
                label={label}
                price={price}
                volume={volume}
                features={features}
                image={image}
              />
            );
          }
        )}
      </div>
    </section>
  );
};

export default TopSellingProducts;
