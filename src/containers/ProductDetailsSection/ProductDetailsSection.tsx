import { Button, Textarea } from "../../components";
import "./ProductDetailsSection.css";

interface ProductDetailsSectionProps {
  name: string;
  image: string;
  description: string;
  size: string;
  price: string | number;
}

const ProductDetailsSection: React.FC<ProductDetailsSectionProps> = ({
  name,
  image,
  description,
  size,
  price,
}) => {
  return (
    <div className="product-details-section mx-auto container">
      {/* Product Poster */}
      <div className="product-details-page__image-wrapper">
        <img
          src={image}
          alt="Jamila Juice Crafters"
          className="brand-story-section__image"
        />
      </div>
      {/* Product info */}
      <div className="product-details-section__content">
        <div className="product-details-section__info">
          <p className="heading-2">{name}</p>
          <p className="text">{description}</p>
        </div>
        <div>
          <span className="product-details-section__price heading-1">$ {price}</span>
        </div>
        <div className="product-details-section__comment-input">
          <p className="heading-5">Add A Comment with Your Order</p>
          <Textarea rows={6} />
        </div>
        <div>
          <Button variant="secondary">Order juice</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSection;
