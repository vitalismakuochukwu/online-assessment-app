import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MyCoursesPage = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('https://online-assessment-backend-60ij.onrender.com/api/materials/student', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          const materials = await response.json();
          setMaterials(materials);
        } else {
          setError('Failed to load materials');
        }
      } catch (err) {
        setError('Network error. Please ensure backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navigate]);

  if (loading) return <div className="min-h-screen flex justify-center items-center">Loading Materials...</div>;
  if (error) return <div className="min-h-screen flex justify-center items-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Study Materials & Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((file) => (
            <div key={file._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-start space-x-4">
              <div className="text-4xl">
                {file.fileType && file.fileType.includes('pdf') ? '📄' : '🎥'}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-800 truncate" title={file.title}>{file.title}</h4>
                <p className="text-sm text-gray-500 mb-2">{file.course}</p>
                {file.description && <p className="text-sm text-gray-600 mb-3 line-clamp-2">{file.description}</p>}
                <a 
                  href={`https://online-assessment-backend-60ij.onrender.com${file.filePath}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                >
                  View / Download
                </a>
              </div>
            </div>
          ))}
          {materials.length === 0 && (
            <p className="text-gray-500 col-span-full text-center">No materials available.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyCoursesPage;