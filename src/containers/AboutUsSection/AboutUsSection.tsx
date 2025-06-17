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
          accumsan vivamus sit tellus. Adipiscing morbi viverra amet justo dolor
          enim cursus. Nibh duis vel at placerat. Ultricies ornare ut hendrerit
          ut donec semper etiam nec commodo.Mauris purus egestas convallis
          ipsumaccumsan vivamus sit tellus. Adipiscing morbi viverra amet justo
          dolor enim cursus. Nibh duis vel at placerat. Ultricies ornare ut
          hendrerit ut donec semper etiam nec commodo.Mauris purus egestas
          convallis ipsum.
        </p>
        <p className="text">
          Dui morbi mi nibh velit neque rhoncus vitae lorem curabitur. Duis
          dolor tortor viverra ut suscipit nisl. Ultrices vitae pretium molestie
          sed blandit pellentesque eu amet proin Adipiscing aliquam hac
          tincidunt.accumsan vivamus sit tellus. Adipiscing morbi viverra amet
          justo dolor enim cursus. Nibh duis vel at placerat. Ultricies ornare
          ut hendrerit ut donec semper etiam nec commodo.Mauris purus egestas
          convallis ipsumaccumsan vivamus sit tellus. Adipiscing morbi viverra
          amet justo dolor enim cursus. Nibh duis vel at placerat. Ultricies
          ornare ut hendrerit ut donec semper etiam nec commodo.Mauris purus
          egestas convallis ipsum
        </p>
      </div>
    </div>
  );
};

export default AboutUsSection;
