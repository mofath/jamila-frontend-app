import { useState } from "react";
import { Button, Textarea } from "../../components";
import "./ProductDetailsSection.css";

interface ProductDetailsSectionProps {
  name: string;
  image: string;
  description: string;
  pricesBySize: {
    [size: string]: number;
  };
}

const ProductDetailsSection: React.FC<ProductDetailsSectionProps> = ({
  name,
  image,
  description,
  pricesBySize,
}) => {
  const sizes = Object.keys(pricesBySize);
  const [selectedSize, setSelectedSize] = useState<string>(
    sizes.includes("default") ? "default" : sizes[0]
  );

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };
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
          <span className="product-details-section__price heading-1">
            ${pricesBySize[selectedSize]}
          </span>
        </div>

        {/* Size selector */}
        {sizes.length > 1 && (
          <div className="product-details-section__select-size">
            <span className="text-gray-500">Select Size</span>
            <div className="product-details-section__size-options">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeClick(size)}
                  className={`product-size-button ${selectedSize === size ? "active" : ""
                    }`}
                >
                  {size === "default" ? "Standard" : size}
                </button>
              ))}
            </div>
          </div>
        )}
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
