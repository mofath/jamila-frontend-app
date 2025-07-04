import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addItem, toggleCart } from "../../store/cartSlice";
import Button  from "../../components/Button/Button";
import Textarea  from "../../components/Textarea/Textarea";
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

  const commentRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();

  const handleOrderNow = () => {
    // Future use: navigate('/checkout') or open a modal
    alert("🚚 Order placement feature coming soon!");
  };

  const handleAddToCart = () => {
    const comment = commentRef.current?.value || "";
    const item = {
      id: `${name}-${selectedSize}`,
      name,
      price: pricesBySize[selectedSize],
      size: selectedSize,
      quantity: 1,
      comment,
      image,
    };

    dispatch(addItem(item));
    dispatch(toggleCart()); 
  };

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
                  className={`product-size-button ${
                    selectedSize === size ? "active" : ""
                  }`}
                >
                  {size === "default" ? "Standard" : size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Comment */}
        <div className="product-details-section__comment-input">
          <p className="heading-5">Add A Comment with Your Order</p>
          <Textarea ref={commentRef} rows={6} placeholder="Add notes" />
        </div>

        {/* Buttons */}
        <div className="product-details-section__actions">
          <Button variant="secondary" onClick={handleOrderNow}>
            Order Now
          </Button>
          <Button variant="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSection;
