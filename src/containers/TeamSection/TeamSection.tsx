import React from "react";
import "./TeamSection.css";
import { teamMembersData } from "../../data/teamMembersData";
import { Button } from "../../components";

const TeamSection = () => {
  return (
    <section className="team-section">
      <div className="team-section__container container mx-auto">
        {/* Intro */}
        <div className="team-section__intro">
          <h3 className="subtitle">Team</h3>
          <h2 className="heading-2">Our team</h2>
          <p className="text">
            Passionate minds building fresh ideas and wellness-focused experiences
            with every juice we craft.
          </p>
          <div>
          </div>
        </div>
        {/* Members */}
        <div className="team-section__members">
          {teamMembersData.map(({ name, image, id }, index) => (
            <div
              key={id}
              className={`team-section__member-card team-section__member-card--${index === 1 ? "center" : "side"
                }`}
            >
              <div className="team-section__image-wrapper">
                <img src={image} alt={name} className="team-section__image" />
              </div>
              <div className="team-section__name">{name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
