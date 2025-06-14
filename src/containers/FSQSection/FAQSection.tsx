import { useState } from "react";
import { faqs } from "../../data/faq-data";
import "./FSQSection.css";

const FSQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq">
      <div className="faq__heading">
        <p className="subtitle">FAQ</p>
        <p className="heading-2">Get the Answers Juice Shop FAQs</p>
      </div>
      <div className="faq__list">
        {faqs.map((faq, index) => {
          const isActiveFaq = openIndex === index;
          return (
            <div
              key={index}
              className={`faq__item ${isActiveFaq ? "active" : ""}`}
            >
              <div className="faq-item__container container mx-auto">
                <div className="faq-item__index">
                  <div className="heading-1">{index + 1}</div>
                </div>
                <div className="faq-item__content">
                  <button
                    className="faq__question w-full"
                    onClick={() => toggleIndex(index)}
                  >
                    <span className="faq__question-text heading-4">
                      {faq.question}
                    </span>
                    <span className="faq__icon">
                      <img
                        src={
                          isActiveFaq
                            ? "/assets/icons/arrow-up.svg"
                            : "/assets/icons/arrow-down.svg"
                        }
                        alt=""
                      />
                    </span>
                  </button>
                  {isActiveFaq && (
                    <div className="faq__answer">{faq.answer}</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FSQSection;

// {index + 1}.
