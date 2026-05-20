'use client';

import { useState } from 'react';

export default function Settings() {
  const [profile, setProfile] = useState({
    fullName: 'Shilpa Kumar',
    email: 'shilpa@example.com',
    currency: 'USD',
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    budgetAlerts: true,
    weeklyReport: true,
    monthlyReport: false,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleNotificationChange = (key: string) => {
    setNotifications({ ...notifications, [key]: !notifications[key as keyof typeof notifications] });
  };

  const handleSecurityChange = (key: string) => {
    setSecurity({ ...security, [key]: !security[key as keyof typeof security] });
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-container">
      <h1 className="page-title">Settings</h1>

      <div className="settings-sections">
        {/* Profile Section */}
        <div className="settings-section">
          <h2 className="section-title">Profile Information</h2>
          <div className="settings-group">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={profile.fullName}
                onChange={handleProfileChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="currency">Preferred Currency</label>
              <select
                id="currency"
                name="currency"
                value={profile.currency}
                onChange={handleProfileChange}
                className="form-input"
              >
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>INR</option>
                <option>JPY</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="settings-section">
          <h2 className="section-title">Notification Preferences</h2>
          <div className="settings-group">
            <div className="toggle-item">
              <div className="toggle-info">
                <label>Email Alerts</label>
                <p>Receive notifications via email</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.emailAlerts}
                onChange={() => handleNotificationChange('emailAlerts')}
                className="toggle-checkbox"
              />
            </div>

            <div className="toggle-item">
              <div className="toggle-info">
                <label>Budget Alerts</label>
                <p>Get notified when you exceed budget limits</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.budgetAlerts}
                onChange={() => handleNotificationChange('budgetAlerts')}
                className="toggle-checkbox"
              />
            </div>

            <div className="toggle-item">
              <div className="toggle-info">
                <label>Weekly Report</label>
                <p>Receive weekly financial summary</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.weeklyReport}
                onChange={() => handleNotificationChange('weeklyReport')}
                className="toggle-checkbox"
              />
            </div>

            <div className="toggle-item">
              <div className="toggle-info">
                <label>Monthly Report</label>
                <p>Receive monthly financial summary</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.monthlyReport}
                onChange={() => handleNotificationChange('monthlyReport')}
                className="toggle-checkbox"
              />
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="settings-section">
          <h2 className="section-title">Security & Privacy</h2>
          <div className="settings-group">
            <div className="toggle-item">
              <div className="toggle-info">
                <label>Two-Factor Authentication</label>
                <p>Add an extra layer of security to your account</p>
              </div>
              <input
                type="checkbox"
                checked={security.twoFactor}
                onChange={() => handleSecurityChange('twoFactor')}
                className="toggle-checkbox"
              />
            </div>

            <div className="toggle-item">
              <div className="toggle-info">
                <label>Login Alerts</label>
                <p>Get notified of new login attempts</p>
              </div>
              <input
                type="checkbox"
                checked={security.loginAlerts}
                onChange={() => handleSecurityChange('loginAlerts')}
                className="toggle-checkbox"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button onClick={handleSave} className="save-btn">
          Save Changes
        </button>
        <button className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
}
