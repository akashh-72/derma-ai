import React, { useState } from 'react';
import { 
  UserCheck, 
  MapPin, 
  Star, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Search, 
  Filter, 
  CheckCircle2, 
  Sliders,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { DERMATOLOGISTS } from '../../data/mockData';

export default function DoctorMatchTab({ onSelectDoctor, currentDiagnosis }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('any'); // 'any' | 'female' | 'male'
  const [availabilityFilter, setAvailabilityFilter] = useState('all'); // 'all' | 'today' | 'tomorrow'
  const [sortBy, setSortBy] = useState('matchScore'); // 'matchScore' | 'distance' | 'rating'

  const cities = ['All', 'Kolhapur', 'Pune', 'Mumbai'];

  // Smart Matching Scoring Algorithm
  const calculateDoctorScore = (doc) => {
    let score = 100;

    // Distance factor (closer is better)
    score -= (doc.distanceKm * 5);

    // Gender preference matching
    if (genderFilter !== 'any') {
      if (doc.gender === genderFilter) {
        score += 30; // matched preference boost
      } else {
        score -= 50; // deprioritize if preference does not match
      }
    }

    // Availability factor
    if (doc.availableToday) score += 20;

    // Rating factor
    score += (doc.rating * 10);

    return Math.round(score);
  };

  const filteredDoctors = DERMATOLOGISTS.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.clinicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCity = cityFilter === 'All' || doc.city === cityFilter;
    const matchesGender = genderFilter === 'any' || doc.gender === genderFilter;
    const matchesAvailability = availabilityFilter === 'all' || 
                                (availabilityFilter === 'today' && doc.availableToday) ||
                                (availabilityFilter === 'tomorrow' && !doc.availableToday);

    return matchesSearch && matchesCity && matchesGender && matchesAvailability;
  }).map(doc => ({
    ...doc,
    matchScore: calculateDoctorScore(doc)
  })).sort((a, b) => {
    if (sortBy === 'matchScore') return b.matchScore - a.matchScore;
    if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="dashboard-tab-content doctor-match-container">
      {/* Top Banner */}
      <div className="clinical-card doctor-match-header-card">
        <div className="match-header-row">
          <div>
            <h3 className="tab-title">Smart Dermatologist Matching</h3>
            <p className="tab-sub">
              Algorithmic clinical matching based on location proximity, real-time schedule, and patient gender preferences.
            </p>
          </div>
          {currentDiagnosis && (
            <div className="attached-triage-pill">
              <span className="pill-kicker">Triaging for:</span>
              <span className="pill-name">{currentDiagnosis.name}</span>
            </div>
          )}
        </div>

        {/* Filter Controls Grid */}
        <div className="smart-filters-grid">
          {/* Search */}
          <div className="filter-input-wrap">
            <Search size={16} className="filter-icon" />
            <input 
              type="text" 
              placeholder="Search by doctor name or condition specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="filter-input-field"
            />
          </div>

          {/* City */}
          <div className="filter-select-wrap">
            <MapPin size={16} className="filter-icon" />
            <select 
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="filter-select-field"
            >
              {cities.map(c => (
                <option key={c} value={c}>City: {c}</option>
              ))}
            </select>
          </div>

          {/* Gender Preference */}
          <div className="filter-select-wrap">
            <UserCheck size={16} className="filter-icon" />
            <select 
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="filter-select-field"
            >
              <option value="any">Doctor Gender: Any Preference</option>
              <option value="female">Doctor Gender: Female Only</option>
              <option value="male">Doctor Gender: Male Only</option>
            </select>
          </div>

          {/* Availability */}
          <div className="filter-select-wrap">
            <Clock size={16} className="filter-icon" />
            <select 
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="filter-select-field"
            >
              <option value="all">Availability: Any Date</option>
              <option value="today">Available Today</option>
              <option value="tomorrow">Available Tomorrow</option>
            </select>
          </div>
        </div>

        {/* Sort Bar */}
        <div className="match-sort-bar">
          <span className="sort-title">Rank Results By:</span>
          <div className="sort-buttons-row">
            <button 
              className={`sort-pill ${sortBy === 'matchScore' ? 'active' : ''}`}
              onClick={() => setSortBy('matchScore')}
            >
              ⚡ Smart Match Score (Recommended)
            </button>
            <button 
              className={`sort-pill ${sortBy === 'distance' ? 'active' : ''}`}
              onClick={() => setSortBy('distance')}
            >
              Closest Distance (km)
            </button>
            <button 
              className={`sort-pill ${sortBy === 'rating' ? 'active' : ''}`}
              onClick={() => setSortBy('rating')}
            >
              Highest Rating
            </button>
          </div>
        </div>
      </div>

      {/* Doctor Cards Directory */}
      <div className="match-results-list">
        {filteredDoctors.length === 0 ? (
          <div className="clinical-card empty-results-card text-center">
            <AlertCircle size={40} className="text-warning mb-2" />
            <h4>No Dermatologists Match Your Current Filter</h4>
            <p>Try switching doctor gender preference to "Any" or selecting "All Cities".</p>
            <button 
              className="btn btn-outline btn-sm mt-3"
              onClick={() => { setCityFilter('All'); setGenderFilter('any'); setAvailabilityFilter('all'); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredDoctors.map(doc => (
            <div key={doc.id} className="clinical-card doctor-match-item">
              <div className="item-avatar-col">
                <img src={doc.image} alt={doc.name} className="item-doc-avatar" />
                <div className="match-score-badge" title="Algorithmic Match Score">
                  <span className="score-num">{doc.matchScore}%</span>
                  <span className="score-lbl">Match</span>
                </div>
              </div>

              <div className="item-info-col">
                <div className="item-title-row">
                  <div>
                    <h3 className="item-doc-name">
                      {doc.name}
                      {doc.verified && (
                        <ShieldCheck size={16} className="text-electric ml-1 inline" title="Verified License" />
                      )}
                    </h3>
                    <p className="item-doc-credentials">{doc.title}</p>
                  </div>
                  <div className="item-rating-pill">
                    <Star size={14} fill="#F59E0B" className="text-warning" />
                    <span>{doc.rating}</span>
                    <span className="text-muted text-xs">({doc.reviewsCount} reviews)</span>
                  </div>
                </div>

                <div className="item-clinic-location">
                  <span className="clinic-title">{doc.clinicName}</span>
                  <span className="clinic-address">• {doc.address}</span>
                </div>

                <div className="item-tags-row">
                  <span className="item-tag distance-tag">
                    <MapPin size={13} /> {doc.distanceKm} km away
                  </span>
                  <span className="item-tag capitalize">
                    {doc.gender} Doctor
                  </span>
                  <span className="item-tag">
                    {doc.experienceYears} Years Clinical Experience
                  </span>
                  <span className="item-tag fee-tag">
                    Consultation: {doc.fee}
                  </span>
                </div>

                {/* Specialties Chips */}
                <div className="item-specialties-row">
                  <span className="specialty-lbl">Focus:</span>
                  {doc.specialties.map(spec => (
                    <span key={spec} className="spec-chip">{spec}</span>
                  ))}
                </div>
              </div>

              <div className="item-actions-col">
                <div className="item-slot-alert">
                  <Clock size={15} className="text-electric" />
                  <div>
                    <span className="slot-title">Next Available:</span>
                    <strong className="slot-highlight">{doc.nextSlot}</strong>
                  </div>
                </div>

                <button 
                  className="btn btn-primary btn-block btn-booking-action"
                  onClick={() => onSelectDoctor(doc)}
                >
                  <Calendar size={16} />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
