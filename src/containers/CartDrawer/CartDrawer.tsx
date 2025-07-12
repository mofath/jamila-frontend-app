import { useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { closeCart } from "../../store/cartSlice";
import Button from "../../components/Button/Button";
import CartItem from "../../components/CartItem/CartItem";
import { useCart } from "../../hook/useCart";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes.constants";
import "./CartDrawer.css";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isOpen, items: cartItems, total, updateQuantity, removeCartItem } = useCart();

  const handleBuy = () => {
    navigate(ROUTES.CHECKOUT);
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    updateQuantity(itemId, quantity);
  };

  return (
    <>
      {isOpen && (
        <div className="cart-backdrop" onClick={() => dispatch(closeCart())} />
      )}

      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2 className="heading-5">Cart</h2>
          <FaTimes
            className="close-icon"
            onClick={() => dispatch(closeCart())}
          />
        </div>

        <div className="cart-drawer__body">
          <div className="cart-items">
            {cartItems.map((item) => {
              return (
                <CartItem
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  size={item.size}
                  quantity={item.quantity}
                  handleQuantityChange={handleQuantityChange}
                  removeCartItem={removeCartItem}
                />
              );
            })}
          </div>

          <div className="cart-summary">
            <p className="cart-sumary__total">
              <span className="heading-5">Total:</span>
              <span className="heading-5">${total}</span>
            </p>
            <Button onClick={handleBuy}>Checkout</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
