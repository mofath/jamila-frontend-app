import { useParams } from "react-router-dom";
import ProductDetailsSection from "../../containers/ProductDetailsSection/ProductDetailsSection";
import BenefitsSection from "../../containers/BenefitsSection/BenefitsSection";
import FAQSection from "../../containers/FSQSection/FAQSection";
import { useGetProductByIdQuery } from "../../apis/firebaseApi";
import "./ProductDetailsPage.css";
import Spinner from "../../components/Spinner/Spinner";

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

  if (isError)
    return <div className="error">Error: {(error as any).error}</div>;

  return (
    <div className="A page">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="product-details-page__container">
          <ProductDetailsSection
            isLoading={isLoading}
            name={product?.name}
            image={product?.image}
            description={product?.description}
            pricesBySize={product?.pricesBySize}
            sizeSelection={product?.sizeSelection}
          />
          <BenefitsSection />
          <FAQSection />
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
