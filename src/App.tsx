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

const App = () => {
  return (
    <Router>
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
        </Route>
        {/* Login page has no layout */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      </Routes>
      <Toaster position="top-center" />
    </Router>
  );
};

export default App;
