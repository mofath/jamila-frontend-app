import "./AboutUsSection.css";

const AboutUsSection: React.FC = () => {
  return (
    <div className="about-section container mx-auto">
      <div className="flex flex-row justify-between items-center">
        <div className="about-section__heading">
          <p className="subtitle">Who We Are</p>
          <h2 className="heading-2">Meet the Juice Crafters</h2>
          <h2 className="heading-2">Crafting Healthy Delights</h2>
        </div>
        <div>
          <img
            className="w-[250px]"
            src="/assets/icons/jamila-logo.png"
            alt="Logo"
          />
        </div>
      </div>
      <div className="about-section__content">
        <p className="text">
          Founded in 2017, our juice bar has established itself as a trusted
          destination for health-conscious individuals seeking high-quality,
          nutritious refreshments in California. We take pride in offering a
          thoughtfully curated menu that includes freshly prepared smoothies,
          juices, wellness shots, açaí bowls and more. Made with premium,
          natural ingredients to support a balanced and active lifestyle. Our
          commitment to excellence, wellness, and customer satisfaction is
          reflected in every product we serve. We are dedicated to promoting
          healthy living within our community and providing exceptional customer
          experience to each of our valued customers.
        </p>
      </div>
    </div>
  );
};

export default AboutUsSection;
