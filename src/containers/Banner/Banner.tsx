import FloatingReviewCard from "../FloatingReviewCard/FloatingReviewCard";
import { userReviews } from "../../data/user-reviews";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner__container container mx-auto">
        <div className="banner__heading">
          <div className="banner__headline-group">
            <p className="heading-1"> Crafting Wellness, One Glass </p>
            <p className="heading-1"> at a Time</p>
          </div>
          {/* <p className="subtitle">Crafting Wellness, One Glass at a Time</p> */}
        </div>
      </div>
      <div className="banner__wrapper">
        <div className="banner__image">
          <div className="banner__content container mx-auto h-full">
            {/* Floating Review Cards */}
            <FloatingReviewCard
              rating={userReviews[1].rating}
              title={userReviews[1].title}
              text={userReviews[1].text}
              className="floating-review-card--top-right"
            />
            <FloatingReviewCard
              rating={userReviews[0].rating}
              title={userReviews[0].title}
              text={userReviews[0].text}
              className="floating-review-card--bottom-left"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
