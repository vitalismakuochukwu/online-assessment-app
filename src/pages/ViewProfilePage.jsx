import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ViewProfilePage = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(' https://online-assessment-backend-60ij.onrender.com/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();

        if (response.ok) {
          setStudent(data);
        } else {
          setError('Failed to load profile');
        }
      } catch (err) {
        setError('Network error. Please ensure backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <button onClick={() => navigate('/dashboard')} className="text-blue-600 hover:underline">Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-blue-600 px-8 py-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">My Profile</h2>
            <Link to="/profile" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
              Edit Profile
            </Link>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <ProfileField label="Full Name" value={student.fullName} />
              <ProfileField label="Registration Number" value={student.regNumber} />
              <ProfileField label="Email Address" value={student.email} />
              <ProfileField label="Phone Number" value={student.phoneNumber || 'Not set'} />
              <ProfileField label="Date of Birth" value={student.dob ? new Date(student.dob).toLocaleDateString() : 'Not set'} />
              <ProfileField label="Department" value={student.department} />
              <ProfileField label="Faculty" value={student.faculty} />
              <ProfileField label="State of Origin" value={student.state || 'Not set'} />
              <ProfileField label="Nationality" value={student.nationality || 'Not set'} />
              <ProfileField label="Residence" value={student.residence || 'Not set'} />
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div className="border-b border-gray-100 pb-2">
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className="text-lg font-medium text-gray-900">{value}</p>
  </div>
);

export default ViewProfilePage;