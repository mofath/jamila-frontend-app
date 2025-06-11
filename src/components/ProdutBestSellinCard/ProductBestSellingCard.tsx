import "./ProductBestSellingCard.css";

interface ProductBestSellingCardProps {
  id?: number;
  name: string;
  image: string;
  price: string;
  label: string;
  gradient?: string;
  volume: string;
  features: string[];
}

const ProductBestSellingCard: React.FC<ProductBestSellingCardProps> = ({
  name,
  image,
  price,
  label,
  volume,
  features,
}) => {
  return (
    <div className={`product-best-selling-card ${label}`}>
      <div className="product-best-selling-card__image-wrapper">
        <img src={image} alt={name} className="product-best-selling-card__image" />
        <span className="product-best-selling-card__price-display">
          <div className="product-best-selling-card__price-display-content">
            <span className="price heading-2">{price}</span>
            <span className="text">{volume}</span>
          </div>
        </span>
      </div>
      <div className="product-best-selling-card__info">
        <h5 className="product-best-selling-card__name heading-3">{name}</h5>
        <span className="product-best-selling-card__volume heading-4">{volume}</span>

        <ul className="product-best-selling-card__features">
          {features.map((feat, index) => (
            <li key={index} className="product-best-selling-card__feature">
              {feat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductBestSellingCard;
