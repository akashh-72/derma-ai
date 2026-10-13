import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  Stethoscope, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { CONDITIONS_DIRECTORY } from '../data/mockData';

export default function DiseaseDirectory({ onSelectCondition }) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterOptions = ['All', 'Sebaceous & Facial Vascular', 'Inflammatory / Barrier Defect', 'Infectious', 'Follicular / Autoimmune', 'Neoplastic', 'Vascular', 'Physiological Control'];

  const filteredConditions = CONDITIONS_DIRECTORY.filter(item => {
    const matchesFilter = selectedFilter === 'All' || item.type.includes(selectedFilter) || (selectedFilter === 'Infectious' && item.type.includes('Infectious'));
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.keySign.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.datasetFolder && item.datasetFolder.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="skinive-conditions-section" id="conditions">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="skinive-section-eyebrow">
            <span className="eyebrow-pulse-dot"></span>
            <span>Balanced Dataset Taxonomy</span>
          </span>
          <h2 className="skinive-section-title">
            Balanced Dataset Scope: <span className="text-electric">8 Clinical Conditions Triaged</span>
          </h2>
          <p className="skinive-section-desc">
            DermaAI is trained on balanced image archives covering 8 targeted dermatological categories: Acne & Rosacea, Eczema, Fungal Infections, Alopecia, Healthy Control, Melanoma, Vascular Tumors, and Chickenpox.
          </p>
        </div>

        {/* Modern Filter Bar */}
        <div className="directory-modern-filter-bar">
          <div className="directory-search-capsule">
            <Search size={20} className="search-icon-blue" />
            <input 
              type="text" 
              placeholder="Search by condition name, symptoms, or dataset folder..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="directory-search-input"
            />
          </div>

          <div className="directory-pills-scroll">
            {filterOptions.map(cat => (
              <button
                key={cat}
                className={`directory-category-pill ${selectedFilter === cat ? 'active' : ''}`}
                onClick={() => setSelectedFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Conditions Grid */}
        <div className="directory-squircles-grid">
          {filteredConditions.map(item => (
            <div key={item.id} className="directory-condition-squircle-card">
              <div className="condition-card-header">
                <span className="condition-category-badge">{item.type}</span>
                <span className="condition-prevalence-tag">{item.prevalence}</span>
              </div>

              <div style={{ margin: '6px 0' }}>
                <span style={{ fontSize: '11px', color: '#60A5FA', background: 'rgba(59, 130, 246, 0.12)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(59, 130, 246, 0.25)' }}>
                  📁 balanced_dataset/{item.datasetFolder}
                </span>
              </div>

              <h3 className="condition-title-heading">{item.title}</h3>
              <p className="condition-desc-body">{item.description}</p>

              <div className="condition-hallmark-box">
                <span className="hallmark-kicker">Key Clinical Sign:</span>
                <span className="hallmark-details">{item.keySign}</span>
              </div>

              <div className="condition-card-footer">
                <button 
                  className="condition-action-btn"
                  onClick={() => onSelectCondition(item.id)}
                >
                  <span>Test in Scanner</span>
                  <div className="condition-action-arrow">
                    <ArrowRight size={15} />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Clinical Dataset Evidence Banner */}
        <div className="directory-dataset-evidence-card">
          <div className="dataset-icon-squircle">
            <Stethoscope size={28} color="#0055FF" strokeWidth={2.4} />
          </div>
          <div className="dataset-evidence-body">
            <h4 className="dataset-evidence-title">Verified on Balanced Clinical Image Archives</h4>
            <p className="dataset-evidence-p">
              Evaluated with balanced multiclass training across all 8 folders in <code>balanced_dataset</code> with histopathology and clinical ground truth verified by board-certified dermatologists.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
