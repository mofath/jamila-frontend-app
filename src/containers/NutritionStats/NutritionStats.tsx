import React from "react";
import { nutrientStats } from "../../data/nutration-stats";
import "./NutritionStats.css";

const NutritionStats: React.FC = () => {
  const nutritionStatsIcons: Record<string, string> = {
    nutrient: "/assets/icons/watermelon.svg",
    hydration: "/assets/icons/grapes.svg",
    digestion: "/assets/icons/orange.svg",
  };

  return (
    <div className="nutrition-stats container mx-auto">
      {nutrientStats.map(({ label, title, text }) => (
        <div className="nutrition-stats__item">
          <div className="nutrition-stats__icon-circle">
            <img
              src={nutritionStatsIcons[label]}
              alt={title}
              className="nutrition-stats__icon"
            />
          </div>
          <div className="nutrition-stats__content">
            <h4 className="nutrition-stats__title heading-5">{title}</h4>
            <p className="nutrition-stats__text text">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NutritionStats;
