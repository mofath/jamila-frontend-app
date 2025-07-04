import React from "react";
import StarRating from "../../components/StarRating/StarRating";
import "./FloatingReviewCard.css";

interface FloatingReviewCardProps {
  rating: number;
  title: string;
  text: string;
  className: string;
}

const FloatingReviewCard: React.FC<FloatingReviewCardProps> = ({
  rating,
  title,
  text,
  className,
}) => {
  return (
    <div className={`floating-review-card card ${className}`}>
      <div className="floating-review-card__rating">
        <StarRating rating={rating} />
      </div>
      <div className="floating-review-card__review">
        <h4 className="floating-review-card__title">{title}</h4>
        <p className="floating-review-card__text">{text}</p>
      </div>
    </div>
  );
};

export default FloatingReviewCard;
