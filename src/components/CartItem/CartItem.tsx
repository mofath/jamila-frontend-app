import "./CartItem.css";

interface CartItemProps {
  id: string;
  name: string;
  quantity: number;
  price: number;
  size: string;
  image?: string;
  handleQuantityChange: any;
}

const CartItem: React.FC<CartItemProps> = ({
  name,
  price,
  size,
  quantity,
  id,
  image,
  handleQuantityChange,
}) => {
  return (
    <li className="cart-item ">
      <div className="cart-item__poster">
        <img src={image} alt="" />
      </div>
      <div className="cart-item__info">
        <p className="text">{name}</p>
        <span className="text">${price}</span>
        <span className="text">{size}</span>
      </div>
      <div className="cart-item__quantity-control ">
        <input
          type="number"
          min="1"
          value={quantity || 1}
          onChange={(e) =>
            handleQuantityChange(id, parseInt(e.target.value, 10))
          }
        />
      </div>
    </li>
  );
};

export default CartItem;
