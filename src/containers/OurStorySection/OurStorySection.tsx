import React from "react";
import "./OurStorySection.css";

interface SemicircleGradientProps {
  variant?: "top" | "bottom";
}

const SemicircleGradient: React.FC<SemicircleGradientProps> = ({
  variant = "bottom",
}) => {
  const positionClasses = variant === "top" ? "top-0" : "bottom-0";
  const radiusClasses = variant === "top" ? "rounded-b-full" : "rounded-t-full";

  return (
    <div className={`absolute bottom-0 left-0 ${positionClasses}`}>
      <div
        className={`w-[553px] h-[277px] bg-gradient-to-br from-lime-200 to-lime-500 ${radiusClasses}`}
      />
    </div>
  );
};

const OurStorySection: React.FC = () => {
  return (
    <section className="our-story-section">
      <div className="our-story-section__container container mx-auto">
        <div className="our-story-section__content">
          <p className="subtitle">Story</p>
          <h2 className="heading-2">Story of Our Juice Shop</h2>
          <p className="text">
            Founded in the heart of the city, our juice shop began with a simple
            mission: to provide fresh, natural, and delicious juices that
            refresh both body and mind. We believe in quality ingredients and
            passionate craftsmanship.
          </p>
          <p className="text">
            Over the years, our commitment to health and flavor has made us a
            favorite spot for locals and visitors alike. Every bottle tells a
            story of nature’s bounty, care, and the joy of sharing something
            truly wholesome.
          </p>
        </div>
        <div className="our-story-section__decoration">
          <SemicircleGradient />
          {/* hello */}
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
