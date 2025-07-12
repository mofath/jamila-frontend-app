import { FaTimes } from "react-icons/fa";
import Button from "../../components/Button/Button";
import CartItem from "../../components/CartItem/CartItem";
import { useCart } from "../../hook/useCart";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes.constants";
import "./CartDrawer.css";

const CartDrawer = () => {
  const navigate = useNavigate();

  const {
    isDrawerOpen,
    closeDrawer,
    items: cartItems,
    total,
    updateQuantity,
    removeCartItem,
  } = useCart();

  const handleBuy = () => {
    closeDrawer();
    navigate(ROUTES.CHECKOUT);
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    updateQuantity(itemId, quantity);
  };

  return (
    <>
      {isDrawerOpen && <div className="cart-backdrop" onClick={closeDrawer} />}

      <div className={`cart-drawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2 className="heading-5">Cart</h2>
          <FaTimes className="close-icon" onClick={closeDrawer} />
        </div>

        <div className="cart-drawer__body">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p className="cart-empty__message">Your cart is empty.</p>
              <Button
                onClick={() => {
                  navigate(ROUTES.MENU);
                  closeDrawer();
                }}
              >
                Go Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
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
                ))}
              </div>

              <div className="cart-summary">
                <p className="cart-sumary__total">
                  <span className="heading-5">Total:</span>
                  <span className="heading-5">${total}</span>
                </p>
                <Button onClick={handleBuy}>Checkout</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
