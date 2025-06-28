import Banner from "../../containers/Banner/Banner";
import BenefitsSection from "../../containers/BenefitsSection/BenefitsSection";
import BrandStorySection from "../../containers/BrandStorySection/BrandStorySection";
import NewsletterSection from "../../containers/NewsletterSection/NewsletterSection";
import NutritionStats from "../../containers/NutritionStats/NutritionStats";
import OurStorySection from "../../containers/OurStorySection/OurStorySection";
import QoutesSection from "../../containers/QouteSection/QoutesSection";
import TeamSection from "../../containers/TeamSection/TeamSection";
// import TopSellingProducts from "../../containers/TopSellingProducts/TopSellingProducts";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="home-page page">
      <Banner />
      <NutritionStats />
      <BrandStorySection />
      {/* <TopSellingProducts /> */}
      <TeamSection />
      <OurStorySection />
      <BenefitsSection />
      <NewsletterSection />
      <QoutesSection />
    </div>
  );
};

export default HomePage;
