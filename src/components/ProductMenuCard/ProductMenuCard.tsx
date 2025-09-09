import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes.constants";
import PriceTag from "../PriceTag/PriceTag";
import "./ProductMenuCard.css";

interface ProductMenuCardProps {
  id: number;
  name: string;
  image: string;
  price: {
    price: number | string;
    priceAfterDiscount?: number | string;
  };
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
  description,
  label,
  categoryId,
}) => {
  return (
    <Link
      to={id ? ROUTES.getProductDetails(categoryId, id) : "#"}
      className="product-best-selling-card-link"
    >
      <div className={`product-menu-card ${label || ""}`}>
        <div className="product-menu-card__image-wrapper">
          <img src={image} alt={name} className="product-menu-card__image" />
        </div>
        <div className="product-menu-card__info">
          <p className="heading-4">{name}</p>
          <p className="text-lg">{description}</p>
          <PriceTag price={price} />
        </div>
      </div>
    </Link>
  );
};

export default ProductMenuCard;
