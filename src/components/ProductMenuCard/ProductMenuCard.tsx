import StarRating from "../StarRating/StarRating";
import "./ProductMenuCard.css";

interface ProductMenuCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  description: string;
  gradient: string;
  category: string;
  label?: string;
}

const ProductMenuCard: React.FC<ProductMenuCardProps> = ({
  id,
  name,
  image,
  price,
  rating,
  description,
  gradient,
  category,
  label,
}) => {
  return (
    <div className={`product-menu-card ${label}`}>
      <div className="product-menu-card__image-wrapper">
        <img src={image} alt={name} className="product-menu-card__image" />
      </div>
      <div className="product-menu-card__info">
        <p className="heading-4">{name}</p>
        <p className="text">{description}</p>
        <StarRating rating={rating} variant="character" />
        <div className="product-menu-card__price heading-2">${price}</div>
      </div>
    </div>
  );
};

export default ProductMenuCard;
