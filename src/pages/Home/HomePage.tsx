import Banner from "../../containers/Banner/Banner";
import NutritionStats from "../../containers/NutritionStats/NutritionStats";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Banner />
      <NutritionStats />
    </div>
  );
};

export default HomePage;
