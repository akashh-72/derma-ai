import React, { useState } from 'react';
import { 
  MapPin, 
  Star, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Calendar,
  Sparkles
} from 'lucide-react';
import { DERMATOLOGISTS } from '../data/mockData';

export default function DoctorMatchPreview({ onSelectDoctor, onOpenAllDoctors }) {
  const [cityFilter, setCityFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('any'); // 'any' | 'female' | 'male'

  const cities = ['All', 'Kolhapur', 'Pune', 'Mumbai'];

  const filteredDoctors = DERMATOLOGISTS.filter(doc => {
    const matchesCity = cityFilter === 'All' || doc.city === cityFilter;
    const matchesGender = genderFilter === 'any' || doc.gender === genderFilter;
    return matchesCity && matchesGender;
  });

  return (
    <section className="skinive-doctor-preview-section" id="doctor-preview">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="skinive-section-eyebrow">
            <span className="eyebrow-pulse-dot"></span>
            <span>Clinical Triage Connect</span>
          </span>
          <h2 className="skinive-section-title">
            Connect with Nearby <span className="text-electric">Certified Dermatologists</span>
          </h2>
          <p className="skinive-section-desc">
            AI triage is the first step. DermaAI connects you with verified local dermatologists filtered by GPS distance, same-day slot availability, and doctor gender preference.
          </p>
        </div>

        {/* Modern Filter Pill Bar */}
        <div className="doctor-filter-pills-bar">
          <div className="filter-pill-cluster">
            <span className="cluster-label">City:</span>
            <div className="cluster-pills-row">
              {cities.map(city => (
                <button
                  key={city}
                  className={`doc-filter-pill-btn ${cityFilter === city ? 'active' : ''}`}
                  onClick={() => setCityFilter(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-pill-cluster">
            <span className="cluster-label">Doctor Preference:</span>
            <div className="cluster-pills-row">
              <button 
                className={`doc-filter-pill-btn ${genderFilter === 'any' ? 'active' : ''}`}
                onClick={() => setGenderFilter('any')}
              >
                Any Preference
              </button>
              <button 
                className={`doc-filter-pill-btn ${genderFilter === 'female' ? 'active' : ''}`}
                onClick={() => setGenderFilter('female')}
              >
                Female Doctor
              </button>
              <button 
                className={`doc-filter-pill-btn ${genderFilter === 'male' ? 'active' : ''}`}
                onClick={() => setGenderFilter('male')}
              >
                Male Doctor
              </button>
            </div>
          </div>
        </div>

        {/* 3-Column Senior UI Doctor Cards Grid */}
        <div className="doctor-squircles-grid">
          {filteredDoctors.slice(0, 3).map(doc => (
            <div key={doc.id} className="doctor-squircle-card">
              <div className="doctor-card-top-profile">
                <img src={doc.image} alt={doc.name} className="doctor-avatar-squircle" />
                <div className="doctor-meta-block">
                  <div className="doctor-name-row">
                    <h3 className="doctor-name-heading">{doc.name}</h3>
                    <ShieldCheck size={18} color="#0055FF" title="Verified Medical Practitioner" />
                  </div>
                  <p className="doctor-title-sub">{doc.title}</p>
                  <div className="doctor-rating-pill-row">
                    <div className="rating-stars-group">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill="#FF9500" color="#FF9500" />
                      ))}
                    </div>
                    <span className="rating-score-num">{doc.rating}</span>
                    <span className="rating-reviews-bracket">({doc.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="doctor-clinic-details-card">
                <span className="clinic-name-text">{doc.clinicName}</span>
                <div className="clinic-geo-line">
                  <MapPin size={14} color="#0055FF" />
                  <span>{doc.distance} km away • {doc.city}</span>
                </div>
              </div>

              <div className="doctor-appointment-meta-bar">
                <div className="slot-pill-tag">
                  <Clock size={14} color="#0055FF" />
                  <span>Slot: {doc.nextSlot}</span>
                </div>
                <span className="consultation-fee-pill">₹{doc.fee}</span>
              </div>

              <div className="doctor-card-action-footer">
                <button 
                  className="doctor-book-action-btn"
                  onClick={() => onSelectDoctor(doc)}
                >
                  <Calendar size={16} />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="section-cta-center">
          <button 
            className="skinive-btn-pill-secondary"
            onClick={onOpenAllDoctors}
          >
            <span>Explore All Verified Clinics in Workspace</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
