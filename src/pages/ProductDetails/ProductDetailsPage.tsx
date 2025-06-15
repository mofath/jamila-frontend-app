import { useParams } from "react-router-dom";
import ProductDetailsSection from "../../containers/ProductDetailsSection/ProductDetailsSection";
import BenefitsSection from "../../containers/BenefitsSection/BenefitsSection";
import FAQSection from "../../containers/FSQSection/FAQSection";
import { useGetProductByIdQuery } from "../../apis/firebaseApi";
import "./ProductDetailsPage.css";

const ProductDetailsPage: React.FC = () => {
  const { categoryId, id } = useParams<{ categoryId: string; id: string }>();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductByIdQuery({
    categoryId: categoryId!,
    productId: id!,
  });

  if (isLoading) return <div className="loader">Loading...</div>;
  if (isError) return <div className="error">❌ Error: {(error as any).error}</div>;
  if (!product) return <div className="not-found">Product not found</div>;

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
