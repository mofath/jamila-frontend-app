import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RootState } from "../store";
import { clearUser } from "../store/authSlice";
import { clearCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes.constants";

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const isAuthenticated = user.isAuthenticated;
  const uid = user.uid;
  const username = user.username;
  const email = user.email;
  const phone = user.phone;

  const logout = () => {
    dispatch(clearUser());
    dispatch(clearCart());
    localStorage.removeItem("user");
    navigate(ROUTES.HOME);
    toast.success("Logged out successfully");
  };

  return {
    isAuthenticated,
    uid,
    username,
    email,
    phone,
    user,
    logout,
  };
};
