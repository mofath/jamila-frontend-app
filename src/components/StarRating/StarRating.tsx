import React from "react";
import "./StarRating.css";

interface StarRatingProps {
  rating: number;
  variant?: "icon" | "character";
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  variant = "icon",
}) => {
  const getStarType = (index: number): "filled" | "empty" => {
    const rounded = Math.floor(rating);
    const fraction = rating - rounded;

    if (index <= rounded) return "filled";
    if (index === rounded + 1 && fraction > 0.25) return "filled";
    return "empty";
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((index) => {
        const type = getStarType(index);
        const iconPath =
          type === "filled"
            ? "/assets/icons/filled-star.svg"
            : "/assets/icons/star.svg";

        const goldenIconPath =
          type === "filled"
            ? "/assets/icons/filled-star-gold.svg"
            : "/assets/icons/star-gold.svg";

        return (
          <span key={index} className={`star star--${type}`}>
            {variant === "character" ? (
              <img
                src={goldenIconPath}
                alt={`${type} star`}
                className="star__icon"
              />
            ) : (
              <img src={iconPath} alt={`${type} star`} className="star__icon" />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
