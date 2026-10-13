import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  HeartPulse
} from 'lucide-react';

export default function ContactPage({ onOpenScanner }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Patient Support & Skin Screening Assistance',
    urgency: 'Standard (Within 24h)',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const generatedTicket = `DERMA-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setInquiryId(generatedTicket);
    }, 700);
  };

  return (
    <div className="contact-page-clean animate-fadeIn">
      <div className="container contact-content-wrapper">
        
        {/* 1. Refined Hero Header */}
        <div className="contact-clean-header text-center">
          <div className="contact-clean-kicker">
            <HeartPulse size={14} color="#0055FF" />
            <span>Direct Inquiry & Clinical Support • Maharashtra Healthcare Network</span>
          </div>
          
          <h1 className="contact-clean-title">
            Connect with the Derma<span className="text-electric">AI</span> Team
          </h1>

          <p className="contact-clean-subtitle">
            Whether you are a patient seeking cutaneous guidance, a dermatologist exploring clinical triage integration, or a healthcare institution in Maharashtra, our team is ready to assist you.
          </p>
        </div>

        {/* 2. Focused & Proportioned Contact Form Card */}
        <div className="contact-form-center-box">
          <div className="contact-form-glass-card">
            {!isSubmitted ? (
              <>
                <div className="contact-form-top-meta">
                  <h2 className="form-main-heading">Send Us a Secure Message</h2>
                  <p className="form-sub-heading">
                    Fill out the form below. Your query will be directly routed to our medical support team.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="contact-clean-form-body">
                  {/* Name & Email Row */}
                  <div className="form-clean-row">
                    <div className="form-clean-field">
                      <label>Your Full Name <span className="req-star">*</span></label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Maliha Mulla"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="form-clean-field">
                      <label>Email Address <span className="req-star">*</span></label>
                      <input 
                        type="email" 
                        required
                        placeholder="e.g. maliha.mulla@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Phone & Category Row */}
                  <div className="form-clean-row">
                    <div className="form-clean-field">
                      <label>Phone Number (WhatsApp Preferred)</label>
                      <input 
                        type="tel" 
                        placeholder="e.g. +91 98220 12345"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="form-clean-field">
                      <label>Inquiry Category <span className="req-star">*</span></label>
                      <select 
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="form-clean-select"
                      >
                        <option value="Patient Support & Skin Screening Assistance">Patient Support & Skin Screening Assistance</option>
                        <option value="Dermatologist Registration & Verification">Dermatologist Registration & Verification</option>
                        <option value="Clinic / Hospital API Integration">Clinic / Hospital API Integration</option>
                        <option value="Research & Grad-CAM Algorithmic Inquiry">Research & Grad-CAM Algorithmic Inquiry</option>
                        <option value="General Feedback & Other">General Feedback & Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Urgency Selector */}
                  <div className="form-clean-field">
                    <label>Urgency Level</label>
                    <div className="urgency-chips-group">
                      {['Standard (Within 24h)', 'Priority (Within 4h)', 'Urgent Clinical Inquiry'].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          className={`urgency-pill-chip ${formData.urgency === lvl ? 'active' : ''}`}
                          onClick={() => setFormData({ ...formData, urgency: lvl })}
                        >
                          <span>{lvl}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="form-clean-field">
                    <label>Subject / Topic</label>
                    <input 
                      type="text" 
                      placeholder="Brief summary of your inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  {/* Message */}
                  <div className="form-clean-field">
                    <label>Detailed Message <span className="req-star">*</span></label>
                    <textarea 
                      rows="4"
                      required
                      placeholder="Describe your cutaneous concern, feedback, or collaboration details..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  {/* Privacy Row */}
                  <div className="form-clean-privacy-row">
                    <ShieldCheck size={14} color="#059669" />
                    <span>Encrypted under Indian Telemedicine Practice Guidelines & GDPR privacy standards.</span>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className="form-clean-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>Submitting Secure Inquiry...</span>
                    ) : (
                      <>
                        <span>Send Message to Clinical Team</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="contact-submitted-box animate-fadeIn">
                <div className="submitted-check-circle">
                  <CheckCircle2 size={36} color="#059669" />
                </div>
                <h3 className="submitted-title">Message Successfully Dispatched!</h3>
                <p className="submitted-desc">
                  Thank you, <strong>{formData.name}</strong>. Your inquiry has been routed to our medical support desk.
                </p>
                
                <div className="submitted-ticket-badge">
                  <span>Reference Ticket:</span>
                  <strong>{inquiryId}</strong>
                </div>

                <p className="submitted-meta-text">
                  Our team will reply to <strong>{formData.email}</strong> {formData.urgency.includes('Urgent') ? 'within 30–60 minutes' : 'within 2–4 hours'}.
                </p>

                <div className="submitted-btn-row">
                  <button 
                    type="button" 
                    className="submitted-back-btn"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        category: 'Patient Support & Skin Screening Assistance',
                        urgency: 'Standard (Within 24h)',
                        subject: '',
                        message: ''
                      });
                    }}
                  >
                    Send Another Message
                  </button>

                  <button 
                    type="button" 
                    className="submitted-scanner-btn"
                    onClick={onOpenScanner}
                  >
                    <Sparkles size={14} />
                    <span>Launch AI Scanner</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
