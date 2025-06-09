import Banner from "../../containers/Banner/Banner";
import BrandStorySection from "../../containers/BrandStorySection/BrandStorySection";
import NutritionStats from "../../containers/NutritionStats/NutritionStats";
import OurStorySection from "../../containers/OurStorySection/OurStorySection";
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
      <OurStorySection />
    </div>
  );
};

export default HomePage;
