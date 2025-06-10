import "./QoutesSection.css";

const QoutesSection = () => {
  return (
    <div className="qout-section container mx-auto">
      <div className="qoute-section__qoute">
        {/* Heading */}
        <div className="qout-section__heading">
          <img
            src="/assets/icons/qoute.svg"
            className="brand-story-section__image"
          />
        </div>
        {/* Text */}
        <p>
          I am absolutely blown away by the flavors of the juices at this shop!
          Each sip is a burst of freshness and natural goodness.
        </p>
        {/* Footer */}
        <div className="qout-section__footer">
          <img
            src="/assets/icons/wheel.svg"
            className="brand-story-section__image"
          />
          <span className="heading-4">George H</span>
        </div>
      </div>
    </div>
  );
};

export default QoutesSection;
