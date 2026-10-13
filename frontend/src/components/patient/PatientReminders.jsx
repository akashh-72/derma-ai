import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Clock, 
  Sun, 
  Plus, 
  CheckCircle2, 
  Trash2, 
  Sparkles, 
  ShieldCheck, 
  RotateCcw,
  AlertCircle
} from 'lucide-react';

export default function PatientReminders({ user }) {
  const [reminders, setReminders] = useState(() => {
    try {
      const saved = localStorage.getItem('dermaai_reminders');
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    return [
      {
        id: 'rem-1',
        title: 'Morning Sunscreen (Broad-Spectrum SPF 50+)',
        time: '08:00 AM',
        frequency: 'Daily',
        category: 'sunscreen',
        active: true,
        completed: true
      },
      {
        id: 'rem-2',
        title: 'Midday Sunscreen Reapplication',
        time: '12:30 PM',
        frequency: 'Every 3 Hours',
        category: 'sunscreen',
        active: true,
        completed: false
      },
      {
        id: 'rem-3',
        title: 'Evening Ceramide Barrier Lipid Balm',
        time: '09:30 PM',
        frequency: 'Daily',
        category: 'medication',
        active: true,
        completed: false
      },
      {
        id: 'rem-4',
        title: 'Weekly Lesion Self-Monitoring Check (ABCDE)',
        time: '10:00 AM',
        frequency: 'Every Sunday',
        category: 'monitoring',
        active: true,
        completed: false
      }
    ];
  });

  // Sunscreen timer (countdown in minutes)
  const [sunscreenTimerMinutes, setSunscreenTimerMinutes] = useState(114); // ~1 hr 54 min
  const [sunscreenTimerRunning, setSunscreenTimerRunning] = useState(true);

  // Add Reminder Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('09:00 AM');
  const [newFrequency, setNewFrequency] = useState('Daily');
  const [newCategory, setNewCategory] = useState('medication');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dermaai_reminders', JSON.stringify(reminders));
    } catch (e) {}
  }, [reminders]);

  // Sunscreen countdown effect
  useEffect(() => {
    if (!sunscreenTimerRunning) return;
    const interval = setInterval(() => {
      setSunscreenTimerMinutes(prev => (prev > 0 ? prev - 1 : 120));
    }, 60000);
    return () => clearInterval(interval);
  }, [sunscreenTimerRunning]);

  const handleToggleReminder = (id) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
  };

  const handleDeleteReminder = (id) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!newTitle) return;

    const newRem = {
      id: `rem-${Date.now()}`,
      title: newTitle,
      time: newTime,
      frequency: newFrequency,
      category: newCategory,
      active: true,
      completed: false
    };

    setReminders([newRem, ...reminders]);
    setNewTitle('');
    setShowAddModal(false);
  };

  const formatCountdown = (mins) => {
    const hours = Math.floor(mins / 60);
    const m = mins % 60;
    return `${hours}h ${m < 10 ? '0' : ''}${m}m`;
  };

  return (
    <div className="patient-reminders-tab">
      {/* 1. Header Banner */}
      <div className="portal-welcome-header">
        <div className="portal-welcome-left">
          <h1>
            Daily Health Reminders & Sunscreen Timer
          </h1>
          <p>
            Stay on track with prescription topical schedules, daily ceramide barrier routines, and real-time UV photoprotection reapplication alerts.
          </p>
        </div>

        <div className="portal-welcome-actions">
          <button 
            className="portal-btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={16} />
            <span>Add Custom Reminder</span>
          </button>
        </div>
      </div>

      {/* 2. Sunscreen Reapplication Live Smart Timer Box */}
      <div className="portal-card" style={{ background: 'linear-gradient(135deg, #FFFBEB 0%, #FFFFFF 100%)', borderColor: '#FDE68A', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: '#F59E0B', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(245, 158, 11, 0.3)' }}>
              <Sun size={28} />
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#92400E', letterSpacing: '0.04em' }}>
                ACTIVE PHOTOPROTECTION COUNTDOWN
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginTop: '0.15rem' }}>
                Next Sunscreen Reapplication in: <span style={{ color: '#D97706' }}>{formatCountdown(sunscreenTimerMinutes)}</span>
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#78350F' }}>
                UV protective filters degrade every 2 hours under daylight. Reapply 2mg/cm² mineral SPF 50+.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <button
              className="portal-btn-secondary"
              onClick={() => setSunscreenTimerMinutes(120)}
              style={{ fontSize: '0.78rem' }}
            >
              <RotateCcw size={14} />
              <span>Reset 2hr Timer</span>
            </button>
            <button
              className="portal-btn-primary"
              onClick={() => {
                setSunscreenTimerMinutes(120);
                alert("Great job protecting your skin! 2-hour timer has restarted.");
              }}
              style={{ fontSize: '0.78rem', background: '#D97706', boxShadow: '0 4px 14px rgba(217, 119, 6, 0.3)' }}
            >
              <CheckCircle2 size={14} />
              <span>I Applied Sunscreen Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Active Reminders List */}
      <div className="portal-card">
        <div className="portal-card-header">
          <div className="portal-card-title-group">
            <div className="portal-card-icon">
              <Bell size={18} />
            </div>
            <div>
              <h3 className="portal-card-title">Daily Clinical Reminders</h3>
              <p className="portal-card-subtitle">Mark habits and medication tasks completed for today</p>
            </div>
          </div>
          <span className="portal-badge blue">
            {reminders.filter(r => r.completed).length} of {reminders.length} Done Today
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {reminders.map(rem => (
            <div
              key={rem.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.95rem 1.25rem',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                background: rem.completed ? '#F8FAFC' : '#FFFFFF',
                opacity: rem.completed ? 0.75 : 1,
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <input 
                  type="checkbox"
                  checked={rem.completed}
                  onChange={() => handleToggleReminder(rem.id)}
                  style={{ width: '18px', height: '18px', accentColor: '#0055FF', cursor: 'pointer' }}
                />
                <div>
                  <h4 style={{ 
                    fontSize: '0.92rem', 
                    fontWeight: 700, 
                    color: rem.completed ? '#64748B' : '#0F172A',
                    textDecoration: rem.completed ? 'line-through' : 'none'
                  }}>
                    {rem.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginTop: '0.2rem', fontSize: '0.75rem', color: '#64748B' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600, color: '#0055FF' }}>
                      <Clock size={12} /> {rem.time}
                    </span>
                    <span>•</span>
                    <span>{rem.frequency}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className={`portal-badge ${rem.completed ? 'emerald' : 'amber'}`} style={{ fontSize: '0.7rem' }}>
                  {rem.completed ? 'Completed' : 'Pending'}
                </span>
                <button
                  onClick={() => handleDeleteReminder(rem.id)}
                  style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '0.35rem' }}
                  title="Delete reminder"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Add Reminder Modal */}
      {showAddModal && (
        <div className="portal-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="portal-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="portal-modal-header">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A' }}>
                Create New Clinical Reminder
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddReminder}>
              <div className="portal-modal-body">
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '0.35rem' }}>
                    Reminder Title / Medication:
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Apply Tacrolimus 0.1% Ointment"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '0.35rem' }}>
                      Time of Day:
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. 08:30 PM"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '0.35rem' }}>
                      Recurrence Frequency:
                    </label>
                    <select
                      value={newFrequency}
                      onChange={(e) => setNewFrequency(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.85rem', background: '#FFFFFF' }}
                    >
                      <option value="Daily">Daily</option>
                      <option value="Twice Daily">Twice Daily</option>
                      <option value="Every 3 Hours">Every 3 Hours</option>
                      <option value="Weekly">Weekly</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="portal-modal-footer">
                <button 
                  type="button"
                  className="portal-btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="portal-btn-primary"
                >
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
