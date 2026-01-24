import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AccountSettingsPage = () => {
  const navigate = useNavigate();
  
  // Mock state for settings
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    newTest: true,
    grades: true,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
  });

  const [appearance, setAppearance] = useState({
    darkMode: false,
  });

  const handleToggle = (category, field) => {
    if (category === 'notifications') {
      setNotifications(prev => ({ ...prev, [field]: !prev[field] }));
    } else if (category === 'security') {
      setSecurity(prev => ({ ...prev, [field]: !prev[field] }));
    } else if (category === 'appearance') {
      setAppearance(prev => {
        const newValue = !prev[field];
        if (field === 'darkMode') {
          // Toggle dark class on html element
          document.documentElement.classList.toggle('dark', newValue);
        }
        return { ...prev, [field]: newValue };
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-gray-900 px-8 py-6">
                <h2 className="text-2xl font-bold text-white">Account Settings</h2>
                <p className="text-gray-400 mt-1">Manage your preferences and account security.</p>
            </div>

            <div className="p-8 space-y-8">
                {/* Notifications Section */}
                <section>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Notifications</h3>
                    <div className="space-y-4">
                        <ToggleRow 
                            label="Email Alerts" 
                            description="Receive general emails about your account activity."
                            checked={notifications.emailAlerts}
                            onChange={() => handleToggle('notifications', 'emailAlerts')}
                        />
                        <ToggleRow 
                            label="New Test Assigned" 
                            description="Get notified when a new test is added to your dashboard."
                            checked={notifications.newTest}
                            onChange={() => handleToggle('notifications', 'newTest')}
                        />
                         <ToggleRow 
                            label="Grade Released" 
                            description="Get notified when your test results are ready."
                            checked={notifications.grades}
                            onChange={() => handleToggle('notifications', 'grades')}
                        />
                    </div>
                </section>

                {/* Security Section */}
                <section>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Security</h3>
                    <div className="space-y-4">
                        <ToggleRow 
                            label="Two-Factor Authentication (2FA)" 
                            description="Add an extra layer of security to your account."
                            checked={security.twoFactor}
                            onChange={() => handleToggle('security', 'twoFactor')}
                        />
                        <div className="flex justify-between items-center py-3">
                            <div>
                                <p className="font-medium text-gray-900">Log out of all devices</p>
                                <p className="text-sm text-gray-500">Log out of all other active sessions except this one.</p>
                            </div>
                            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Log Out All</button>
                        </div>
                    </div>
                </section>

                {/* Appearance Section */}
                <section>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Appearance</h3>
                    <div className="space-y-4">
                        <ToggleRow 
                            label="Dark Mode" 
                            description="Enable dark theme for the application."
                            checked={appearance.darkMode}
                            onChange={() => handleToggle('appearance', 'darkMode')}
                        />
                    </div>
                </section>

                {/* Danger Zone */}
                <section>
                    <h3 className="text-xl font-bold text-red-600 mb-4 border-b border-red-100 pb-2">Danger Zone</h3>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-100 flex justify-between items-center">
                        <div>
                            <p className="font-bold text-red-800">Delete Account</p>
                            <p className="text-sm text-red-600">Once you delete your account, there is no going back.</p>
                        </div>
                        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm font-bold transition">
                            Delete
                        </button>
                    </div>
                </section>

                <div className="pt-6 flex justify-end space-x-4 border-t mt-4">
                     <button 
                        onClick={() => navigate('/dashboard')}
                        className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition"
                    >
                        Back to Dashboard
                    </button>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition shadow-md">
                        Save Preferences
                    </button>
                </div>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Helper component for the toggle switch
const ToggleRow = ({ label, description, checked, onChange }) => (
    <div className="flex justify-between items-center py-2">
        <div className="pr-4">
            <p className="font-medium text-gray-900">{label}</p>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
    </div>
);

export default AccountSettingsPage;