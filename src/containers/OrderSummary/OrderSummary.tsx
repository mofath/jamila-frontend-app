import CartItem from "../../components/CartItem/CartItem";
import { ICartItem } from "../../store/cartSlice";
import "./OrderSummary.css";

interface OrderSummaryProps {
  items: ICartItem[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items }) => {
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="order-summary container mx-auto">
      {/* <h3>Order Summary</h3> */}
      <div className="order-summary__list">
        {items.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            size={item.size}
            quantity={item.quantity}
          />
        ))}
      </div>
      <div className="order-summary__total">
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default OrderSummary;
