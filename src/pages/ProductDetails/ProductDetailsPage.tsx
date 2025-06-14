import { useParams } from "react-router-dom";
import ProductDetailsSection from "../../containers/ProductDetailsSection/ProductDetailsSection";
import BenefitsSection from "../../containers/BenefitsSection/BenefitsSection";
import FAQSection from "../../containers/FSQSection/FAQSection";
import "./ProductDetailsPage.css";

const product = {
  id: 1,
  name: "Sunrise Delight",
  image: "/assets/images/juice-product.png",
  price: 4.99,
  rating: 4.8,
  description: "A vibrant blend of orange, mango, and a hint of passionfruit.",
  gradient: "var(--gradient-orange)",
  category: "juice",
  size: "850 ml",
};

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="product-details-page">
      <div className="product-details-page__container">
        <ProductDetailsSection
          name={product.name}
          image={product.image}
          description={product.description}
          price={product.price}
          size={product.size}
        />
        <BenefitsSection />
        <FAQSection />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
