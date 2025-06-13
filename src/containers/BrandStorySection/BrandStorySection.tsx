import React from "react";
import "./BrandStorySection.css";
import { Button } from "../../components";

const BrandStorySection: React.FC = () => {
  return (
    <section className="brand-story-section container mx-auto">
      <div className="brand-story-section__container">
        <div className="brand-story-section__image-wrapper">
          <img
            src="/assets/images/brand-story.png"
            alt="Jamila Juice Crafters"
            className="brand-story-section__image"
          />
        </div>
        <div className="brand-story-section__content">
          <div>
            <h2 className="subtitle">Who We Are</h2>
            <h4 className="heading-2">
              Meet the Juice Crafters Crafting Healthy Delights
            </h4>
          </div>
          <p className="text">
            At Jamila Juice, we blend passion with purpose. Our expert crafters
            handpick the freshest ingredients to create juices that nourish your
            body and elevate your day. With every bottle, we bring you closer to
            nature, wellness, and vibrant living.
          </p>
          <div className="w-fit">
            <Button to="/menu" variant="secondary" >
              Book Juice
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStorySection;
