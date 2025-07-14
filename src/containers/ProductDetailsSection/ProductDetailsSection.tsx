import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem, toggleCart } from "../../store/cartSlice";
import Button from "../../components/Button/Button";
import Textarea from "../../components/Textarea/Textarea";
import { useAuth } from "../../hook/useAuth";
import { useAuthModal } from "../AuthModal/AuthModalContext";
import { ROUTES } from "../../constants/routes.constants";
import Spinner from "../../components/Spinner/Spinner";
import "./ProductDetailsSection.css";
import PriceTag from "../../components/PriceTag/PriceTag";

interface ProductDetailsSectionProps {
  isLoading?: boolean;
  name: string;
  image: string;
  description: string;
  sizeSelection?: boolean;
  pricesBySize: {
    [size: string]: {
      price: number | string;
      priceAfterDiscount?: number | string;
    };
  };
}

const ProductDetailsSection: React.FC<ProductDetailsSectionProps> = ({
  isLoading = false,
  name,
  image,
  description,
  sizeSelection = false,
  pricesBySize,
}) => {
  const { isAuthenticated } = useAuth();
  const { openAuthModal } = useAuthModal();
  const navigate = useNavigate();

  const sizes = Object.keys(pricesBySize);
  const [selectedSize, setSelectedSize] = useState<string>(
    sizeSelection ? sizes[0] : "default"
  );

  const commentRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }

    navigate(ROUTES.CHECKOUT);
  };

  const handleAddToCart = () => {
    const comment = commentRef.current?.value || "";
    const item = {
      id: `${name}-${selectedSize}`,
      name,
      price: Number(
        pricesBySize[selectedSize]?.priceAfterDiscount ||
          pricesBySize[selectedSize]?.price
      ),
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
      {isLoading && <Spinner />}
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
            <PriceTag price={pricesBySize[selectedSize]} />
          </span>
        </div>

        {/* Size selector */}
        {sizeSelection ? (
          <div className="product-details-section__select-size">
            <span className="text-gray-500">Select Size</span>
            <div className="product-details-section__size-options">
              {sizes
                .filter((size) => size !== "default")
                .map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeClick(size)}
                    className={`product-size-button ${
                      selectedSize === size ? "active" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
            </div>
          </div>
        ) : null}

        {/* Comment */}
        <div className="product-details-section__comment-input">
          <p className="heading-5">Add A Comment with Your Order</p>
          <Textarea ref={commentRef} rows={6} placeholder="Add notes" />
        </div>

        {/* Buttons */}
        <div className="product-details-section__actions">
          <Button variant="secondary" onClick={handleBuyNow}>
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
