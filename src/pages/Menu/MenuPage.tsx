import { useState } from "react";
import { productsData } from "../../data/products-data";
import { ProductMenuCard } from "../../components";
import "./MenuPage.css";

const menuFilters = [
  { id: 1, label: "All", name: "all" },
  { id: 2, label: "Juice", name: "juice" },
  { id: 3, label: "Sweets", name: "sweets" },
  { id: 4, label: "Product of the Month", name: "productOfMonth" },
  { id: 5, label: "Cakes", name: "cakes" },
];

const MenuPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="menu-page">
      <div className="menu-page__container container mx-auto">
        {/* Heading */}
        <div className="menu-page__heading">
          <h1 className="heading-1">
            Watch Our Menu, This Is The Best Products Made For You.
          </h1>
          <div className="menu-page__sub-heading">
            <span className="subtitle">Menu</span>
            <p className="heading-2">
              Exotic Fruit Infusions for the Adventurous Palate
            </p>
          </div>
        </div>
        {/* Filters */}
        <div className="menu-page__filters">
          {menuFilters.map((filter) => (
            <div
              key={filter.id}
              className={`menu-page__filter-item ${
                activeFilter === filter.name ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter.name)}
            >
              {filter.label}
            </div>
          ))}
        </div>
        {/* Products List */}
        <div className="menu-products-list">
          {productsData
            .filter((product) =>
              activeFilter === "all" ? true : product.category === activeFilter
            )
            .map((product) => (
              <ProductMenuCard
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image}
                price={product.price}
                rating={product.rating}
                description={product.description}
                gradient={product.gradient}
                category={product.category}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
