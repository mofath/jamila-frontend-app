import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { closeCart, clearCart, updateItemQuantity, removeItem } from "../store/cartSlice";

export const useCart = () => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector((state: RootState) => state.cart.isOpen);
  const items = useSelector((state: RootState) => state.cart.items);

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const closeDrawer = () => dispatch(closeCart());
  const clear = () => dispatch(clearCart());
  const removeCartItem = (id: string) => dispatch(removeItem(id))
  const updateQuantity = (id: string, quantity: number) =>
    dispatch(updateItemQuantity({ id, quantity }));

  return {
    isDrawerOpen,
    items,
    total,
    totalItems,
    closeDrawer,
    clearCart: clear,
    updateQuantity,
    removeCartItem,
  };
};
