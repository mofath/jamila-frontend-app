import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { clearUser } from "../store/authSlice";
import toast from "react-hot-toast";

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const isAuthenticated = user.isAuthenticated;
  const uid = user.uid;
  const username = user.username;
  const email = user.email;
  const phone = user.phone;

  const logout = () => {
    dispatch(clearUser());
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  };

  return {
    isAuthenticated,
    uid,
    username,
    email,
    phone,
    user,
    logout
  };
};
