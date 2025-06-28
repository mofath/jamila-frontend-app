import { useSelector, useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { RootState } from "../../store";
import {
  closeCart,
  clearCart,
  updateItemQuantity,
} from "../../store/cartSlice";
import { Button } from "../../components";
import CartItem from "../../components/CartItem/CartItem";
import "./CartDrawer.css";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.cart.isOpen);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleBuy = () => {
    alert("🛒 Purchase complete!");
    dispatch(clearCart());
    dispatch(closeCart());
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    dispatch(updateItemQuantity({ id: itemId, quantity }));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

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
                />
              );
            })}
          </div>

          <div className="cart-summary">
            <p className="cart-sumary__total">
              <span className="heading-5">Total:</span>
              <span className="heading-5">${totalPrice.toFixed(2)}</span>
            </p>
            <Button onClick={handleBuy}>Checkout</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
