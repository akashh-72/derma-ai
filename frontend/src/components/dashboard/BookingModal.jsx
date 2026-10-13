import React, { useState } from 'react';
import { X, Calendar, Clock, User, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function BookingModal({ doctor, isOpen, onClose, onConfirmBooking, currentDiagnosis }) {
  if (!isOpen || !doctor) return null;

  const [selectedSlot, setSelectedSlot] = useState(doctor.availableSlots[0] || 'Today 4:30 PM');
  const [patientNotes, setPatientNotes] = useState(
    currentDiagnosis ? `Consultation for AI-detected condition: ${currentDiagnosis.name}` : ''
  );
  const [patientPhone, setPatientPhone] = useState('+91 98230 45678');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onConfirmBooking({
          id: `apt-${Date.now()}`,
          doctorId: doctor.id,
          doctorName: doctor.name,
          clinicName: doctor.clinicName,
          slot: selectedSlot,
          notes: patientNotes,
          diagnosis: currentDiagnosis ? currentDiagnosis.name : 'General Consultation',
          status: 'Confirmed',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        });
        setIsSuccess(false);
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container booking-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close booking modal">
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="booking-success-pane text-center">
            <div className="success-icon-wrap">
              <CheckCircle2 size={48} className="text-success" />
            </div>
            <h3 className="success-title">Appointment Confirmed!</h3>
            <p className="success-sub">
              Your consultation with <strong>{doctor.name}</strong> is scheduled for <strong>{selectedSlot}</strong>.
            </p>
            <div className="success-sms-note">
              <span>SMS & WhatsApp confirmation sent to {patientPhone}.</span>
            </div>
          </div>
        ) : (
          <>
            <div className="booking-modal-header">
              <div className="booking-doc-summary">
                <img src={doctor.image} alt={doctor.name} className="booking-doc-avatar" />
                <div>
                  <h3 className="booking-doc-name">{doctor.name}</h3>
                  <p className="booking-doc-title">{doctor.title}</p>
                  <p className="booking-doc-clinic">{doctor.clinicName} • {doctor.city}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="booking-form-body">
              {currentDiagnosis && (
                <div className="booking-diagnosis-attached">
                  <span className="attach-label">Attached AI Triage Result:</span>
                  <div className="attach-pill">
                    <span className="attach-name">{currentDiagnosis.name}</span>
                    <span className="attach-conf">{currentDiagnosis.confidence}% Confidence</span>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">
                  <Clock size={15} className="text-electric" />
                  <span>Select Consultation Time Slot</span>
                </label>
                <div className="slots-radio-grid">
                  {doctor.availableSlots.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      className={`slot-chip ${selectedSlot === slot ? 'active' : ''}`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <User size={15} className="text-electric" />
                  <span>Contact Phone / WhatsApp Number</span>
                </label>
                <input 
                  type="text" 
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <FileText size={15} className="text-electric" />
                  <span>Symptoms & Consultation Notes for Doctor</span>
                </label>
                <textarea 
                  rows={3}
                  value={patientNotes}
                  onChange={(e) => setPatientNotes(e.target.value)}
                  className="form-input form-textarea"
                  placeholder="Describe your symptoms, how long you've noticed them, and any previous treatments..."
                ></textarea>
              </div>

              <div className="booking-fee-row">
                <span className="fee-label">Consultation Fee (Pay at Clinic):</span>
                <span className="fee-value">{doctor.fee}</span>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Reserving Slot...</span>
                ) : (
                  <>
                    <Calendar size={18} />
                    <span>Confirm Appointment Reservation</span>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
