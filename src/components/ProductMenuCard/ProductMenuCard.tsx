import "./ProductMenuCard.css"

interface ProductMenuCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  description: string;
  gradient: string;
  category: string;
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
}) => {
  return <div className="product-menu-card"></div>;
};

export default ProductMenuCard;
