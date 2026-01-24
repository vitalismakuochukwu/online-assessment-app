import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UpdateProfilePage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    regNumber: '',
    department: '',
    faculty: '',
    email: '',
    dob: '',
    residence: '',
    phoneNumber: '',
    nationality: '',
    state: '',
    password: '', // This will be the new password
    showPassword: false,
    oldPassword: '',
    showOldPassword: false,
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('https://online-assessment-backend-60ij.onrender.com/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        
        if (response.ok) {
          // Format DOB for input field (YYYY-MM-DD)
          const formattedDob = data.dob ? new Date(data.dob).toISOString().split('T')[0] : '';
          
          setFormData({
            ...data,
            dob: formattedDob, // Use formatted DOB
            oldPassword: '', // Ensure password fields are clear
            showPassword: false,
            showOldPassword: false,
            password: '' // Don't populate password
          });
        } else {
          setMessage({ type: 'error', text: 'Failed to load profile' });
        }
      } catch (err) {
        setMessage({ type: 'error', text: 'Network error' });
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = () => {
    setFormData(prevState => ({ ...prevState, showPassword: !prevState.showPassword }));
  };

  const toggleShowOldPassword = () => {
    setFormData(prevState => ({ ...prevState, showOldPassword: !prevState.showOldPassword }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (formData.password && formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    // If user is changing password, old password is required
    if (formData.password && !formData.oldPassword) {
        setMessage({ type: 'error', text: 'Current password is required to set a new one.' });
        return;
    }

    setIsLoading(true);

    const token = localStorage.getItem('authToken');

    const bodyData = { ...formData };
    if (!bodyData.password) {
      delete bodyData.password;
      delete bodyData.oldPassword;
    }
    delete bodyData.confirmPassword;

    try {
      const response = await fetch('https://online-assessment-backend-60ij.onrender.com/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bodyData),
      });
      const data = await response.json();
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Update failed' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Update Profile</h2>
          
          {message.text && (
            <div className={`p-4 rounded-md mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Existing Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
              <input type="text" name="regNumber" value={formData.regNumber} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input type="text" name="department" value={formData.department} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Faculty</label>
              <input type="text" name="faculty" value={formData.faculty} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>

            {/* New Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+1234567890" className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Residence</label>
              <input type="text" name="residence" value={formData.residence} onChange={handleChange} placeholder="Hostel A, Room 101" className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
              <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State of Origin</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <div className="md:col-span-2 border-t pt-6 mt-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Change Password</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <div className="relative">
                    <input
                      type={formData.showOldPassword ? "text" : "password"}
                      name="oldPassword"
                      value={formData.oldPassword}
                      onChange={handleChange}
                      placeholder="Enter your current password"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={toggleShowOldPassword}
                      className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
                    >
                      {formData.showOldPassword ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.493 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 0 1 6 0Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Leave blank to keep current" className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your new password" className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
            </div>

            <div className="md:col-span-2 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                type="button" 
                onClick={() => navigate('/dashboard')}
                className="w-full bg-gray-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-700 transition transform hover:scale-[1.01] shadow-md"
              >
                Back to Dashboard
              </button>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition transform hover:scale-[1.01] shadow-md disabled:opacity-50"
              >
                {isLoading ? 'Saving Changes...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateProfilePage;