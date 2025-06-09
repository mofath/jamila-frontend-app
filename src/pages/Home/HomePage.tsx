import Banner from "../../containers/Banner/Banner";
import BrandStorySection from "../../containers/BrandStorySection/BrandStorySection";
import NutritionStats from "../../containers/NutritionStats/NutritionStats";
import TopSellingProducts from "../../containers/TopSellingProducts/TopSellingProducts";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Banner />
      <NutritionStats />
      <BrandStorySection />
      <TopSellingProducts />
    </div>
  );
};

export default HomePage;
