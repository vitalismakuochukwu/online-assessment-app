import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TakeTestPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Fetch the Test Data
  useEffect(() => {
    const fetchTest = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`https://online-assessment-backend-60ij.onrender.com/api/tests/${testId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          // Ensure data is valid before setting state
          if (data && typeof data.duration === 'number') {
            setTest(data);
            setTimeLeft(data.duration * 60); // Convert minutes to seconds
          } else {
            setError('Failed to load test data. The test may not exist or is improperly configured.');
          }
        } else if (response.status === 403) {
          // Security Guard: Redirect if already taken
          alert("Security Alert: You have already completed this test.");
          navigate(`/test-result/${testId}`);
          return;
        } else {
          setError('Failed to load test');
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
  }, [testId, navigate]);

  // 2. Timer Logic
  useEffect(() => {
    if (timeLeft <= 0 && test) {
        // Time is up! Auto submit
        if (timeLeft === 0) handleSubmit();
        return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, test]);

  // 3. Handle Answer Selection
  const handleOptionChange = (questionIndex, optionKey) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: optionKey
    }));
  };

  // 4. Submit Test
  const handleSubmit = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`https://online-assessment-backend-60ij.onrender.com/api/tests/${testId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ answers }),
      });

      const result = await response.json();
      alert(result.message || "Test Submitted!");
      navigate(`/test-result/${testId}`);
    } catch (err) {
      console.error("Error submitting test:", err);
      alert("Error submitting test. Please try again.");
    }
  };

  // Formatting time for display (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center">Loading Exam...</div>;
  if (error) return <div className="min-h-screen flex justify-center items-center text-red-600">{error}</div>;

  // Add a guard to ensure `test` is not null before rendering
  if (!test) {
    // This can happen if the test is not found or there's an issue with the data
    return <div className="min-h-screen flex justify-center items-center">Preparing your exam...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
            {/* Header with Timer */}
            <div className="bg-blue-600 text-white p-6 flex justify-between items-center sticky top-0 z-10">
                <h1 className="text-2xl font-bold">{test.title}</h1>
                <div className={`text-xl font-mono font-bold px-4 py-2 rounded ${timeLeft < 60 ? 'bg-red-500' : 'bg-blue-700'}`}>
                    Time Left: {formatTime(timeLeft)}
                </div>
            </div>

            <div className="p-8 space-y-8">
                {test.questions.map((q, index) => (
                    <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
                        <p className="text-lg font-medium text-gray-800 mb-4"><span className="text-blue-600 font-bold">Q{index + 1}.</span> {q.questionText}</p>
                        <div className="space-y-3 ml-4">
                            {['a', 'b', 'c', 'd'].map((opt) => (
                                <label key={opt} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${answers[index] === opt ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50 border-gray-200'}`}>
                                    <input type="radio" name={`question-${index}`} value={opt} checked={answers[index] === opt} onChange={() => handleOptionChange(index, opt)} className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                                    <span className="ml-3 text-gray-700">{q.options[opt]}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-6 bg-gray-50 border-t flex justify-end">
                <button onClick={handleSubmit} className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-md">
                    Submit Examination
                </button>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TakeTestPage;