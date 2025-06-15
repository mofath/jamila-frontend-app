import { Link } from "react-router-dom";
import StarRating from "../StarRating/StarRating";
import "./ProductMenuCard.css";
import { ROUTES } from "../../constants/routes.constants";

interface ProductMenuCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  description: string;
  gradient: string;
  category: string;
  categoryId: string;
  label?: string;
}

const ProductMenuCard: React.FC<ProductMenuCardProps> = ({
  id,
  name,
  image,
  price,
  rating,
  description,
  label,
  categoryId,
}) => {
  return (
    <Link
      to={id ? ROUTES.getProductDetails(categoryId, id) : "#"}
      className="product-best-selling-card-link"
    >
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
    </Link>
  );
};

export default ProductMenuCard;
