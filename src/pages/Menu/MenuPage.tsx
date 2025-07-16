import { useState, useEffect } from "react";
import { RiDrinksLine as DrinkIcon } from "react-icons/ri";
import ProductMenuCard from "../../components/ProductMenuCard/ProductMenuCard";
import {
  useGetCategoriesQuery,
  useLazyGetProductsByCategoryQuery,
} from "../../apis/firebaseApi";
import Filters from "./Filters/Filters";
import Spinner from "../../components/Spinner/Spinner";
import "./MenuPage.css";

const MenuPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategoriesQuery();
  const [getProducts, { data: products = [], isLoading: productsLoading }] =
    useLazyGetProductsByCategoryQuery();

  // 👉 Set first category once categories are fetched
  useEffect(() => {
    if (categories.length && !activeCategory) {
      const firstCategoryId = categories[0].id;
      setActiveCategory(firstCategoryId);
      getProducts(firstCategoryId);
    }
  }, [categories, activeCategory, getProducts]);

  useEffect(() => {
    if (activeCategory) {
      getProducts(activeCategory);
    }
  }, [activeCategory, getProducts]);

  return (
    <div className="menu-page page">
      {(categoriesLoading || categoriesLoading) && <Spinner />}
      <div className="menu-page__container container mx-auto">
        {/* Heading */}
        <div className="menu-page__heading">
          <div className="menu-page__sub-heading">
            <span className="subtitle">Menu</span>
            <p className="heading-2">
              Exotic Fruit Infusions for the Adventurous Palate
            </p>
          </div>
        </div>
        {/* Filters */}
        <Filters
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Products List */}
        <div className="menu-products-list">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductMenuCard
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image}
                price={
                  product?.sizeSelection
                    ? product?.pricesBySize?.medium
                    : product?.pricesBySize?.default
                }
                rating={product.rating}
                description={product.description}
                gradient={product.gradient}
                category={product.category}
                categoryId={activeCategory}
              />
            ))
          ) : (
            <div className="empty-state">
              <span className="empty-state__icon-wrapper">
                <DrinkIcon size={69} color="#d3d9dd" />
              </span>
              <div>
                <p>No drinks in this category</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
