import Banner from "../../containers/Banner/Banner";
import BrandStorySection from "../../containers/BrandStorySection/BrandStorySection";
import NutritionStats from "../../containers/NutritionStats/NutritionStats";
import TeamSection from "../../containers/TeamSection/TeamSection";
import TopSellingProducts from "../../containers/TopSellingProducts/TopSellingProducts";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Banner />
      <NutritionStats />
      <BrandStorySection />
      <TopSellingProducts />
      <TeamSection />
    </div>
  );
};

export default HomePage;
