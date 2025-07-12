import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes.constants";
import Layout from "./components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import {
  HomePage,
  AboutUsPage,
  LoginPage,
  PartnershipPage,
  MenuPage,
  ProductDetailsPage,
  ContactUsPage,
} from "./pages";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import { useEffect } from "react";
import { auth } from "./firebase/firebaseApp";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "./store/authSlice";
import { AuthModalProvider } from "./containers/AuthModal/AuthModalContext";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          setUser({
            uid: authUser.uid,
            username: authUser.displayName ?? "",
            email: authUser.email ?? "",
            phone: authUser.phoneNumber ?? "",
            isAuthenticated: true,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <AuthModalProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.ABOUT} element={<AboutUsPage />} />
            <Route path={ROUTES.PARTNERSHIP} element={<PartnershipPage />} />
            <Route path={ROUTES.MENU} element={<MenuPage />} />
            <Route
              path={ROUTES.PRODUCT_DETAILS}
              element={<ProductDetailsPage />}
            />
            <Route path={ROUTES.CONTACT} element={<ContactUsPage />} />
            <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
          </Route>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        </Routes>
        <Toaster position="top-center" />
      </AuthModalProvider>
    </Router>
  );
};

export default App;
