import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Image, 
  ShieldCheck, 
  CheckCheck, 
  Phone, 
  Video, 
  MoreVertical,
  Paperclip,
  Smile,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { CLINICAL_CASES } from '../../data/mockData';

export default function WhatsAppSimTab({ onMatchDoctorFromWhatsApp }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "👋 Hello! Welcome to *DermaAI Clinical Assistant*.\n\nYou can send a clear photo of your skin rash, patch, or lesion here for instant CNN analysis & Grad-CAM visual triage.",
      time: "10:15 AM"
    },
    {
      id: 2,
      sender: 'user',
      text: "Hi, I have developed this itchy red patch on my elbow. What could it be?",
      time: "10:16 AM"
    },
    {
      id: 3,
      sender: 'user',
      hasImage: true,
      imageSrc: CLINICAL_CASES[0].originalImage,
      time: "10:16 AM"
    },
    {
      id: 4,
      sender: 'bot',
      isTriageReport: true,
      caseData: CLINICAL_CASES[0],
      time: "10:17 AM"
    }
  ]);

  const [inputMsg, setInputMsg] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputMsg('');

    // Automated bot reply
    setTimeout(() => {
      const botReply = {
        id: Date.now() + 1,
        sender: 'bot',
        text: "Thank you for the update. If you would like to book a dermatologist in Kolhapur or Pune, please click 'Book Nearby Dermatologist' below or upload an image.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botReply]);
    }, 800);
  };

  const handleSendTestImage = (caseIdx = 1) => {
    const selected = CLINICAL_CASES[caseIdx];
    const userImgMsg = {
      id: Date.now(),
      sender: 'user',
      hasImage: true,
      imageSrc: selected.originalImage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userImgMsg]);

    setTimeout(() => {
      const botReport = {
        id: Date.now() + 1,
        sender: 'bot',
        isTriageReport: true,
        caseData: selected,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botReport]);
    }, 1200);
  };

  return (
    <div className="dashboard-tab-content whatsapp-sim-container">
      {/* Top Header Card */}
      <div className="clinical-card whatsapp-intro-card">
        <div className="intro-header-row">
          <div>
            <div className="channel-badge">
              <MessageSquare size={14} />
              <span>Multi-Channel WhatsApp Service</span>
            </div>
            <h3 className="tab-title">Interactive WhatsApp Bot Simulator</h3>
            <p className="tab-sub">
              Demonstrates the frictionless mobile messaging channel detailed in Slide 5 & 8 of the DermaAI architecture. Patients submit photos directly via WhatsApp and receive instant Grad-CAM triage reports and clinic booking links.
            </p>
          </div>
          <div className="intro-actions">
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => handleSendTestImage(1)}
            >
              <span>Simulate Sending Psoriasis Photo</span>
            </button>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => handleSendTestImage(3)}
            >
              <span>Simulate Sending Melanoma Photo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Realistic WhatsApp Chat Device Container */}
      <div className="whatsapp-phone-frame clinical-card">
        {/* WhatsApp App Bar */}
        <div className="wa-app-bar">
          <div className="wa-peer-profile">
            <div className="wa-avatar-box">
              <span className="wa-avatar-text">AI</span>
              <span className="wa-online-dot"></span>
            </div>
            <div className="wa-peer-info">
              <div className="wa-name-row">
                <span className="wa-peer-name">DermaAI Medical Bot</span>
                <ShieldCheck size={15} className="wa-verified-icon" />
              </div>
              <span className="wa-status-text">Official Verified Health Channel</span>
            </div>
          </div>

          <div className="wa-header-icons">
            <Phone size={18} />
            <Video size={18} />
            <MoreVertical size={18} />
          </div>
        </div>

        {/* WhatsApp Chat Body */}
        <div className="wa-chat-body">
          <div className="wa-encryption-pill">
            <ShieldCheck size={12} />
            <span>Messages are end-to-end encrypted under HIPAA healthcare standards.</span>
          </div>

          {messages.map(msg => (
            <div key={msg.id} className={`wa-bubble-wrapper ${msg.sender === 'user' ? 'outgoing' : 'incoming'}`}>
              <div className={`wa-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                {msg.text && (
                  <div className="wa-text-content">
                    {msg.text.split('\n').map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                )}

                {msg.hasImage && (
                  <div className="wa-image-attachment">
                    <img src={msg.imageSrc} alt="User skin upload" className="wa-sent-img" />
                    <span className="wa-img-caption">Dermoscopic image uploaded by patient</span>
                  </div>
                )}

                {msg.isTriageReport && (
                  <div className="wa-triage-card">
                    <div className="wa-report-header">
                      <span className="wa-report-title">🔬 DERMA-AI TRIAGE REPORT</span>
                      <span className="badge badge-blue">CNN Validated</span>
                    </div>

                    <div className="wa-report-diagnosis">
                      <span className="wa-cond-lbl">Predicted Condition:</span>
                      <h4 className="wa-cond-val">{msg.caseData.name}</h4>
                    </div>

                    <div className="wa-conf-strip">
                      <span>Model Confidence: <strong>{msg.caseData.confidence}%</strong></span>
                      <span className="wa-urgency-tag">Urgency: {msg.caseData.urgency}</span>
                    </div>

                    {/* Grad-CAM Heatmap thumbnail in WhatsApp */}
                    <div className="wa-xai-preview-box">
                      <span className="wa-xai-lbl">Grad-CAM Feature Activation Map:</span>
                      <img src={msg.caseData.gradcamImage} alt="Grad-CAM Heatmap" className="wa-gradcam-thumb" />
                    </div>

                    <div className="wa-precaution-summary">
                      <strong>Immediate Advice:</strong>
                      <p>{msg.caseData.precautions[0]}</p>
                    </div>

                    <div className="wa-interactive-btn-group">
                      <button 
                        className="wa-action-btn"
                        onClick={() => onMatchDoctorFromWhatsApp(msg.caseData)}
                      >
                        <UserCheck size={15} />
                        <span>Book Nearby Dermatologist</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="wa-meta-row">
                  <span className="wa-time-stamp">{msg.time}</span>
                  {msg.sender === 'user' && (
                    <CheckCheck size={15} className="wa-ticks-blue" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Input Bar */}
        <form onSubmit={handleSendMessage} className="wa-input-bar">
          <Smile size={20} className="wa-input-icon" />
          <Paperclip size={20} className="wa-input-icon" onClick={() => handleSendTestImage(0)} title="Attach dermoscopic photo" />
          <input 
            type="text" 
            placeholder="Type a symptom or question..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            className="wa-text-input"
          />
          <button type="submit" className="wa-send-btn">
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
