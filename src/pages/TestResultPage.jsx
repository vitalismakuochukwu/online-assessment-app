import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TestResultPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResult = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`https://online-assessment-backend-60ij.onrender.com/api/tests/${testId}/result`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          setResult(data);
        } else {
          setError('Result not found or not authorized.');
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [testId, navigate]);

  if (loading) return <div className="min-h-screen flex justify-center items-center">Loading Results...</div>;
  if (error) return <div className="min-h-screen flex flex-col justify-center items-center text-red-600"><p>{error}</p><Link to="/dashboard" className="text-blue-600 underline mt-4">Back to Dashboard</Link></div>;

  const { test, score, totalMarks, answers } = result;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="bg-blue-600 text-white p-8 text-center">
              <h1 className="text-3xl font-bold mb-2">{test.title} - Results</h1>
              <div className="text-5xl font-extrabold my-4">{score} / {totalMarks}</div>
              <p className="text-blue-100">You have completed this assessment.</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Detailed Review</h2>
            {test.questions.map((q, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === q.correctOption;
              
              return (
                <div key={index} className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-gray-900"><span className="font-bold mr-2">Q{index + 1}.</span> {q.questionText}</h3>
                    {isCorrect ? (
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-0.5 rounded">Correct</span>
                    ) : (
                      <span className="bg-red-100 text-red-800 text-xs font-bold px-2.5 py-0.5 rounded">Incorrect</span>
                    )}
                  </div>

                  <div className="space-y-2 ml-4">
                    {['a', 'b', 'c', 'd'].map(opt => {
                      const isSelected = userAnswer === opt;
                      const isActualCorrect = q.correctOption === opt;
                      
                      let optionClass = "p-3 rounded-lg border ";
                      if (isActualCorrect) optionClass += "bg-green-50 border-green-200 text-green-800 font-medium";
                      else if (isSelected && !isCorrect) optionClass += "bg-red-50 border-red-200 text-red-800";
                      else optionClass += "border-gray-100 text-gray-600";

                      return (
                        <div key={opt} className={optionClass}>
                          <span className="uppercase font-bold mr-2">{opt})</span> {q.options[opt]}
                          {isActualCorrect && <span className="float-right">✅ Correct Answer</span>}
                          {isSelected && !isCorrect && <span className="float-right">❌ Your Answer</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link to="/dashboard" className="bg-gray-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-700 transition">Back to Dashboard</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TestResultPage;