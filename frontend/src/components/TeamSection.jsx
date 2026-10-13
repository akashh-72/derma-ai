import React from 'react';
import { GraduationCap, Award, BookOpen, Sparkles } from 'lucide-react';
import { TEAM_MEMBERS, PROJECT_GUIDE } from '../data/mockData';

export default function TeamSection() {
  return (
    <section className="skinive-team-section" id="team">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="skinive-section-eyebrow">
            <span className="eyebrow-pulse-dot"></span>
            <span>Academic Research Contributors</span>
          </span>
          <h2 className="skinive-section-title">
            The <span className="text-electric">Research Team</span>
          </h2>
          <p className="skinive-section-desc">
            An engineering initiative designed to bridge deep image analysis, visual interpretability, and clinical dermatology access.
          </p>
        </div>

        {/* 3 Student Researcher Squircles */}
        <div className="team-squircles-grid">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.rollNo} className="team-member-squircle-card">
              <div className="member-avatar-squircle">
                <span className="member-initials-txt">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="member-roll-pill-badge">{member.badge}</div>
              <h3 className="member-name-heading">{member.name}</h3>
              <p className="member-role-description">{member.role}</p>
            </div>
          ))}
        </div>

        {/* Faculty Project Guide Spotlight Card (Electric Blue Hero Squircle) */}
        <div className="team-guide-spotlight-squircle">
          <div className="guide-icon-squircle-box">
            <GraduationCap size={40} color="#0055FF" strokeWidth={2.4} />
          </div>
          <div className="guide-text-content">
            <span className="guide-spotlight-tag">FACULTY PROJECT GUIDE & DEPARTMENT MENTOR</span>
            <h3 className="guide-name-title">{PROJECT_GUIDE.name}</h3>
            <p className="guide-designation-text">{PROJECT_GUIDE.designation}</p>
            <p className="guide-inst-text">{PROJECT_GUIDE.institution}</p>
          </div>
        </div>

      </div>
    </section>
  );
}
