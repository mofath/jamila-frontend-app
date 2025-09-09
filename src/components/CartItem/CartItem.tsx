import Button from "../Button/Button";
import "./CartItem.css";

interface CartItemProps {
  id: string;
  name: string;
  quantity: number;
  price: number;
  size: string;
  image?: string;
  handleQuantityChange?: any;
  removeCartItem?: any;
}

const CartItem: React.FC<CartItemProps> = ({
  name,
  price,
  size,
  quantity,
  id,
  image,
  handleQuantityChange,
  removeCartItem,
}) => {
  return (
    <li className="cart-item ">
      <div className="cart-item__poster">
        <img src={image} alt="" />
      </div>
      <div className="cart-item__info">
        <p className="text-lg">{name}</p>
        <span className="text-lg">${price}</span>
        <span className="text-lg">{size}</span>
      </div>
      <div className="cart-item__quantity-control ">
        {handleQuantityChange ? (
          <div>
            <input
              type="number"
              min="1"
              value={quantity || 1}
              onChange={(e) =>
                handleQuantityChange(id, parseInt(e.target.value, 10))
              }
            />
            {removeCartItem && (
              <Button onClick={() => removeCartItem(id)} variant="text-lg">
                Remove
              </Button>
            )}
          </div>
        ) : (
          <span className="text-lg">{quantity}</span>
        )}
      </div>
    </li>
  );
};

export default CartItem;
