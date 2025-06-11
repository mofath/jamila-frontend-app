import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import {
  HomePage,
  AboutUsPage,
  LoginPage,
  PartnershipPage,
  MenuPage,
  ProductDetailsPage,
} from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/partnership" element={<PartnershipPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
        </Route>

        {/* Login page has no layout */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
